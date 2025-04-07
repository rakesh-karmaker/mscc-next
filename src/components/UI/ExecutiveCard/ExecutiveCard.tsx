import "@/components/UI/ExecutiveCard/ExecutiveCard.css";
import { ExecutivesData } from "@/types/commonTypes";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ExecutiveCard = ({
  executiveData,
}: {
  executiveData: ExecutivesData;
}) => {
  const { name, position, image, socials, panel } = executiveData;
  return (
    <div className="executive-member">
      <div>
        <div className="executive-upper">
          <LazyLoadImage
            src={`/executive-members/${image}`}
            alt={`A picture of ${name}, our ${position} of MSCSC in ${panel}`}
            effect="blur"
          />

          <div className="member-socials row-center">
            <ExecutiveSocials
              socials={
                Object.fromEntries(
                  Object.entries(socials).filter(
                    ([value]) => value !== undefined
                  )
                ) as { [key: string]: string }
              }
              name={name}
            />
          </div>
        </div>
        <div className="executive-lower col-center">
          <p>{name}</p>
          <p className="secondary-text">{position}</p>
        </div>
      </div>
    </div>
  );
};

const ExecutiveSocials = ({
  socials,
  name,
}: {
  socials: { [key: string]: string };
  name: string;
}) => {
  const socialsList = Object.keys(socials);
  if (socialsList.length > 0) {
    return (
      <>
        {socialsList.map((social) => {
          return (
            <a
              key={social}
              href={socials[social]}
              className="row-center"
              title={social}
              aria-label={`Go to ${name}'s ${social} page`}
            >
              <ExecutiveSocialIcon social={social} />
            </a>
          );
        })}
      </>
    );
  } else {
    return;
  }
};

const ExecutiveSocialIcon = ({ social }: { social: string }) => {
  switch (social) {
    case "facebook":
      return <FaFacebook />;
    case "twitter":
      return <FaTwitter />;
    case "linkedin":
      return <FaLinkedin />;
    case "instagram":
      return <FaInstagram />;
    case "github":
      return <FaGithub />;
    default:
      return;
  }
};

export default ExecutiveCard;
