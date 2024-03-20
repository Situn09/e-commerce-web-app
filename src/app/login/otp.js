"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function UserOtp({ otp, email }) {
  const router = useRouter();
  const [userOtp, setuserOtp] = useState(new Array(8).fill(""));
  const [finalOtp, setFinalOtp] = useState(null);
  const swa = email.substring(0, 3);
  const inputRefs = useRef([]);
  const verifyCheck = () => {
    if (otp == finalOtp) {
      router.push("/user-page");
    } else {
      alert("Enter right OTP");
    }
  };
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const submitHandler = (Otp) => {
    setFinalOtp(Otp);
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(parseInt(value))) return;

    const newuserOtp = [...userOtp];
    // allow only on input
    newuserOtp[index] = value.substring(value.length - 1);
    setuserOtp(newuserOtp);
    const combineuserOtp = newuserOtp.join("");
    if (combineuserOtp.length === 8) submitHandler(combineuserOtp);
    // move to next field after fill

    if (value && index < 8 && inputRefs.current[index + 1]) {
      //

      inputRefs.current[index + 1]?.focus();
    }
    if (!value) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  //

  const handleclick = (index, e) => {
    inputRefs.current[index]?.select();
    if (index > 0 && !userOtp[index - 1]) {
      inputRefs.current[userOtp.indexOf("")]?.focus();
    }
  };

  const backKeyDownHandler = (index, e) => {
    if (e.key == "Backspace") {
      // Move focus to the previous input field on backspace
      inputRefs.current[index]?.focus();
    }
  };
  const backKeyUpHandler = (index, e) => {
    if (e.key == "Backspace") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="h-[453px] w-[576px] rounded-[20px] border-2 ">
        <div className="my-10 text-center text-[32px] text-xl font-bold">
          Verify Your Email
        </div>
        <div className="mb-10  text-center text-xl ">
          Enter the 8 digit code you have received on <br />{" "}
          <span className="text-[16px]  font-bold"> {swa}***@gmail.com</span>
        </div>
        <div className="mx-[50px]">
          <label htmlFor="userOtp" className="mb-5 text-[16px] font-semibold">
            userOtp
          </label>{" "}
          <br />
          <div className="mb-11 mt-5 flex gap-[12px]">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <input
                  ref={(input) => (inputRefs.current[index] = input)}
                  key={index}
                  type="text"
                  className="h-[48px] w-[48px] rounded-md border-2 px-[15px] py-[15px] text-[1.4em]"
                  inputMode="numeric"
                  onChange={(e) => handleChange(index, e)}
                  onClick={(e) => handleclick(index, e)}
                  onKeyDown={(e) => {
                    backKeyDownHandler(index, e);
                  }}
                  onKeyUp={(e) => {
                    backKeyUpHandler(index, e);
                  }}
                  onFocus={(e) => handleFocus(index, e)}
                />
              ))}
          </div>
          <div
            type="submit"
            value="VERIFY"
            className="mb-11 mt-5 w-[100%] border-2 bg-black text-center  py-[13px] text-white"
            onClick={() => verifyCheck()}
          >
            VERIFY
          </div>
        </div>
      </div>
    </div>
  );
}
