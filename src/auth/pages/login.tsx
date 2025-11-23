import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../../shared/components/ui/input";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img2.jpg";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NoEncryptionOutlinedIcon from "@mui/icons-material/NoEncryptionOutlined";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../InitializeFireBase";
import { useAuth } from "../authContext";
import CircularProgress from "@mui/material/CircularProgress";
import { doc, updateDoc } from "firebase/firestore";

type initialValuesTypes = {
  email: string;
  password: string;
};
type visibilityKeys = "password";

const Login = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: initialValuesTypes = {
    email: "",
    password: "",
  };
  const validationSchema: Yup.AnyObject = Yup.object({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().required("password is Required"),
  });
  const [isVisible, setIsVisible] = useState<Record<visibilityKeys, boolean>>({
    password: false,
  });
  const toggleVisiblePassword = (keyValue: visibilityKeys) => {
    setIsVisible((prev) => ({ ...prev, [keyValue]: !prev[keyValue] }));
  };

  const handleLogin = async (values: initialValuesTypes) => {
    console.log(values);
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateDoc(doc(db, "users", user.uid), { isOnline: true });
        // console.log(userCredential);
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat bg-img pt-10 px-10">
      {loading && (
        <div className="bg-white/10 z-[200] fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: initialValuesTypes) => {
          handleLogin(values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="bg-black/10 backdrop-blur-xl p-5 max-w-[550px] m-auto border border-white/10 rounded-xl">
              <h1 className="text-5xl text-center py-2 font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#7fd60d] to-[#f54c09] drop-shadow-[1px_1px_6px_blue]">
                Log In
              </h1>
              <div className="flex items-center justify-center mt-3">
                <span className="text-center text-[#cac8c8]">
                  Enter Your Email and Password to Access Your Account
                </span>
              </div>
              <div className="w-[75%] m-auto">
                <div className="mt-12">
                  <InputField
                    name="email"
                    fieldType="email"
                    placeholder="Email"
                    icon={<EmailOutlinedIcon sx={{ color: "white" }} />}
                    secondIcon={<TaskAltOutlinedIcon sx={{ color: "white" }} />}
                    value={values.email}
                  />
                  <InputField
                    name="password"
                    fieldType={isVisible.password ? "text" : "password"}
                    placeholder="Password"
                    icon={<NoEncryptionOutlinedIcon sx={{ color: "white" }} />}
                    secondIcon={<TaskAltOutlinedIcon />}
                    isPasswordField={true}
                    handleToggle={() => toggleVisiblePassword("password")}
                    isVisible={isVisible.password}
                  />

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" name="" id="check" />
                      <label
                        htmlFor="check"
                        className="text-white cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <p className="cursor-pointer text-blue-600 font-semibold hover:underline hover:text-[#66d31e]">
                      forget password?
                    </p>
                  </div>
                  <div className="mt-7 flex justify-center items-center">
                    <button
                      type="submit"
                      className="p-2 rounded-full px-6 font-bold bg-blue-400 shadow-md transition-all hover:bg-blue-500"
                    >
                      Login
                    </button>
                  </div>
                  <div className="flex items-center justify-center mt-3">
                    <span className="text-white">
                      Doesn't have an account?{" "}
                      <NavLink
                        to="/sign-up"
                        className="text-blue-600 font-semibold hover:underline hover:text-[#66d31e]"
                      >
                        Sign Up
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
