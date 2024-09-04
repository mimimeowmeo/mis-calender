import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Header = ({ date, onLeftClick, onRightClick }) => {
  return (
    <div className="font-bold flex justify-between items-center p-5">
      <button className="h-10 w-10" onClick={onLeftClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {`${date.year()}年${+date.month() + 1}月`}
      <button className="h-10 w-10" onClick={onRightClick}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Header;
