import Image from "next/image"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import FooterComponent from "../../components/Footer";
import Cities from "../../components/Cities";
import Categories from "../../components/Categorycards";

export default function ExplorePage() {

  return (
    <div className="">
      <Navbar />
      <div className="bg-background container mx-auto px-4 py-8">

        {/* Explore Categories Section */}
        <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-2">
                        Explore <span className="text-yellow-500">Categories</span>
                    </h2>
          <Categories />
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
