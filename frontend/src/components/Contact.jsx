import React from "react";
import { motion } from "framer-motion";
import SH2 from "../assets/SH2.png";
// import icon3 from "../assets/icon3.png";
import saf3 from "../assets/saf3.jpg";
// import icon from "../assets/icon.png";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
// import { Phone } from "lucide-react";
import { useEffect } from "react";
import img from "../assets/SA4.webp"

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };


    try {
      await fetch("https://swacchh.com/backend/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Message sent successfully ✅");
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    }
  };


  return (
    <div className="overflow-x-hidden">
      {/* Top Section */}
      <section className="bg-[#667D60] py-16 px-4 md:px-10 w-full">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center w-full">
          {/* Left Text */}
          <motion.form
            className="w-full"
            onSubmit={handleSubmit}   // ← Add this!

            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center md:text-left">
              CONTACT US
            </h2>
            <p className="text-white text-base sm:text-lg lg:text-lg mb-4">
  At <span className="font-semibold">SWACCHH</span>, we bring you the purity of nature through our
  premium, handpicked <strong>Saffron</strong>. Whether you’re curious about our sourcing
  process, looking for bulk orders, or need product support, we’re always here to
  assist you with care and commitment.
</p>

          </motion.form>

          {/* Right Image */}
          <motion.div
            className="flex justify-center w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.img
              src={img}
              alt="spices"
              className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          className="bg-[#FDF6ED] py-12 mt-12 rounded-xl shadow-md px-4 md:px-10 w-full"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Decorative Leaf */}
          {/* <motion.img
            src={icon}
            alt="Leaf Right"
            className="absolute right-6 -top-6 w-14 md:w-20 opacity-80 rotate-180"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
            viewport={{ once: true }}
          /> */}

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 w-full">
            {/* Left Info */}
            <motion.div
              className="flex flex-col items-center text-center w-full"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ask us</h2>
              <motion.img
                src={saf3}
                alt="blog"
                className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <p className="text-sm md:text-base text-white bg-[#667D60] px-4 py-2 rounded-md max-w-sm">
                We're here to help! If you have any questions about our website
                please email{" "}
                <a href="mailto:web@email.com" className="underline font-bold">
                  info@swacchh.com
                </a>,<br /> fill out the form or call{" "}

                <a href="tel:+919160213146" className="underline font-bold">
                  +91 9160213146
                </a>.
                <br />
                Monday to Friday, 10am-5pm
              </p>
            </motion.div>

            {/* Right Form */}
            <motion.form
              className="space-y-4 w-full"
              onSubmit={handleSubmit}   // ← Add this to properly handle form submit
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              viewport={{ once: true }}
            >
              {[
                { placeholder: "Name", name: "name" },
                { placeholder: "Phone", name: "phone" },
                { placeholder: "E-Mail", name: "email" },
                { placeholder: "Subject", name: "subject" },
              ].map((field, i) => (
                <motion.input
                  key={i}
                  type="text"
                  name={field.name}        // ✅ add this
                  placeholder={field.placeholder}
                  className="w-full bg-[#667D60] text-white px-4 py-3 rounded-md focus:outline-none"
                  variants={fadeInUp}
                  transition={{ duration: 0.8 }}
                />
              ))}


              <motion.textarea
                name="message"
                placeholder="Message"
                rows="4"
                className="w-full bg-[#667D60] text-white px-4 py-3 rounded-md focus:outline-none"
                variants={fadeInUp}
                transition={{ duration: 0.8 }}
              ></motion.textarea>

              <motion.button
                type="submit"   // Ensure button is submit type
                className="bg-[#667D60] hover:bg-[#4e5f48] transition-colors duration-300 text-white px-6 py-3 w-full rounded-md font-semibold"
                variants={fadeInUp}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SEND MESSAGE
              </motion.button>
            </motion.form>

          </div>
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="py-16 px-6 md:px-10 bg-[#667D60] text-white w-full">
        <div className="max-w-7xl mx-auto bg-[#667D60] font-semibold grid sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {[
            {
              icon: <FaMapMarkerAlt className="text-3xl mx-auto text-[#667D60]" />,
              title: "Location",
              text: "Padmaja Nagar, Vemana Colony, Chanda Nagar, Hyderabad, Telangana 500050",
              href: "https://www.google.com/maps/search/?api=1&query=Padmaja+Nagar,+Vemana+Colony,+Chanda+Nagar,+Hyderabad,+Telangana+500050"
            },
            {
              icon: <FaPhoneAlt className="text-3xl mx-auto text-[#667D60]" />,
              title: "Call Us Anytime",
              text: "+91 9160213146",
              href: "tel:+919160213146"
            },
            {
              icon: <FaEnvelope className="text-3xl mx-auto text-[#667D60]" />,
              title: "Send Us Email",
              text: "info@Swacchh.com",
              href: "mailto:info@Swacchh.com"
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#FFF7EC] p-8 rounded-lg text-center hover:shadow-2xl transition w-full"
            >
              {item.icon}
              <h3 className="text-xl mt-4 mb-2 text-black font-semibold">{item.title}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[#667D60] text-sm md:text-base underline hover:text-[#FF9933] transition"
                >
                  {item.text}
                </a>
              ) : (
                <p className="text-[#667D60] text-sm md:text-base">{item.text}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Google Map */}
      <motion.section
        className="w-full h-80 md:h-96"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <iframe
          className="w-full h-full"
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.113867826299!2d78.31492171421365!3d17.507952300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93c569872445%3A0x4306e7494dd99f95!2sThe%20Swacchh%20Products!5e0!3m2!1sen!2sin!4v1694359812345!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </motion.section>

      {/* Floating Action Buttons */}
      <div className="fixed flex flex-col gap-4 bottom-20 right-6 z-50">
        {/* WhatsApp Button */}

        <a href="https://wa.me/919160213146" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-green-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.86 5.08 2.34 7.09L4 29l7.18-2.31A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.89-.52-5.54-1.5l-.39-.23-4.28 1.38 1.4-4.17-.25-.4A9.94 9.94 0 0 1 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.13-7.47c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.23 1.18.37 1.58.47.66.17 1.26.15 1.74.09.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
          </svg>
        </a>
        {/* Arrow Up Button */}


        {/* <button className="p-3 rounded-full bg-[#FF9933] text-white shadow-lg hover:bg-orange-600 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up" aria-hidden="true"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
        </button> */}

      </div>
    </div>
  );
};

export default Contact;