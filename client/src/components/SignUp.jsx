import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../apiCalls/usersApiCalls";
import { DataContext } from "../store/context.js";
import ShowHidePassword from "./ShowHidePassword";
import SuccessAlert from "./SuccessAlert";
// logo
import img1 from "../localDataBase/images/Stories/DSC03655.JPG";
import img2 from "../localDataBase/images/Stories/DSC03440.JPG";
import img3 from "../localDataBase/images/Stories/DSC02404.JPG";

const images = [img1, img2, img3];

const SignUp = () => {
  const navigate = useNavigate();
  const { error, setError } = useContext(DataContext);
  const submitButtonRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

  const initialFormData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validation for specific field as the user types
    const validationErrors = { ...formErrors };

    switch (name) {
      case "firstName":
        if (value.trim().length < 2 || value.trim().length > 50) {
          validationErrors.firstName =
            "Vorname muss zwischen 2 und 50 Zeichen lang sein";
        } else {
          delete validationErrors.firstName; // Clear the error if it's valid
        }
        break;

      case "lastName":
        if (value.trim().length < 2 || value.trim().length > 50) {
          validationErrors.lastName =
            "Nachname muss zwischen 2 und 50 Zeichen lang sein";
        } else {
          delete validationErrors.lastName; // Clear the error if it's valid
        }
        break;

      case "dateOfBirth":
        // Check if the birth year is within the specified range
        const birthYear = parseInt(value.split("-")[0], 10);
        if (birthYear < 1900 || birthYear > new Date().getFullYear()) {
          validationErrors.dateOfBirth = "Ungültiges Geburtsjahr.";
        } else {
          delete validationErrors.dateOfBirth; // Clear the error if it's valid
        }
        break;

      case "email":
        if (!/\S+@\S+\.\S+/.test(value.trim())) {
          validationErrors.email = "Ungültige E-Mail-Adresse.";
        } else {
          delete validationErrors.email; // Clear the error if it's valid
        }
        break;

      case "password":
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value)) {
          validationErrors.password =
            "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Ziffer und ein Sonderzeichen enthalten..";
        } else {
          delete validationErrors.password; // Clear the error if it's valid
        }
        break;

      case "passwordConfirm":
        if (value !== formData.password) {
          validationErrors.passwordConfirm =
            "Die Passwörter stimmen nicht überein.";
        } else {
          delete validationErrors.passwordConfirm; // Clear the error if it's valid
        }
        break;

      default:
        break;
    }

    setFormErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length > 0) {
      return; // Don't submit the form if there are validation errors
    }

    try {
      const sanitizedData = {
        firstName: sanitizeInput(formData.firstName),
        lastName: sanitizeInput(formData.lastName),
        dateOfBirth: sanitizeInput(formData.dateOfBirth),
        email: sanitizeInput(formData.email),
        password: sanitizeInput(formData.password),
        passwordConfirm: sanitizeInput(formData.passwordConfirm),
      };

      const response = await signUp(sanitizedData);

      console.log("Signup Response:", response);
      if (response) {
        // Show the success alert
        setShowSuccessAlert(true);

        setTimeout(() => {
          setShowSuccessAlert(false);
          navigate("/login"); // Navigate to the login page after hiding the alert
        }, 3000); // Hide after 3 seconds
      }
    } catch (error) {
      if (error.response) {
        // Server provided an error message for invalid credentials
        setError(
          "Diese E-Mail-Adresse ist bereits mit einem anderen Konto verknüpft."
        );
      } else {
        // Handle other types of errors (e.g., network errors)
        setError(
          "Ein Fehler ist beim Einloggen aufgetreten. Bitte versuchen Sie erneut, sich anzumelden."
        );
      }
    }
  };
  // Clear the error when the component unmounts
  useEffect(() => {
    return () => {
      setError(null);
    };
  }, [setError]);

  const sanitizeInput = (input) => {
    if (typeof input !== "string") {
      return input;
    }

    let sanitizedInput = input.trim();
    sanitizedInput = sanitizedInput.replace(/\//g, "-"); // Replace slashes with dash
    return sanitizedInput;
  };

  return (
    <>
      {/* Display the SuccessAlert when showSuccessAlert is true */}
      {showSuccessAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SuccessAlert message="Sie haben sich erfolgreich angemeldet. Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet. Sie werden nun zur Anmeldeseite weitergeleitet." />
        </div>
      )}
      <div className="lg:flex ">
        <div className="h-full md:h-screen lg:h-full bg-gradient-to-tl bg-gray-100 xl:w-2/4 w-full py-16 px-4 lg:p-0 lg:pb-14 2xl:py-16 2xl:px-4 xl:basis-3/4">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white shadow rounded md:w-1/2 w-full p-10 mt-16">
              <p
                tabIndex={0}
                aria-label="Login to your account"
                className="text-2xl font-extrabold leading-6 text-gray-800"
              >
                Erstelle einen Account
              </p>
              <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                Du hast schon einen Account?{" "}
                <Link
                  to={"/login"}
                  tabIndex={0}
                  aria-label="Sign up here"
                  className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
                >
                  {" "}
                  Log in hier!
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
                  ODER
                </p>
                <hr className="w-full bg-gray-400  " />
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="firstname"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Vorname
                  </label>
                  <input
                    required
                    id="firstname"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-gray-200 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                  {formErrors.firstName && (
                    <p className="text-sm mt-1 text-red-500">
                      {formErrors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastname"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Nachname
                  </label>
                  <input
                    required
                    id="lastname"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-gray-200 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                  {formErrors.lastName && (
                    <p className="text-sm mt-1 text-red-500">
                      {formErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="birthdate"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Geburtsdatum
                  </label>
                  <input
                    required
                    type="date"
                    id="birthdate"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    min="1900-01-01"
                    max="9999-12-31"
                    className="bg-gray-200 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                </div>
                {formErrors.dateOfBirth && (
                  <p className="text-sm mt-1 text-red-500">
                    {formErrors.dateOfBirth}
                  </p>
                )}
                <div>
                  <label className="text-sm font-medium leading-none text-gray-800">
                    E-Mail
                  </label>
                  <input
                    aria-label="enter email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-200 border rounded focus:outline-none focus:ring focus:ring-blue-300 text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  />
                  {formErrors.email && (
                    <p className="text-sm mt-4 text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Passwort
                  </label>
                  <div className="relative flex items-center justify-center">
                    <ShowHidePassword
                      name="password"
                      formData={formData.password}
                      input={handleInputChange}
                    />
                  </div>
                  {formErrors.password && (
                    <p className="text-sm mt-1 text-red-500">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <label className="text-sm font-medium leading-none text-gray-800">
                    Passwort bestätigen
                  </label>
                  <div className="relative flex items-center justify-center">
                    <ShowHidePassword
                      name="passwordConfirm"
                      formData={formData.passwordConfirm}
                      input={handleInputChange}
                    />
                  </div>
                  {formErrors.passwordConfirm && (
                    <p className="text-sm mt-1 text-red-500">
                      {formErrors.passwordConfirm}
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    ref={submitButtonRef}
                    aria-label="create my account"
                    className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
                    type="submit"
                  >
                    Account erstellen
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
        <div className="bg-gray-100 ">
          <img
            src={isDesktop ? images[currentIndex] : undefined}
            alt=""
            className="h-88 object-cover mt-2 rounded-2xl"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
