"ues client";

import Loader from "@/components/UI/Loader/Loader";

export default function loading() {
  return (
    <div style={{ height: "100vh" }} className="row-center">
      <Loader />
    </div>
  );
}
