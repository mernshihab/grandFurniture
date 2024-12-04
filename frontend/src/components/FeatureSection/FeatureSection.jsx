const features = [
  {
    id: 1,
    image: "https://99grid.com/cdn/shop/files/Group_834_360x.png?v=1633346197", // Replace with actual image URL
    title: "Exceptional Furniture For The Taskmasters",
    description:
      "We founded GRID: to make it easy for teams of all sizes to create an office you love. We sell direct, so our collection costs half as much as premium furniture of comparable quality.",
  },
  {
    id: 2,
    image: "https://99grid.com/cdn/shop/files/ASDASDA_360x.jpg?v=1652694147", // Replace with actual image URL
    title: "Ergonomic Design",
    description:
      "Enjoy stylish and ergonomic work seating for every budget, from the home office to the open office. Durable, adjustable and built to inspire: make your office feel like home with contract-grade desks & chairs from GRID Furniture.",
  },
  {
    id: 3,
    image: "https://99grid.com/cdn/shop/files/5A2A5635_360x.jpg?v=1613715225", // Replace with actual image URL
    title: "Wherever you are, work your best.",
    description:
      "Our breathable mesh material provides an optimal air flow to avoid sweating and sticking, keep air circulation for extra comfort, and the mesh office chair resists abrasion and transformation.",
  },
];

export default function FeatureSection() {
  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className="relative max-h-96 w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="mb-4 h-96 w-full object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              <h3 className="mb-2 mt-5 text-xl font-bold">{feature.title}</h3>
              <p className="px-2 text-base leading-7 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
