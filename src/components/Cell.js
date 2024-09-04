const Cell = ({ day, onClick, active, onHover, hoverActive }) => (
  <div className="flex items-center justify-center w-16 h-16 box-border">
    <div
      className={`w-11 h-11 cursor-pointer flex items-center justify-center  ${
        active
          ? "bg-red-500 rounded-full"
          : "hover:bg-red-300 hover:rounded-full"
      } ${hoverActive ? "bg-red-300 rounded-full" : ""}
        `}
      onClick={() => onClick(day)}
      onMouseEnter={() => onHover(day)}
      onMouseLeave={() => onHover(undefined)}
    >
      {day.date()}
    </div>
  </div>
);

export default Cell;
