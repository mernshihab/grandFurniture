import parser from "html-react-parser";
import { useGetReturnPolicyQuery } from "../Redux/returnPolicy/returnPolicyApi";
import usePageView from "../hooks/usePageView";

export default function ReturnPolicy() {
  usePageView("Return Policy");
  window.scrollTo(0, 0);
  const { data } = useGetReturnPolicyQuery();
  const privacy = data?.data;

  return (
    <section className="min-h-[60vh] mt-20 py-5">
      <div className="container">
        <h2 className="mb-6 text-center text-3xl font-medium text-primary sm:text-4xl">
          Return Policy
        </h2>
        {privacy?.description && parser(privacy?.description)}
      </div>
    </section>
  );
}
