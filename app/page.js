
import Advertisement from "@/components/Advertisement";
import CategoryList from "@/components/CategoryList";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TopNewArrivals from "@/components/trending/TopNewArrivals";
import TrendingProductList from "@/components/trending/TrendingProductList";


export default async  function Home() {


  return (
    <>
      <Hero/>
      <Features/>
      <CategoryList/>
      <TopNewArrivals/>
      <Advertisement/>
      <TrendingProductList />

    </>
  );
}
