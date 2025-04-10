import FormHeading from "@/components/UI/FormHeading/FormHeading";
import LoginForm from "./loginForm";

export default function LoginPage() {
  return (
    <div className={`auth-container login-container`}>
      <div>
        <FormHeading>Login</FormHeading>
        <LoginForm />
      </div>
    </div>
  );
}
