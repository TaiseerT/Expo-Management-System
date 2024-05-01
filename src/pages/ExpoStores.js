import Footer from "../components/shop/Footer.jsx";
import ExpoStoreHeader from "../components/Expo_Stores/expoStoreHeader.jsx";
import ExpoStoreCard from "../components/Expo_Stores/expoStoreCard.jsx";
export default function ExpoStores() {
  return (
    <>
      <ExpoStoreHeader />
      <div className="ExpoStoreCard">
        <h2 className="text-xl font-bold text-gray-900 text-center">
          Expo Sections
        </h2>
        <ExpoStoreCard />
      </div>
      <Footer />
    </>
  );
}
