// import Test from "./Components/Test";
import Navbar from "@/components/Navbar";
import FooterComponent from "../components/Footer";
import HomeP from "./homepage/page";
import SignInPage from "./auth/signin/page";
import SignUp from "./auth/signup/page";
import Destinationlist from "./destinationlist/page";

export default function Home() {
  return (
    <main className="">
      <div className=""></div>
      {/* <Navbar/>
      <FooterComponent /> */}
      {/* <HomeP/> */}
      {/* <SignInPage /> */}
      {/* <SignUp /> */}
      <Destinationlist />
    </main>
  );
}
