import Header from "../components/shop/Header.jsx";
import ProductCard from "../components/shop/productCard.jsx";
import Footer from "../components/shop/Footer.jsx";

function Shop() {
  return (
    <>
      <Header />
      <div className="ProductCard">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Products
        </h2>
        <ProductCard />
      </div>
      <Footer />
    </>
  );
}
export default Shop;
