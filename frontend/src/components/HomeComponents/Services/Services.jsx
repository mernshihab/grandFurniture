import { TbTruckDelivery } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

const Services = () => {
  return (
    <div className="md:py-20 py-8 bg-white">
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {/* Free Delivery */}
          <div className="flex flex-col items-center">
            <TbTruckDelivery className="text-6xl text-black mb-4" />
            <h6 className="text-xl font-semibold mb-2">Free Delivery</h6>
            <p className="text-sm text-gray-600">
              FREE home delivery with assembling inside Dhaka within 3 days and
              5-7 days anywhere in Bangladesh. Inside Dhaka City, we offer free
              home delivery to the ground floor through courier.
            </p>
          </div>

          {/* Returns & Warranty */}
          <div className="flex flex-col items-center">
            <MdVerified className="text-6xl text-black mb-4" />
            <h6 className="text-xl font-semibold mb-2">Returns & Warranty</h6>
            <p className="text-sm text-gray-600">
              GRID provides an easy, hassle-free servicing system where we pick
              up your product from your home if there is any problem and get it
              back to you.
            </p>
          </div>

          {/* EMI Policy */}
          <div className="flex flex-col items-center">
            <BiSupport className="text-6xl text-black mb-4" />
            <h6 className="text-xl font-semibold mb-2">EMI Policy</h6>
            <p className="text-sm text-gray-600">
              To avail EMI, place your order through our website and share your
              order ID in our inbox. We will share the EMI payment link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
