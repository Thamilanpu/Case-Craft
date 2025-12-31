import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s1 from "../assets/s1.webp"
import HeroSlider from "../components/home/HeroSlider";
import ChooseExperience from "../components/home/ChooseExperience";
import PhoneCaseCollection from "../components/home/PhoneCaseCollection";
import PetProductsCollection from "../components/home/PetProductsCollection";
import AboutSection from "../components/home/AboutSection";
import FinalCTA from "../components/home/FinalCTA";
import HomeFAQ from "../components/home/HomeFAQ";
import HomeTestimonials from "../components/home/HomeTestimonials";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Design Your Dream Phone Case",
      description: "Create custom phone cases with your unique designs. Premium quality, perfect fit, endless possibilities.",
      image: [s1],
      link: "/design?type=phone",
      bgGradient: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Custom Pet Products",
      description: "Show your love with personalized pet accessories. Collars, bowls, beds, and more - all customized for your furry friend.",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
      cta: "Design Pet Products",
      link: "/design?type=pet",
      bgGradient: "from-pink-600 to-orange-600"
    }
  ];

  const phoneProducts = [
    {
      id: 1,
      name: "Premium Matte Case",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop",
      features: ["Anti-scratch", "Wireless charging", "Slim design"]
    },
    {
      id: 2,
      name: "Clear Crystal Case",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
      features: ["Transparent", "Shock-proof", "UV resistant"]
    },
    {
      id: 3,
      name: "Leather Wallet Case",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&h=400&fit=crop",
      features: ["Card slots", "Genuine leather", "Stand function"]
    },
     {
      id: 3,
      name: "Leather Wallet Case",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&h=400&fit=crop",
      features: ["Card slots", "Genuine leather", "Stand function"]
    }
  ];

  const petProducts = [
    {
      id: 1,
      name: "Custom Pet Collar",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=400&h=400&fit=crop",
      features: ["Durable nylon", "Personalized tag", "Adjustable"]
    },
    {
      id: 2,
      name: "Personalized Food Bowl",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
      features: ["Stainless steel", "Custom engraving", "Non-slip base"]
    },
    {
      id: 3,
      name: "Custom Pet Bed",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop",
      features: ["Soft cushion", "Washable cover", "Name embroidery"]
    },
     {
      id: 3,
      name: "Custom Pet Bed",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop",
      features: ["Soft cushion", "Washable cover", "Name embroidery"]
    } 
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Hero Carousel */}
      <HeroSlider/>
      
      {/* Services Grid */}
      <ChooseExperience/>

      {/* Phone Products Showcase */}
      <PhoneCaseCollection/>
      

      {/* Pet Products Showcase */}
      <PetProductsCollection/>
      

      {/* About Us Section */}
      <AboutSection/>
     
``````<HomeFAQ/>
<HomeTestimonials/>
      {/* CTA Section */}
      <FinalCTA/>
      
      
    </div>
  );
};

export default Home;