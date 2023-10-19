import { Link } from "react-router-dom";
import ProductColor from "./ProductColor";


//for displaying individual product items.
function ProductCards({ productItem, category, showSalePrice = false }) {

  //Destructuring product item data for display purpose
  const { productName, price, images, colors, _id, isSale } = productItem;
  const salePrice = showSalePrice ? (price - (price * isSale/100 )).toFixed(2) : null; // Calculate sale price if showSalePrice is true

  //Constructing the URL for the product preview page based on it#s category and product ID.
  const productPreviewUrl = `/viewproduct/${_id}`;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg relative mb-6 -z-0 ">
       {showSalePrice && (
        <div className="absolute top-2 right-2 bg-red-600 shadow-2xl shadow-white text-white py-1 px-1 rounded-lg z-50">
          -{isSale}%
        </div>
      )}
    <div className="relative">
    <img
      src={images.cloudinary}
      alt={productName}
      loading="lazy"
      className="w-full h-48 object-cover"
    />
    <Link
      to={productPreviewUrl}
      state={{...productItem, showSalePrice}}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl bg-black bg-opacity-80 opacity-0 hover:opacity-50 transition-opacity shadow-2xl"
      >
      Mehr anzeigen
    </Link>
      </div>      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{productName}</h2>
        <p className="text-gray-600">{category}</p>
        {showSalePrice ? (
          <p className="text-gray-800 mt-2">
        <span className="line-through">{price} €</span>
        <span className="text-red-800 ml-4">{salePrice} €</span> 
        </p>       
         ) : (
           <p className="text-gray-800 mt-2">{price} €</p>
           )}
           <ProductColor colors={colors} />
      </div>
    </div>
  );
}

export default ProductCards;



