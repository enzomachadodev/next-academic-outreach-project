import { Navbar } from "@/features/landing/components/header";
import { Hero } from "@/features/landing/components/hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="h-full w-full">
        <Hero />
      </main>
    </>
  );
};
export default Home;
