import { Error, ErrorContent } from "@/components/UI/Error/Error";
import Header from "@/layouts/Header/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="page-error">
        <Error heading="404" link="/" linkText="Go to Homepage">
          <ErrorContent message="OOPS! PAGE NOT FOUND">
            The page you are trying to access doesn’t exist or has been moved.
            <br />
            Try going back to homepage
          </ErrorContent>
        </Error>
      </main>
    </>
  );
}
