import Featured from "../components/Feature";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Testimonials from "../components/Review";

const Home = ({ userType, isLoggedIn }) => {
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
