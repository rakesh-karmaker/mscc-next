import { Error, ErrorContent } from "@/components/UI/Error/Error";
import Header from "@/layouts/Header/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="page-error">
        <Error heading="404" link="/" linkText="Go to Homepage">
          <ErrorContent message="OOPS! MEMBER NOT FOUND">
            The member you are trying to find doesn’t exist or have been moved.
            <br />
            Try going back to homepage
          </ErrorContent>
        </Error>
      </main>
    </>
  );
}
