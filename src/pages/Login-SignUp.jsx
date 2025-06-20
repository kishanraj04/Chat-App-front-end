import React, { useEffect, useRef, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { IoCameraReverseOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { isUserExist } from "../store/reducers/authSlice";
import { isUserPresent } from "../helper/isUserExist";
import { useLoginUserMutation, useNewUserMutation } from "../store/api/api";

const LoginSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = "http://localhost:3000/api/v1";
  const [loginUser,loginUserResp] = useLoginUserMutation()
  const nameRef = useRef();
  const passwordRef = useRef();
  const bioRef = useRef();
  const fileInputRef = useRef();

  const state = useSelector((state) => state?.auth);
  const [registerUser,registerResp] = useNewUserMutation()


  useEffect(() => {
      (async () => {
        try {
          const { data } = await axios.get(`${baseUrl}/user/direct-login`, {
            withCredentials: true,
          });
          console.log(data);
          if(data?.success){
            navigate("/home")
          }
          dispatch(isUserExist(data));
        } catch (error) {}
      })();
    }, []);

  // Show image preview when user selects avatar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const resp = await loginUser({name,password})

      if (resp?.data?.success) {
        toast.success("Login successful");
        dispatch(isUserExist(resp.data));
        navigate("/home");
      }
    } catch (error) {
      toast.error("Invalid login credentials");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const bio = bioRef.current?.value;
    const file = fileInputRef.current?.files[0];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("bio", bio);
    if (file) formData.append("avatar", file);

    try {
      const resp =await registerUser(formData)
      console.log(resp);
      if (resp?.data?.success) {
        toast.success("Signup successful");
        dispatch(isUserExist(resp.data));
        navigate("/");
      }
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-yellow-300 to-blue-400 select-none">
      <div className="relative w-4/5 max-w-4xl h-[600px] shadow-lg rounded-lg overflow-hidden flex">
        {/* Left/Right Animated Form Panel */}
        <div
          className={`absolute w-1/2 h-full bg-white p-8 flex flex-col justify-center transform transition-transform duration-500 ease-in-out z-10 ${
            isSignIn ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Avatar Upload (SignUp only) */}
          {!isSignIn && (
            <div className="w-full flex justify-center h-[20%] items-center">
              <div
                className="flex justify-center items-center w-[120px] h-[120px] border-[2px] rounded-full cursor-pointer hover:shadow-md border-cyan-700 p-2 bg-neutral-300 overflow-hidden"
                onClick={() => fileInputRef.current.click()}
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <IoCameraReverseOutline size={"40%"} color="cyan" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>

          {/* Form */}
          <form onSubmit={isSignIn ? handleLogin : handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              ref={nameRef}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            {!isSignIn && (
              <input
                type="text"
                placeholder="Bio"
                ref={bioRef}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            )}

            {isSignIn && (
              <p className="text-sm text-right text-gray-500 hover:underline cursor-pointer mb-4">
                Forgot your password?
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              {isSignIn ? "SIGN IN" : "SIGN UP"}
            </button>
          </form>
        </div>

        {/* Overlay Section */}
        <div
          className={`absolute w-1/2 h-full bg-gradient-to-r from-red-400 to-pink-500 p-8 text-white flex flex-col justify-center items-center transform transition-transform duration-500 ease-in-out ${
            isSignIn ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
          <p className="text-center mb-6">
            {isSignIn
              ? "New here? Sign up to get started."
              : "Already have an account? Sign in now."}
          </p>
          <button
            className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition"
            onClick={() => setIsSignIn((prev) => !prev)}
          >
            {isSignIn ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
