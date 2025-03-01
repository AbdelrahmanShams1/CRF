import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle,  FaMoon,
  FaSun, } from "react-icons/fa";
import azkar from "../azkar.json";

const Azkar = () => {
  const navigate = useNavigate();
  const data = azkar;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
        >
          <FaArrowLeft className="w-3 h-3 ml-1" />
          العودة إلى الصفحة الرئيسية
        </button>
        <div className="bg-white/95 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl p-6 rounded-lg mt-4">
          <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-green-900">
            <FaSun className="w-6 h-6 text-yellow-500 me-2" />
            أذكار الصباح والمساء
            <FaMoon className="w-6 h-6 text-blue-500 ms-2" />
          </div>

          <div className="space-y-6 mt-6">
            {data.map((zekr) => (
              <div
                key={zekr.zekr}
                className="bg-blue-50 p-4 rounded-lg space-y-2 shadow-md"
              >
                <p className="text-lg/loose p-4 pb-8 border-b text-green-700 border-b-indigo-500">{`"${zekr.zekr}"`}</p>
                <div className="text-lg/loose p-4 flex items-center"><span className="font-semibold">عدد مرات التكرار :</span><p className="text-white text-xl font-semibold size-10 flex items-center justify-center ms-2 rounded-full bg-indigo-700">{` ${zekr.count}`}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Azkar;
