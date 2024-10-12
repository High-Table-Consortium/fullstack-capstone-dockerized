import Image from "next/image"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import FooterComponent from "../../components/Footer";
import Cities from "../../components/Cities";
import Categories from "../../components/Categorycards";
import Provinces from "../../components/Provinces";

export default function ExplorePage() {

  return (
    <div className="">
      <Navbar />
      <div className="bg-background container mx-auto px-4 py-8">

        {/* Explore Categories Section */}
        <section className="mb-12">
          <Categories />
        </section>

        <section>
          <Provinces />
        </section>

        {/* Cities in South Africa Section */}
        <section>
          <Cities />
        </section>
      </div>
      <FooterComponent/>
    </div>
  );
}
