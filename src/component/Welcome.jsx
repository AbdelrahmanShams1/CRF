import { Link } from "react-router-dom";
import fanous from "../assets/fanous.svg";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 text-center p-3">
      <div className="text-yellow-400">
        <img src={fanous} alt="fanous" className="sm:size-72 size-60 mb-2" />
      </div>
      <h1 className="text-xl sm:text-4xl font-bold text-white drop-shadow-lg">
        🌙مرحبًا بكم في مسابقة رمضان🎉
      </h1>
      <p className="text-lg text-white mt-2">
        سجل أعمالك اليومية واربح الجوائز في نهاية الشهر
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          className="px-4 py-3 text-sm sm:text-lg sm:px-6 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
          to={"/Quran_Compition/signup"}
        >
          أنشئ حسابًا جديدًا 🚀
        </Link>
        <Link
          className="px-4 py-3 text-sm sm:text-lg sm:px-6 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 transition"
          to={"/Quran_Compition/login"}
        >
          سجل الدخول 🚪
        </Link>
      </div>
    </div>
  );
}
