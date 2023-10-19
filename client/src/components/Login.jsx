import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// logo
import img1 from "../localDataBase/images/Stories/DSC03655.JPG";
import img2 from "../localDataBase/images/Stories/DSC03440.JPG";
import img3 from "../localDataBase/images/Stories/DSC02404.JPG";
import { login } from "../apiCalls/usersApiCalls";
import ShowHidePassword from "./ShowHidePassword";
import { DataContext } from "../store/context.js";
const images = [img1, img2, img3];

const Login = () => {
  const navigate = useNavigate();
  const { setError, error } = useContext(DataContext);
  const submitButtonRef = useRef(null);
  const { dispatchUsers, usersState } = useContext(DataContext);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const interValid = setInterval(() => {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1750);
    return () => clearInterval(interValid);
  }, [currentIndex]);
  useEffect(() => {
    const handleEnterKeyPress = (event) => {
      if (event.key === "Enter") {
        submitButtonRef.current.click(); // Trigger the submit button's click event
      }
    };

    // Attach the event listener to the document
    document.addEventListener("keydown", handleEnterKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEnterKeyPress);
    };
  }, []);
  useEffect(() => {
    // Clear the error message when the component unmounts
    return () => {
      setError(null);
    };
  }, [setError]);

  // For login coneecting with Backend

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    usersState.isLoggedIn && navigate("/");
  }, [usersState.isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(dispatchUsers, formData);

      // console.log("Login Response:", response);

      if (response) {
        setError(null);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        // Server provided an error message for invalid credentials
        setError("Ungültige E-Mail oder Passwort..");
      } else {
        // Handle other types of errors (e.g., network errors)
        setError(
          "Ein Fehler ist beim Einloggen aufgetreten. Bitte versuchen Sie erneut, sich anzumelden."
        );
      }
    }
  };
  return (
    <>
      <div className="lg:flex ">
        <div className="h-full lg:h-full md:h-screen bg-gradient-to-tl bg-gray-100 xl:w-2/4 w-full py-16 px-4 lg:p-0 lg:pb-14 2xl:py-16 2xl:px-4 xl:basis-3/4">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white shadow rounded 2xl:w-1/3  md:w-1/2 w-full p-10 mt-16">
              <p
                tabIndex={0}
                aria-label="Login to your account"
                className="text-2xl font-extrabold leading-6 text-gray-800"
              >
                Melden Sie sich in Ihrem Konto an
              </p>

              <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Sie haben noch kein Konto?{" "}
                <Link
                  to={"/signup"}
                  tabIndex={0}
                  aria-label="Sign up here"
                  className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                >
                  {" "}
                  Hier anmelden
                </Link>
              </p>
              <button
                aria-label="Continue with google"
                className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
              >
                <svg
                  width={19}
                  height={20}
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                    fill="#EB4335"
                  />
                </svg>
                <p className="text-base font-medium ml-4 text-gray-700">
                  Continue with Google
                </p>
              </button>
              <div className="w-full flex items-center justify-between py-5">
                <hr className="w-full bg-gray-400" />
                <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
                  OR
                </p>
                <hr className="w-full bg-gray-400  " />
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Email
                  </label>

                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-label="enter email address"
                    type="email"
                    className="bg-gray-200 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                <div className="mt-6  w-full">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Password
                  </label>
                  <div className="relative flex items-center justify-center">
                    <ShowHidePassword
                      name="password"
                      input={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <Link
                    to={"/login/forgot-password"}
                    className="text-sm underline underline-offset-2"
                  >
                    Passwort vergessen ?
                  </Link>
                </div>
                <div className="mt-8">
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    aria-label="create my account"
                    className="focus:ring-2 focus:ring-offset-2
                    focus:ring-indigo-700 text-sm font-semibold leading-none
                    text-white focus:outline-none bg-indigo-700 border rounded
                    hover:bg-indigo-600 py-4 w-full"
                  >
                    Anmelden
                  </button>
                </div>
              </form>
              {/* Error message display */}
              {error && (
                <div className="mt-4 text-red-500 text-lg">{error}</div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <img
            src={isDesktop ? images[currentIndex] : undefined}
            alt=""
            className="h-88 object-cover"
          />
        </div>
      </div>
    </>
  );
};
export default Login;
