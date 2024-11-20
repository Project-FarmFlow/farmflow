import React from "react"; 

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center py-24 px-6">
        <h1 className="text-5xl font-bold leading-tight mb-4">About Us</h1>
        <p className="text-xl md:text-2xl mb-6">
          Learn more about who we are and what we do.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-semibold text-green-600">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-4xl mx-auto">
          At FarmFlow, our mission is to empower farmers and agricultural businesses with innovative, 
          sustainable, and easy-to-use technology that helps them manage resources efficiently and boost productivity.
        </p>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-green-600 text-center">Our Vision</h2>
        <p className="mt-4 text-lg text-gray-700 text-center max-w-4xl mx-auto">
          Our vision is to create a future where technology and agriculture come together to improve food security,
          conserve resources, and increase profitability for farmers worldwide.
        </p>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-green-600 text-center">Meet Our Team</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <img
              src="https://wildaid.org/wp-content/uploads/2017/09/Maggie-Q-Nail-Biters-e1517603987944-1024x871.jpg"
              alt="Team Member"
              className="mx-auto mb-4 rounded-full w-32 h-32 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <p className="mt-2 text-gray-700">
              John is the visionary behind FarmFlow, passionate about technology and agriculture.
            </p>
          </div>
          {/* Team Member 2 */}
          <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <img
              src="https://www.reuters.com/resizer/v2/O7VDPYB3RFJHNMGJMVRMI55PFQ.jpg?auth=869848a86007f0467653ca5665f21bdb33b8eca33c07af6e947c9b0320c150b7&width=5108&quality=80"
              alt="Team Member"
              className="mx-auto mb-4 rounded-full w-32 h-32 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
            <p className="mt-2 text-gray-700">
              Jane leads our technical team, ensuring that our solutions are innovative and effective.
            </p>
          </div>
          {/* Team Member 3 */}
          <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md">
            <img
              src="https://fortune.com/img-assets/wp-content/uploads/2024/09/GettyImages-2170596573-e1727191861209.jpg?w=1440&q=75"
              alt="Team Member"
              className="mx-auto mb-4 rounded-full w-32 h-32 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">Sara Lee</h3>
            <p className="text-gray-600">Head of Marketing</p>
            <p className="mt-2 text-gray-700">
              Sara is responsible for promoting our products and building connections with our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-semibold text-green-600 text-center">Our Values</h2>
        <p className="mt-4 text-lg text-gray-700 max-w-4xl mx-auto text-center">
          We are committed to:
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Innovation and continuous improvement</li>
            <li>Sustainability and environmental responsibility</li>
            <li>Customer satisfaction and support</li>
            <li>Integrity and transparency in all our actions</li>
          </ul>
        </p>
      </section>

    </div>
  );
};

export default AboutUsPage;
