import CampaignBanner from "../../components/HomeComponents/Campaign/CampaignBanner/CampaignBanner";
import ShopBannerCom from "../../components/HomeComponents/Campaign/ShopBannerCom/ShopBannerCom";
import CategoryWaysProducts from "../../components/HomeComponents/CategoryWaysProducts/CategoryWaysProducts";
import ChooseByBrand from "../../components/HomeComponents/ChooseByBrand/ChooseByBrand";
import ChooseByCategory from "../../components/HomeComponents/ChooseByCategory/ChooseByCategory";
import Clients from "../../components/HomeComponents/Clients/Clients";
import FeaturedProducts from "../../components/HomeComponents/FeaturedProducts/FeaturedProducts";
import FeatureProduct from "../../components/HomeComponents/FeatureProduct/FeatureProduct";
import FlashSale from "../../components/HomeComponents/FlashSale/FlashSale";
import Hero from "../../components/HomeComponents/Hero/Hero";
import MobileCategories from "../../components/HomeComponents/MobileCategories/MobileCategories";
import PopularProducts from "../../components/HomeComponents/PopularProducts/PopularProducts";
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
      <MobileCategories />
      <ShopBannerCom />
      <FlashSale />
      <FeaturedProducts />
      <VideoSection />
      <Services />
      <ReviewSlider />
      <Clients />
      <FeatureProduct/>
      <CampaignBanner />
      <ChooseByBrand />
      <PopularProducts />
      <CategoryWaysProducts />
    </>
  );
}
