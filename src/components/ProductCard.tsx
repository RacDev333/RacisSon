import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  image?: string;
  price?: string;
};

const ProductCard: React.FC<Props> = ({ id, title, image, price }) => {
  return (
    <Link to={`/product/${encodeURIComponent(id)}`} className="block glass-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{width: '100%'}}>
      <div className="w-full aspect-[5/4] bg-gradient-to-br from-transparent to-black/8 flex items-center justify-center product-image">
        {image ? (
          <img src={image} alt={title} className="max-h-full object-contain p-3 fade-in" />
        ) : (
          <div className="text-gray-400">Brak zdjęcia</div>
        )}
      </div>
      <div className="px-5 pt-5 pb-6 flex items-start justify-between gap-4">
        <div className="min-w-0 pr-3">
          <h3 className="font-semibold text-gray-50 text-base two-line">{title}</h3>
        </div>
        {price && (
          <div className="inline-flex items-center gap-1 text-sm font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 text-black px-4 py-2 rounded-full shadow-lg whitespace-nowrap flex-shrink-0">
            <span className="inline-block align-middle">{price}</span>
            <span className="ml-1 inline-block opacity-90">PLN</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
