import { useContext } from "react";
import Featured from "../components/Feature";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Testimonials from "../components/Review";
import { AuthContext } from "../context/authContext";

const Home = () => {

  const {userType,isLoggedIn} = useContext(AuthContext);

  return (
    <>
      <Hero userType={userType} isLoggedIn={isLoggedIn}></Hero>
      <Featured></Featured>
      <Testimonials></Testimonials>
      <Footer></Footer>
    </>
  );
};

export default Home;
