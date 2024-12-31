import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetContactQuery } from "../../Redux/contact/contactApi";

export default function WhatsappBtn() {
  const { data } = useGetContactQuery();
  const whatsapp = data?.data[0]?.whatsapp;
  return (
    <Link
      to={`https://wa.me/${whatsapp}`}
      target="_blank"
      className="fixed bottom-[108px] right-3 z-40 h-11 w-11 rounded-lg bg-base-100 text-green-600 shadow-xl duration-200 hover:bg-gray-50 sm:bottom-20 sm:right-5 sm:h-12 sm:w-12"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <BsWhatsapp className="text-2xl sm:text-3xl" />

        <p className="absolute right-0 top-0 z-50 h-2 w-2 rounded-full bg-red-600"></p>
      </div>
    </Link>
  );
}
