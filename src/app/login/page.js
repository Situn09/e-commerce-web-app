"use client";
import Link from "next/link";
import React, { useState } from "react";
import OTP from "./otp";

/* SmtpJS.com - v3.0.0 */
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(null);

  const [openOTPScreen, setOTPScreen] = useState(false);
  // if (password) setOTPScreen(true);
  const sendOTP = async () => {
    const otp = Math.floor(Math.random() * 100000000);
    let emailBody = `<h2> Your OTP is </h2> <br/> ${otp} <br/> Don't share this OTP `;
    setOtp(otp);
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "chiranjivrao37@gmail.com",
      Password: "0A9F4C155DBC469512A70269F8E0C181C0C1",
      From: "chiranjivrao37@gmail.com",
      To: document.getElementById("email").value,
      Subject: "Your OTP for login",
      Body: emailBody,
    }).then((message) => alert("Message Sent Succesfully", message));
    setOTPScreen(true);
  };

  return (
    <div className="my-10 flex justify-center">
      {!openOTPScreen ? (
        <div className="h-[691px] w-[576px] rounded-[20px] border-2 ">
          <div className="my-10 text-center text-[32px] text-xl font-bold">
            Login
          </div>
          <div className="text-center  text-[24px] text-xl font-bold">
            Welcome back to ECOMMERCE
          </div>
          <div className="mb-10 text-center  text-[16px] text-xl font-semibold">
            The next gen business marketplace
          </div>
          <div className="mx-[50px]">
            <label htmlFor="email" className="mb-5 text-[16px] font-semibold">
              Email
            </label>{" "}
            <br />
            <input
              id="email"
              type="email"
              placeholder="Enter"
              required
              className="mb-11 mt-5 w-[100%] border-2 pb-[5px] pl-[10px] pr-[5px] pt-[8px]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="mb-5 text-[16px] font-semibold"
            >
              Password
            </label>{" "}
            <br />
            <input
              id="password"
              type="password"
              placeholder="Enter"
              className="mb-11 mt-5 w-[100%] border-2 pb-[5px] pl-[10px] pr-[5px] pt-[8px]"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="mb-11 mt-5 w-[100%] border-2 bg-black py-[13px]  text-center text-white"
              onClick={() => {
                password ? sendOTP() : alert("Please fill email and password");
              }}
            >
              LOGIN
            </div>
            <div className="h-[2px] border-2"></div>
            <div className="mt-10 text-center ">
              Don’t have an Account?{" "}
              <Link href="/" className="font-bold">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <OTP otp={otp} email={email} />
      )}
    </div>
  );
}
