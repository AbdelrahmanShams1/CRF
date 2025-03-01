import { FaMoon, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usersFamily"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("totalPoints", 0);
      navigate("/CRF/routinPage");
    } else {
      setError("إيميل أو كلمة مرور غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <FaMoon className="text-yellow-400 w-16 h-16" />
          <h1 className="text-2xl font-bold text-center mt-4 text-indigo-900">
            مرحباً بك في مسابقة رمضان
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="outline-none w-full px-4 py-2 border border-gray-300 rounded-md text-right"
              placeholder="البريد الإلكتروني"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="outline-none w-full px-4 py-2 border border-gray-300 rounded-md text-right"
              placeholder="كلمة المرور"
              dir="rtl"
            />
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center"
          >
            <FaSignInAlt className="ml-2 w-4 h-4" />
            تسجيل الدخول
          </button>
          <Link
            to="/CRF/signup"
            className="text-indigo-500 hover:underline text-lg text-center block"
          >
            التسجيل بحساب جديد
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
