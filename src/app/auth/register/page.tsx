import FormHeading from "@/components/UI/FormHeading/FormHeading";
import RegistrationForm from "./registrationForm";

export default function RegisterPage() {
  return (
    <div className={`auth-container register-container`}>
      <div>
        <FormHeading>Register</FormHeading>
        <RegistrationForm />
      </div>
    </div>
  );
}
