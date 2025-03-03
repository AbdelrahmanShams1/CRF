import { useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaMoon,
  FaSave,
  FaBookOpen,
  FaSun,
  FaCheckCircle,
  FaInfoCircle,
  FaBolt,
  FaQuestionCircle,
  FaArrowLeft,
  FaPray
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef , useState ,useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const Home = () => {
  const navigate = useNavigate();
  const fajrRef = useRef();
  const fajrAzkarRef = useRef();
  const dhuhrRef = useRef();
  const dhuhrAzkarRef = useRef();
  const asrRef = useRef();
  const asrAzkarRef = useRef();
  const maghribRef = useRef();
  const maghribAzkarRef = useRef();
  const ishaRef = useRef();
  const ishaAzkarRef = useRef();
  const quranRef = useRef();
  const duhaRef = useRef();
  const taraweehRakaatRef = useRef();
  const taraweehPlaceRef = useRef();
  const witrRef = useRef();
  const tahagodRed = useRef();
  const rawatibPrayersRef = useRef();
  const morningAdhkarRef = useRef();
  const eveningAdhkarRef = useRef();
  const generalAdhkarRef = useRef();
  const iftarRef = useRef();
  const visitPatientRef = useRef();
  const charityRef = useRef();
  const funeralRef = useRef();
  const prayForRef = useRef();
  const [userGender, setUserGender] = useState("");
  const [userEmail,setUserEmail] =useState("")
  const [previousPoints,setPreviousPoints] =useState(0)
  const [modifyData ,setModifyData] = useState({});
  const [lastRecord, setLastRecord] = useState(0);
  const [activitiesHistory, setActivitiesHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  let storedUser = localStorage.getItem("loggedInUser");
  const em= JSON.parse(storedUser).email
  let dateActiv = new Date();
  let formattedDate = new Intl.DateTimeFormat("en-CA").format(dateActiv);
  
  const [activitiesPoints, setActivitiesPoints] = useState({
    data: {
      date: "",
      fajr: { type: "", azkar: false, points: 0 },
      dhuhr: { type: "", azkar: false, points: 0 },
      asr: { type: "", azkar: false, points: 0 },
      maghrib: { type: "", azkar: false, points: 0 },
      isha: { type: "", azkar: false, points: 0 },
      quran: { numOfPages: 0, points: 0 },
      duha: { numOfPray: 0, points: 0 },
      taraweeh: { type: "", numOfPray: 0, witr: false, points: 0 },
      tahajjud: { numOfPray: 0, points: 0 },
      rawatib: { numOfPray: 0, points: 0 },
      try: -1,
      adhkar: {
        morning: false,
        evening: false,
        general: 0,
        points: 0,
      }, 
      rawatib: {
        numOfPray: 0,
        points: 0,
      },
      questionData : {
        question: "",
        answer: "",
        points: 0, 
        date: "", 
      },
      extra: {
        iftar: 0,
        visitPatient: false,
        charity: false,
        funeral: false,
        prayFor: false,
        points: 0,
      },
      totalPointsPerDay: 0,
     
      
    },
  });

  useEffect(() => {
    storedUser = localStorage.getItem("loggedInUser");
    const points = localStorage.getItem("totalPoints");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserGender(parsedUser.type);
      setUserEmail(parsedUser.email);
     
    }

    const fetchData = async () => {
      try {
        const userRef = doc(db, "usersFamily",em); // استبدل "aboda1" بالبريد الإلكتروني الفعلي
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setModifyData(userData);
          setTotalPoints(userData.totalPoints || 0);
          setLastRecord(userData.lastRecord)
          setActivitiesHistory(userData.activities || {});
          setSelectedDate(Object.keys(userData.activities)[0]); // تعيين أول تاريخ كقيمة افتراضية
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  async function handleSaveData() {
    let dateActiv = new Date();
    let formattedDate = new Intl.DateTimeFormat("en-CA").format(dateActiv);
    const todayDate = new Date();

    const data = {
        date: todayDate,
        fajr: {
          type: fajrRef.current.value == 1000 ? "في المسجد"
              : fajrRef.current.value == 900 && userGender == "female" ? "عذر قهري "
              : fajrRef.current.value == 910 ? "في الوقت"
              : fajrRef.current.value == 700 ? "حاضر"
              : fajrRef.current.value == 300 ? "تأخير "
              : fajrRef.current.value == 100 ? "قضاء " : "لم يحدد",
          azkar: fajrAzkarRef.current.checked,
          points: +fajrRef.current.value + (fajrAzkarRef.current.checked ? 50 : 0),
      },
      dhuhr: {
          type: dhuhrRef.current.value == 1000 ? "في المسجد"
              : dhuhrRef.current.value == 900 && userGender == "female" ? "عذر قهري "
              : dhuhrRef.current.value == 910 ? "في الوقت"
              : dhuhrRef.current.value == 700 ? "حاضر"
              : dhuhrRef.current.value == 300 ? "تأخير "
              : dhuhrRef.current.value == 100 ? "قضاء " : "لم يحدد",
          azkar: dhuhrAzkarRef.current.checked,
          points: +dhuhrRef.current.value + (dhuhrAzkarRef.current.checked ? 50 : 0),
      },
      asr: {
          type: asrRef.current.value == 1000 ? "في المسجد"
              : asrRef.current.value == 900 && userGender == "female" ? "عذر قهري "
              : asrRef.current.value == 910 ? "في الوقت"
              : asrRef.current.value == 700 ? "حاضر"
              : asrRef.current.value == 300 ? "تأخير "
              : asrRef.current.value == 100 ? "قضاء " : "لم يحدد",
          azkar: asrAzkarRef.current.checked,
          points: +asrRef.current.value + (asrAzkarRef.current.checked ? 50 : 0),
      },
      maghrib: {
          type: maghribRef.current.value == 1000 ? "في المسجد"
              : maghribRef.current.value == 900 && userGender == "female" ? "عذر قهري "
              : maghribRef.current.value == 910 ? "في الوقت"
              : maghribRef.current.value == 700 ? "حاضر"
              : maghribRef.current.value == 300 ? "تأخير "
              : maghribRef.current.value == 100 ? "قضاء " : "لم يحدد",
          azkar: maghribAzkarRef.current.checked,
          points: +maghribRef.current.value + (maghribAzkarRef.current.checked ? 50 : 0),
      },
      isha: {
          type: ishaRef.current.value == 1000 ? "في المسجد"
              : ishaRef.current.value == 900 && userGender == "female" ? "عذر قهري "
              : ishaRef.current.value == 910 ? "في الوقت"
              : ishaRef.current.value == 700 ? "حاضر"
              : ishaRef.current.value == 300 ? "تأخير "
              : ishaRef.current.value == 100 ? "قضاء " : "لم يحدد",
          azkar: ishaAzkarRef.current.checked,
          points: +ishaRef.current.value + (ishaAzkarRef.current.checked ? 50 : 0),
      },
        quran: {
            numOfPages: +quranRef.current.value,
            points: +quranRef.current.value * 30,
        },
        duha: {
            numOfPray: +duhaRef.current.value,
            points: +duhaRef.current.value * 50,
        },
        taraweeh: {
            type: taraweehPlaceRef.current.value == 60 ? "في المسجد " : "في البيت ",
            numOfPray: +taraweehRakaatRef.current.value,
            witr: witrRef.current.checked,
            points: +taraweehRakaatRef.current.value * (taraweehPlaceRef.current.value ? +taraweehPlaceRef.current.value : 0) + (witrRef.current.checked ? 80 : 0),
        },
        tahajjud: {
            numOfPray: +tahagodRed.current.value,
            points: +tahagodRed.current.value * 70,
        },
        rawatib: {
            numOfPray: +rawatibPrayersRef.current.value,
            points: +rawatibPrayersRef.current.value * 50,
        },
        adhkar: {
            morning: morningAdhkarRef.current.checked,
            evening: eveningAdhkarRef.current.checked,
            general: +generalAdhkarRef.current.value,
            points: (morningAdhkarRef.current.checked ? 200 : 0) +
                (eveningAdhkarRef.current.checked ? 200 : 0) +
                (+generalAdhkarRef.current.value / 1000) * 200,
        },
        
      questionData : {
        question: "",
        answer: "",
        points: 0, 
        date: "", 
      },
      try:  activitiesHistory[formattedDate]?.try !== undefined 
      ? activitiesHistory[formattedDate].try + 1 
      : 0,
        extra: {
            iftar: +iftarRef.current.value,
            visitPatient: visitPatientRef.current.checked,
            charity: charityRef.current.checked,
            funeral: funeralRef.current.checked,
            prayFor: prayForRef.current.checked,
            points: +iftarRef.current.value * 100 +
                (visitPatientRef.current.checked ? 200 : 0) +
                (charityRef.current.checked ? 100 : 0) +
                (funeralRef.current.checked ? 200 : 0) +
                (prayForRef.current.checked ? 200 : 0),
        },
    };
    const userRef = doc(db, "usersFamily", userEmail);



    const newPoints = data.fajr.points + data.dhuhr.points + data.asr.points +
        data.maghrib.points + data.isha.points + data.quran.points +
        data.duha.points + data.taraweeh.points + data.tahajjud.points +
        data.rawatib.points + data.adhkar.points + data.extra.points;

      
    data.totalPointsPerDay = newPoints;
    data.lastRecord = newPoints;
    localStorage.setItem("totalPoints", JSON.stringify(totalPoints));


    try {
      const parsedUser = JSON.parse(storedUser);
      // Check if data exists for the date
      if (!modifyData.activities[formattedDate]) {
        setActivitiesPoints({ data });
        const num = data.totalPointsPerDay + totalPoints
              await updateDoc(userRef, {
                [`activities.${formattedDate}`]: data,
                totalPoints: num,
                lastRecord:newPoints
              });
             
        console.log("تم حفظ البيانات وتحديث النقاط بنجاح في Firestore");
        navigate("/CRF/standing");
      } else {
        setLastRecord(modifyData.lastRecord)
        console.log("last",totalPoints, lastRecord,newPoints)
        const num=totalPoints - lastRecord + newPoints
        setTotalPoints(num);
        console.log("last",totalPoints, lastRecord,newPoints)
        setActivitiesPoints({ data });
        await updateDoc(userRef, {
          [`activities.${formattedDate}`]: data,
          totalPoints: num,
          lastRecord:newPoints
        });
        console.log("تم العثور على البيانات بالفعل، لن يتم الإضافة");
        navigate("/CRF/standing");
      }
    }
     catch (error) {
        console.error("خطأ في حفظ البيانات:", error);
    }
}

  const prayers = [
    { id: "fajr", value: "الفجر", salahRef: fajrRef, azkarRef: fajrAzkarRef },
    {
      id: "dhuhr",
      value: "الظهر",
      salahRef: dhuhrRef,
      azkarRef: dhuhrAzkarRef,
    },
    { id: "asr", value: "العصر", salahRef: asrRef, azkarRef: asrAzkarRef },
    {
      id: "maghrib",
      value: "المغرب",
      salahRef: maghribRef,
      azkarRef: maghribAzkarRef,
    },
    { id: "isha", value: "العشاء", salahRef: ishaRef, azkarRef: ishaAzkarRef },
  ];
  console.log(visitPatientRef.current?.checked);
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 py-6 px-4">
     <Link
            className="inline-flex mb-1.5 items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
            to={"/CRF/routinPage"}
          >
           العودة إلى الصفحة الرئيسية
          </Link>
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
      
        <div className="flex flex-col items-center mb-6 border-b pb-4">
          <FaMoon className="text-yellow-400 w-12 h-12" />
          <h1 className="text-3xl font-bold text-center mt-2 text-indigo-900">
            تسجيل نقاط مسابقة رمضان
          </h1>
        </div>

        <div className="space-y-8" dir="rtl">
          <div>
            <Link
              to={"/CRF/instructions"}
              className="col-span-2 text-center bg-gradient-to-b from-purple-600 to-indigo-900 hover:from-purple-700 hover:to-indigo-800 text-white py-3 px-2 rounded-md font-bold text-lg flex items-center justify-center"
            >
              <FaInfoCircle className="ml-2" />
              التعليمات والشروط
            </Link>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <FaCheckCircle className="ml-2" />
              الصلوات
            </h2>

            {prayers.map((prayer, index) => (
              <div
                key={prayer.id}
                className="mb-6 border-b pb-4 last:border-b-0"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center ml-2 text-indigo-600">
                      {index + 1}
                    </span>
                    صلاة {prayer.value}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        نوع الصلاة:
                      </label>
                      {userGender === "male" ? (
                        <select
                          ref={prayer.salahRef}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                           <option value={0}>لم يتم الصلاه (0 نقطة)</option>
                          <option value={1000}>
                            جماعة في المسجد (1000 نقطة)
                          </option>
                          <option value={700}>حاضر (700 نقطة)</option>
                          <option value={300}>تأخير (300 نقطة)</option>
                          <option value={100}>قضاء (100 نقطة)</option>
                        </select>
                      ) : (
                        <select
                          ref={prayer.salahRef}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                           
                          <option value={0}>لم يتم الصلاه (0 نقطة)</option>
                          <option value={900}>في الوقت (900 نقطة)</option>
                          <option value={300}>متأخر (300 نقطة)</option>
                          <option value={100}>قضاء (100 نقطة)</option>
                          <option value={900}>عذر قهري (900 نقطة)</option>
                          <option value={1000}>جماعة (بونص) (1000 نقطة)</option>
                        </select>
                      )}
                    </div>
                    <div className="flex items-center bg-indigo-50 p-3 rounded-md">
                      <input
                        ref={prayer.azkarRef}
                        type="checkbox"
                        className="ml-2 h-5 w-5 text-indigo-600 outline-none "
                      />
                      <label className="text-gray-700">
                        أذكار الصلاة (50 نقطة)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <FaBookOpen className="ml-2" />
              القرآن الكريم
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">
                عدد الصفحات (30 نقطة لكل صفحة):
              </label>
              <input
                ref={quranRef}
                type="number"
                min="0"
                className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
              <FaSun className="ml-2" />
              صلاة الضحى
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">
                عدد الركعات (50 نقطة لكل ركعة):
              </label>
              <input
                ref={duhaRef}
                type="number"
                min="0"
                max="8"
                className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <FaMoon className="ml-2" />
              صلاة التراويح
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">مكان الصلاة:</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none "
                  ref={taraweehPlaceRef}
                >
                  <option value={60}>في المسجد (60 نقطة لكل ركعة)</option>
                  <option value={50}>في البيت (50 نقطة لكل ركعة)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">عدد الركعات:</label>
                <input
                  ref={taraweehRakaatRef}
                  type="number"
                  min="0"
                  className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={witrRef}
                />
                <label className="text-gray-700">صلاة الوتر (80 نقطة)</label>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <FaMoon className="ml-2" />
              صلاة التهجد
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">
                عدد الركعات (70 نقطة لكل ركعة):
              </label>
              <input
                type="number"
                min="0"
                ref={tahagodRed}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
              <FaPray className="ml-2" />
              السنن الرواتب
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">
                عدد ركعات السنن الرواتب (40 نقطة لكل ركعة):
              </label>
              <input
                ref={rawatibPrayersRef}
                type="number"
                min="0"
                max="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              />
              <span className="text-sm text-gray-500 block mt-1">
                * تشمل سنن الفجر (2 ركعة)، سنن الظهر (2+2 ركعة)، سنن المغرب (2 ركعة)، سنن العشاء (2 ركعة)
              </span>
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
              <FaBolt className="ml-2" />
              الأذكار
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="morningAdhkar"
                  ref={morningAdhkarRef}
                  className="ml-2 h-5 w-5"
                />
                <label htmlFor="morningAdhkar" className="text-gray-700">
                  أذكار الصباح (200 نقطة)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="eveningAdhkar"
                  ref={eveningAdhkarRef}
                  className="ml-2 h-5 w-5"
                />
                <label htmlFor="eveningAdhkar" className="text-gray-700">
                  أذكار المساء (200 نقطة)
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  عدد مرات الذكر العام (200 نقطة لكل 1000 مرة):
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  ref={generalAdhkarRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <FaCalendar className="ml-2" />
              أنشطة إضافية
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  عدد الأشخاص الذين تم إفطارهم (100 نقطة لكل شخص):
                </label>
                <input
                  ref={iftarRef}
                  type="number"
                  min="0"
                  className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <span className="text-sm text-red-500 block mt-1">
                  * من غير الأسرة الرئيسية{" "}
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={visitPatientRef}
                />
                <label className="text-gray-700">عيادة مريض (200 نقطة)</label>
                <span className="text-sm text-red-500 block mr-6">
                  * من غير الأسرة الرئيسية{" "}
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={charityRef}
                />
                <label className="text-gray-700">تصدقت اليوم (100 نقطة)</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={funeralRef}
                />
                <label className="text-gray-700">شهادة جنازة (200 نقطة)</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={prayForRef}
                />
                <label className="text-gray-700">
                  الدعاء بظهر الغيب بالخير (200 نقطة)
                </label>
                <span className="text-sm text-gray-500 block mr-6">
                  * ادعُ للقائمين على التطبيق بالزواج العاجل بست الكل الزوجة
                  الصالحة 💍
                </span>
              </div>
             
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                مجموع النقاط اليومي:
              </h2>
              <span className="text-2xl font-bold text-indigo-600">
                {activitiesPoints.data.totalPoints}
              </span>
            </div>

            <button
              onClick={handleSaveData}
              className=" outline-none w-full bg-gradient-to-b from-purple-600 to-indigo-900 hover:from-purple-700 hover:to-indigo-800 text-white py-3 px-6 rounded-md font-bold text-lg flex items-center justify-center"
            >
              <FaSave className="ml-2" />
              حفظ النقاط
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;