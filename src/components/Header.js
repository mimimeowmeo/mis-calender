import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Header = ({ date, onLeftClick, onRightClick }) => {
  return (
    <div className="font-bold flex justify-between items-center p-5">
      <button className="h-10 w-10" onClick={(e) => onLeftClick(e)}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {`${date.format("MMMM")} ${date.year()}`}
      <button className="h-10 w-10" onClick={(e) => onRightClick(e)}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Header;
