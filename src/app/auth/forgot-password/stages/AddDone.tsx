import ForgotPasswordLayout from "@/layouts/ForgotPasswordLayout";
import Link from "next/link";

const AllDone = () => {
  return (
    <ForgotPasswordLayout
      title="All done!"
      description="Your password has been reset. You can now login with your new password."
      stage={4}
    >
      <div className="done-btns">
        <Link href="/auth/login" className="primary-button">
          Login
        </Link>
      </div>
    </ForgotPasswordLayout>
  );
};

export default AllDone;
