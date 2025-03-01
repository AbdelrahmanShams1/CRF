import { useNavigate, Link } from "react-router-dom";
import { FaQuestionCircle, FaArrowLeft, FaSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import QuestionsData from "../Questions.json";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const Question = () => {
  const navigate = useNavigate();
  const [randomQuestion, setRandomQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [userEmail, setUserEmail] = useState("");
  let storedUser = localStorage.getItem("loggedInUser");
  let DOQ = localStorage.getItem("dataOfQuetion")
    ? JSON.parse(localStorage.getItem("dataOfQuetion"))
    : { question: "", date: "" };

  const [dataOfQuetion, setDataOfQuetion] = useState({
    question: "",
    date: "",
  });

  useEffect(() => {
    storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserEmail(parsedUser.email);
    }

     const today = new Date().toISOString().split("T")[0];
   
    if (DOQ.date == today && DOQ.email == JSON.parse(storedUser).email) {
      setRandomQuestion(DOQ.question);
    } else {
      console.log(DOQ);
      const selectedQuestions = Object.entries(QuestionsData).filter(
        ([date, questions]) => {
          if (date == today) {
            const QuestionsArray = Object.entries(questions);
            const todayQuestions = QuestionsArray.map(([, value]) => {
              return {
                ...value,
              };
            });
            return [date, [...todayQuestions]];
          }
        }
      );

      const [[, todayQuestions]] = selectedQuestions;
      const todaysrandomQuestion =
        todayQuestions[
          Math.floor(Math.random() * Object.keys(todayQuestions).length)
        ];
      setRandomQuestion(todaysrandomQuestion);
      const d = {
        email: JSON.parse(storedUser).email,
        question: todaysrandomQuestion,
         date:new Date().toISOString().split("T")[0]
        
      };
      setDataOfQuetion(d);
      localStorage.setItem("dataOfQuetion", JSON.stringify(d));
      console.log(d);
    }
  }, []);

  async function handleSaveAnswer() {
    if (!randomQuestion || !answer.trim()) {
      alert("يرجى إدخال إجابة قبل الحفظ.");
      return;
    }

    const questionData = {
      question: randomQuestion.question,
      answer: answer,
      points: 0,
      date: new Date().toISOString(),
    };

    try {
      const userRef = doc(db, "usersFamily", userEmail);
      await updateDoc(userRef, {
        questions: arrayUnion(questionData),
      });
      console.log("تم حفظ الإجابة بنجاح في Firestore");
      console.log(dataOfQuetion);
      navigate("/CRF/standing");
    } catch (error) {
      console.error("خطأ في حفظ الإجابة:", error);
    }
  }

  return (
    <>
      {randomQuestion && (
        <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 p-4">
          <div className="container mx-auto max-w-4xl">
            <Link
              className="inline-flex mb-1.5 items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
              to={"/CRF/routinPage"}
            >
              العودة إلى الصفحة الرئيسية
            </Link>
            <div className="bg-white/95 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl p-6 rounded-lg mt-4">
              <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-indigo-900">
                <FaQuestionCircle className="w-6 h-6 text-blue-500" />
                سؤال اليوم
              </div>
              <div className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-indigo-900">
                    - {randomQuestion.question}؟
                  </h3>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-2">إجابتك:</label>
                    <textarea
                      placeholder=" ادخل الاجابه علي نفس هذا الشكل : اسم السوره - رقم الاية"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-600 transition-all"
                      rows="2"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSaveAnswer}
                    className="outline-none w-[80%] mx-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-bold text-lg flex items-center justify-center"
                  >
                    <FaSave className="w-4 h-4 ml-1" />
                    حفظ الإجابة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
