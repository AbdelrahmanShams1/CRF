import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaStar, FaUserPlus } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError({ message: "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل." });
      return;
    }
    const newUser = {
      name,
      email,
      password,
      type,
      age,
      activities: [],
      totalPoints: 0,
      lastRecord:0
    };
    const userRef = doc(db, "usersFamily", email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      alert("البريد الإلكتروني مسجل مسبقاً. يرجى استخدام بريد آخر.");
      return;
    }

    try {
      setLoading(true);
      await setDoc(userRef, newUser);
      alert("تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
      navigate("/CRF/login");
    } catch (error) {
      console.error("Error saving user to Firestore:", error.message);
      setError({
        message: error.message || "حدث خطأ أثناء التسجيل. حاول مرة أخرى.",
      });
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <FaStar className="text-yellow-400 w-16 h-16" />
          <h1 className="text-2xl font-bold text-center mt-4 text-indigo-900">
            انضم إلى مسابقة رمضان
          </h1>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            className="outline-none w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            placeholder="الاسم الكامل"
            dir="rtl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select
            className="outline-none w-full  px-4 py-2 border border-gray-300 rounded-md text-right "
            dir="rtl"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="" disabled>
              اختر النوع
            </option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>

          <input
            type="number"
            className="outline-none w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            placeholder="العمر"
            dir="rtl"
            value={age} // إصلاح القيمة
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <input
            className="outline-none w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            type="text"
            placeholder="البريد الإلكتروني"
            dir="rtl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="outline-none w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            type="password"
            placeholder="كلمة المرور"
            dir="rtl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="text-red-500 text-center">{error.message}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="outline-none w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center"
          >
            {loading && (
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            {!loading && <FaUserPlus className="ml-2 w-4 h-4" />}
            {!loading && " إنشاء حساب"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
