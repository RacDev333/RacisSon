import axios from 'axios';

// Fetch public Google Sheet using the gviz/tq?tqx=out:json endpoint and parse rows.
export async function fetchSheetAsJson(spreadsheetId: string, sheetName?: string) {
  // sheetName optional -> use gid or sheet name query param
  const sheet = sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : '';
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json${sheet}`;

  const res = await axios.get(url);
  // response body starts with: google.visualization.Query.setResponse(...);
  const text = res.data as string;
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
}
