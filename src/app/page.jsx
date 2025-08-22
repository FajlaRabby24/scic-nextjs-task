import Hero from "./components/Hero";
import RecentProducts from "./components/RecentProducts";

export default function Home() {
  return (
    <div className="space-y-28">
      <Hero />
      <RecentProducts />
    </div>
  );
}
