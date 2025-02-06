import { motion } from "framer-motion";
import NavbarBase from "../components/NavbarBase";

const AboutUs = () => {
  return (
    <div>
      <NavbarBase />
      <section className="container mx-auto my-16 px-6 text-center">
        {/* Title Section */}
        <motion.h2
          className="text-5xl font-bold text-gray-900 font-playfair mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-pink-500">Us</span>
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to{" "}
          {<span className="text-[#2b4174] font-extrabold">CAKE DELIGHTS</span>}
          , where every cake tells a story! 🍰 We specialize in crafting
          delicious, handcrafted cakes using only the finest ingredients. Our
          passion is to turn your sweet dreams into reality.
        </motion.p>

        {/* About Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {aboutData.map((item, index) => (
            <motion.div
              key={index}
              className="w-80 bg-white shadow-lg rounded-2xl overflow-hidden p-6 text-center transition-all duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 font-playfair">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Dummy Data for About Us Cards
const aboutData = [
  {
    icon: "🎂",
    title: "Our Story",
    description:
      "Founded in 2010, we've been creating delightful treats for every occasion with love and passion.",
  },
  {
    icon: "👨‍🍳",
    title: "Expert Bakers",
    description:
      "Our talented bakers bring years of expertise and creativity into every cake we craft.",
  },
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    description:
      "We use only high-quality, organic ingredients to ensure the best taste in every bite.",
  },
  {
    icon: "🏆",
    title: "Award-Winning",
    description:
      "Recognized as one of the top bakeries, we take pride in serving happiness through our cakes.",
  },
];

export default AboutUs;
