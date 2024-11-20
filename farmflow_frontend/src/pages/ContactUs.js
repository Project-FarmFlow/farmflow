import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa"; // Font Awesome icons

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold leading-tight mb-4">Contact Us</h1>
        <p className="text-xl md:text-2xl mb-6">
          We're here to help! Feel free to reach out with any questions or feedback.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 px-6 text-center bg-white">
        {/* Contact Details */}
        <div className="mt-8 space-y-4 text-lg text-gray-700">
          <p>Email: <a href="mailto:support@farmflow.com" className="text-green-600 hover:text-green-800">support@farmflow.com</a></p>
          <p>Phone: <a href="tel:+254234567890" className="text-green-600 hover:text-green-800">+254 (234) 567-890</a></p>
          <p>Location: 123 Farm Street, Farmville, Kenya</p>
        </div>
      </section>

      {/* Send Message Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-green-600 text-center">Send Us a Message</h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          Have any questions or inquiries? Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <div className="mt-8 max-w-lg mx-auto">
          <form action="#" method="POST" className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-left text-lg font-semibold text-gray-700">Your Name</label>
              <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-md" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-left text-lg font-semibold text-gray-700">Your Email</label>
              <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-md" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-left text-lg font-semibold text-gray-700">Your Message</label>
              <textarea id="message" name="message" className="w-full p-3 border border-gray-300 rounded-md" rows="4" required></textarea>
            </div>
            <button type="submit" className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-md hover:bg-green-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6 flex-wrap">
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-3xl text-green-600 hover:text-green-800 transition duration-300 flex items-center space-x-2">
            <FaTwitter />
            <span className="text-sm sm:text-base">@FarmFlow</span>
          </a>
          <a href="https://www.linkedin.com/company/yourprofile" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-3xl text-green-600 hover:text-green-800 transition duration-300 flex items-center space-x-2">
            <FaLinkedin />
            <span className="text-sm sm:text-base">@FarmFlow</span>
          </a>
          <a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-3xl text-green-600 hover:text-green-800 transition duration-300 flex items-center space-x-2">
            <FaFacebook />
            <span className="text-sm sm:text-base">@FarmFlow</span>
          </a>
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-3xl text-green-600 hover:text-green-800 transition duration-300 flex items-center space-x-2">
            <FaInstagram />
            <span className="text-sm sm:text-base">@FarmFlow</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
