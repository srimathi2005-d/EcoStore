import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="pb-14">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
