import axios from 'axios';

// Small CSV parser that supports quoted fields and newlines inside quotes.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [''];
  let i = 0;
  let field = '';
  let inQuotes = false;

  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        // double-quote escape
        if (i + 1 < text.length && text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += ch;
      i++;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }

    if (ch === ',') {
      cur[cur.length - 1] = field;
      cur.push('');
      field = '';
      i++;
      continue;
    }

    if (ch === '\r') { i++; continue; }

    if (ch === '\n') {
      cur[cur.length - 1] = field;
      rows.push(cur.slice());
      cur = [''];
      field = '';
      i++;
      continue;
    }

    field += ch;
    i++;
  }

  // flush
  if (inQuotes) {
    // malformed but push what we have
    cur[cur.length - 1] = field;
  } else if (field !== '' || cur.length > 1) {
    cur[cur.length - 1] = field;
  }
  // if there's any content in cur, add it
  if (cur.length > 1 || (cur.length === 1 && cur[0] !== '')) rows.push(cur);

  return rows;
}

// Fetch public Google Sheet. Use CSV export (preserves long text) and parse it.
export async function fetchSheetAsJson(spreadsheetId: string, sheetName?: string) {
  // try CSV export first
  try {
    const gidParam = sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv${gidParam}`;
    const res = await axios.get(csvUrl, { responseType: 'text' });
    const text = res.data as string;
    const parsed = parseCSV(text);
    if (!parsed || parsed.length === 0) return [];
    const headers = parsed[0].map(h => (h ?? '').toString());
    const rows = parsed.slice(1).map(r => {
      const obj: Record<string, any> = {};
      for (let i = 0; i < headers.length; i++) obj[headers[i] || `col_${i}`] = r[i] ?? null;
      return obj;
    });
    return rows;
  } catch (err) {
    // fallback to gviz JSON method (older behavior)
    try {
      const sheet = sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '';
      const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json${sheet}`;
      const gres = await axios.get(url);
      const text = gres.data as string;
      const jsonText = text.replace(/^.*\(/s, '').replace(/\);?\s*$/s, '');
      const data = JSON.parse(jsonText);
      const cols = data.table.cols.map((c: any) => (c.label || c.id || '').toString());
      const rows = data.table.rows.map((r: any) => {
        const obj: Record<string, any> = {};
        r.c.forEach((cell: any, idx: number) => {
          obj[cols[idx] || `col_${idx}`] = cell ? cell.v : null;
        });
        return obj;
      });
      return rows;
    } catch (err2) {
      throw err2;
    }
  }
}
