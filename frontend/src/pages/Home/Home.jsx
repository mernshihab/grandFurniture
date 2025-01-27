import CampaignBanner from "../../components/HomeComponents/Campaign/CampaignBanner/CampaignBanner";
import ShopBannerCom from "../../components/HomeComponents/Campaign/ShopBannerCom/ShopBannerCom";
import ChooseByCategory from "../../components/HomeComponents/ChooseByCategory/ChooseByCategory";
import Clients from "../../components/HomeComponents/Clients/Clients";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts/FeaturedProducts";
import FeatureProduct from "../../components/HomeComponents/FeatureProduct/FeatureProduct";
import FlashSale from "../../components/HomeComponents/FlashSale/FlashSale";
import Hero from "../../components/HomeComponents/Hero/Hero";
import ReviewSlider from "../../components/HomeComponents/ReviewSlider/ReviewSlider";
import Services from "../../components/HomeComponents/Services/Services";
import VideoSection from "../../components/HomeComponents/VideoSection/VideoSection";
import usePageView from "../../hooks/usePageView";

export default function Home() {
  window.scroll(0, 0);
  usePageView("Home");

  return (
    <>
      <Hero />
      <ChooseByCategory />
      {/* <ShopBannerCom /> */}
      <FlashSale />
      <FeaturedProducts />
      <VideoSection />
      <Services />
      <ReviewSlider />
      <Clients />
      <FeatureProduct/>
      <CampaignBanner />
    </>
  );
}
