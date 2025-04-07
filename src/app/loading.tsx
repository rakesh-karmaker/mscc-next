import Loader from "@/components/UI/Loader/Loader";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white flex items-center justify-center">
      <Loader />
    </div>
  );
}
