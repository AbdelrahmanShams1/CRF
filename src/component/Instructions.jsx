import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle, FaCheckCircle } from "react-icons/fa";
import instructions from "../instructions.json";
import { useEffect, useState } from "react";

const Instructions = () => {
  const navigate = useNavigate();
  const [userGender, setUserGender] = useState("");
  const data = instructions;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserGender(parsedUser.type);
    }
  }, []);

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
          <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-indigo-900">
            <FaInfoCircle className="w-6 h-6 text-blue-500" />
            تعليمات المسابقة
          </div>
          <p className="flex text-red-600 text-xl text-center mt-4 rounded-lg py-2 px-3 shadow-sm shadow-red-400">
            <FaInfoCircle className="w-6 h-6 text-red-600 me-2" />
            يجب ملئ بيانات الأنشطة بعد صلاة العصر حيث يبدأيومك من المغرب و ينتهي بغروب شمس اليوم التالي
          </p>

          <div className="space-y-6 mt-6">
            {data.map((section) => (
              <>
                <div key={section.key} className="space-y-4">
                  <h3 className="text-xl font-bold text-indigo-900">
                    {section.name}:
                  </h3>

                  {section.categories ? (
                    section.categories
                      .filter((category) => category.key === userGender)
                      .map((category) => (
                        
                          <div
                            key={category.key}
                            className="bg-blue-50 p-4 rounded-lg space-y-2"
                          >
                            <h4 className="text-lg font-bold text-indigo-700">
                              {category.name}
                            </h4>
                            {category.types.map((type) => (
                              <p
                                key={type.key}
                                className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2"
                              >
                                <FaCheckCircle className="w-4 h-4 text-green-600" />
                                <span className="font-bold">
                                  {type.points} نقطة:
                                </span>{" "}
                                {type.name}
                              </p>
                            ))}
                          </div>
                        
                      ))
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                      {section.details.map((item) => (
                        
                          <p
                            key={item.key}
                            className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2"
                          >
                            <FaCheckCircle className="w-4 h-4 text-green-600" />
                            {item.points ? (
                              <>
                                <span className="font-bold">
                                  {item.points} نقطة:
                                </span>{" "}
                                {item.name}
                              </>
                            ) : (
                              item.name
                            )}
                          </p>
                        
                      ))}
                    </div>
                  )}
                </div>
                {Array.isArray(section.proof) ? (
                <p  className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2">
                  {section.proof.map((prof) => {
                      <span key={prof} className="text-xl text-green-700">{`(${prof})`}</span>
                    })}
                    </p>
                ) : (
                  <p className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2">
                    <span className="text-xl text-green-700">{section.proof&&`(${section.proof})`}</span>{" "}
                  </p>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
