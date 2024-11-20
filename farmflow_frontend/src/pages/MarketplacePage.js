import React from "react";

const MarketplacePage = () => {
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      image: "https://plus.unsplash.com/premium_photo-1726138647192-5275bef08970?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvZXN8ZW58MHx8MHx8fDA%3D",
      price: "$10/kg",
      description: "Freshly harvested organic tomatoes.",
    },
    {
      id: 2,
      name: "Honey",
      image: "https://media.istockphoto.com/id/1480942686/photo/honey-pouring-from-dipper-in-jar-and-honeycomb-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=cfISrON1RSe61Es4CxMXTHVbmcglyuJe99CpC1TFkE4=",
      price: "$15/bottle",
      description: "Pure organic honey from local farms.",
    },
    {
      id: 3,
      name: "Fresh Eggs",
      image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWdnc3xlbnwwfHwwfHx8MA%3D%3D",
      price: "$5/dozen",
      description: "Farm-fresh eggs collected daily.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-600 mt-10 mb-6">Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">{product.price}</p>
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
