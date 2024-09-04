import dayjs from "dayjs";
import Calendar from "./components/Calendar";

const App = () => {
  const today = dayjs();

  return (
    <div className="flex justify-center items-center p-20">
      <Calendar date={today} />
    </div>
  );
};

export default App;
