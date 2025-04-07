import "./EmptyData.css";
import { FaRegFaceFrownOpen } from "react-icons/fa6";

const EmptyData = (props) => {
  return (
    <div className="empty-data col-center" {...props}>
      <FaRegFaceFrownOpen />
      <p>
        No <span className="highlighted-text">results</span> found
      </p>
    </div>
  );
};

export default EmptyData;
