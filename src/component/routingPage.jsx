import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import fanous from "../assets/fanous.svg";

const RoutingPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser);
      setName(parsedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setName("");
    navigate("/CRF/login"); // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الخروج
  };

  console.log(name);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-800 via-purple-700 to-indigo-900 text-center p-4">
      {/* زر تسجيل الخروج في الأعلى */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition transform hover:scale-105 flex items-center justify-center"
        >
          <span className="ml-2">🚪</span>
          تسجيل الخروج
        </button>
      </div>

      <div className="text-yellow-400 animate-pulse">
        <img
          src={fanous}
          alt="فانوس رمضان"
          className="sm:size-64 size-52 mx-auto mb-4 drop-shadow-lg"
        />
      </div>

      <h1 className="text-2xl sm:text-5xl font-bold text-white drop-shadow-lg mb-4">
        🌙 مرحبًا بك {name} في مسابقة رمضان 🎉
      </h1>

      <p className="text-lg sm:text-xl text-white/90 mt-2 mb-8">
        سجل أعمالك اليومية واربح الجوائز في نهاية الشهر الكريم
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Link
          className="px-6 py-4 text-lg bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 flex items-center justify-center"
          to={"/CRF/activity"}
        >
          <span className="ml-2">🔍</span>
          معرفة نشاطاتي
        </Link>

        <Link
          className="px-6 py-4 text-lg bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition transform hover:scale-105 flex items-center justify-center"
          to={"/CRF/home"}
        >
          <span className="ml-2">📝</span>
          إدخال أنشطة اليوم
        </Link>

        <Link
          className="px-6 py-4 text-lg bg-yellow-600 text-white rounded-xl shadow-lg hover:bg-yellow-700 transition transform hover:scale-105 flex items-center justify-center"
          to={"/CRF/dayly-question"}
        >
          <span className="ml-2">❓</span>
          السؤال اليومي
        </Link>

        <Link
          className="px-6 py-4 text-lg bg-purple-600 text-white rounded-xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105 flex items-center justify-center"
          to={"/CRF/standing"}
        >
          <span className="ml-2">🏆</span>
          الترتيب
        </Link>

        <Link
          className="px-6 py-4 text-lg bg-orange-600 text-white rounded-xl shadow-lg hover:bg-orange-700 transition transform hover:scale-105 flex items-center justify-center"
          to={"/CRF/instructions"}
        >
          <span className="ml-2">📜</span>
          التعليمات
        </Link>

        <Link
          className="px-6 py-4 text-lg bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition transform hover:scale-105 flex items-center justify-center"
          to={"/CRF/azkar"}
        >
          <span className="ml-2">🕌</span>
          الأذكار
        </Link>
      </div>

      <p className="text-white/70 mt-8 text-sm">
        رمضان كريم وكل عام وأنتم بخير
      </p>
    </div>
  );
};

export default RoutingPage;