import Footer from "../components/shop/Footer.jsx";
import ExposHeader from "../components/Expo/expoHeader.jsx";
import ExpoCard from "../components/Expo/expoCard.jsx";
export default function ExposPage() {
  return (
    <>
      <ExposHeader />
      <div className="ExpoCard">
        <h2 className="text-xl font-bold text-gray-900 text-center">Expos</h2>
        <ExpoCard />
      </div>
      <Footer />
    </>
  );
}
