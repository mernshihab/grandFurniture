import { Link } from "react-router-dom";

export default function FeatureProduct() {
  return (
    <section className="py-10">
      <div className="container">
        <div className="grid grid-cols-2">
          <div className="flex justify-end">
            <img src="/images/featureChair.webp" className="w-[95%]" alt="featureChair" />
          </div>
          <div className="flex justify-center items-center">
            <div className="w-[62%]">
              <h1 className="font-bold text-4xl">We Create Meaningful Design</h1>
              <p className="mt-4 mb-5 text-neutral">
                GRID ensures you 100% authenticity and originality of the
                products which are imported via China, Vietnam & Taiwan. We
                never want you to compromise with the quality that is why we
                ensure you get the best furniture delivered via GRID! <br />
                <br />
                1. We assure you 100% premium quality of our products and before
                the delivery of each product, we have 4 product experts who do
                the quality check while the product is ready for delivery. 2. At
                GRID, we deliver you premium quality and stylish design which
                also delivers the meaning of elegance at your home. 3. Our
                products are made of strong materials imported from China which
                ensure 100% durability.
              </p>
              <Link className="py-3 px-4 text-white bg-black font-bold" to="/">Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
