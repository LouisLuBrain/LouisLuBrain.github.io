import { Calendar } from "./components";

function App() {
  return (
    <div className="w-full h-full min-h-screen bg-gray-200 py-10 px-20">
      <div className="grid grid-cols-3 w-full gap-6">
        <div className="flex">
          <Calendar />
        </div>
        <div className="flex"></div>
        <div className="flex"></div>
        <div className="flex"></div>
        <div className="flex"></div>
        <div className="flex"></div>
        <div className="flex"></div>
        <div className="flex"></div>
        <div className="flex"></div>
      </div>
    </div>
  );
}

export default App;
