import { FaTrophy, FaCrown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Standing = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserGender, setCurrentUserGender] = useState("");
  let storedUser = localStorage.getItem("loggedInUser");
  const em= JSON.parse(storedUser).email

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usersFamily"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          totalPoints: doc.data().totalPoints,
          gender: doc.data().type, // تأكد أن هذا الحقل موجود في الفايربيس
        }));

        // تحديد المستخدم الحالي (هنا يجب أن يكون لديك وسيلة لتحديد المستخدم الحالي)
        const currentUser = usersData.find((user) => user.id == em); // استبدل بـ الطريقة المناسبة لجلب المستخدم الحالي

        if (currentUser) {
          setCurrentUserGender(currentUser.gender);

          // تصفية المستخدمين بناءً على جنس المستخدم الحالي
          const filteredUsers = usersData.filter(
            (user) => user.gender === currentUser.gender
          );

          const sortedUsers = filteredUsers
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((user, index) => ({
              ...user,
              rank: index + 1,
            }));

          setLeaderboard(sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex flex-col items-center justify-center p-4">
      <Link
        className="inline-flex mb-1.5 items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
        to={"/CRF/routinPage"}
      >
        العودة إلى الصفحة الرئيسية
      </Link>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-indigo-700">
          <FaTrophy className="w-6 h-6 text-yellow-500" />
          المتصدرون ({currentUserGender === "male" ? "الذكور" : "الإناث"})
        </div>

        <div className="space-y-4 mt-4">
          {leaderboard.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all shadow"
            >
              <div className="flex items-center gap-4">
                {player.rank === 1 && (
                  <FaCrown className="w-6 h-6 text-yellow-500" />
                )}
                <span className="font-bold text-lg">{player.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-indigo-600">
                  {player.totalPoints} نقطة
                </span>
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">
                  #{player.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Standing;
