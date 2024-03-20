"use client";
import React, { useEffect, useRef, useState } from "react";

export default function UserPage() {
  const [userData, setUserData] = useState([]);
  const checkBoxRefs = useRef([]);
  const [lowerLimit, setlowerLimit] = useState(0);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((resp) => resp.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((err) => console.warn(err));
  }, [lowerLimit]);

  return (
    <div className="my-10 flex justify-center">
      <div className="h-[691px] w-[576px] rounded-[20px] border-2 ">
        <div className="my-10 text-center text-[32px] font-bold">
          Please mark your interests!
        </div>
        <div className="my-10 text-center text-[16px]">
          We will keep you notified.
        </div>
        <div className="mx-[50px]">
          <label className=" text-[20px] font-bold">My saved interests!</label>{" "}
          <br />
          <div className="mt-5 flex flex-col">
            {userData
              .filter(
                (_, index) => index >= lowerLimit && index < lowerLimit + 6
              )
              .map((item, index) => {
                return (
                  <div key={item.title}>
                    <input
                      ref={(input) => (checkBoxRefs.current[index] = input)}
                      id={`item ${index}`}
                      type="checkbox"
                      placeholder="Enter"
                      className=" mb-5 h-[24px] w-[24px] border-2"
                      defaultChecked={item.completed ? true : false}
                      // value={item.completed ? "true" : "false"}
                      // onClick={() => {
                      //   checkBoxRefs.current[index].checked =
                      //     !checkBoxRefs.current[index].checked;
                      //   console.log(checkBoxRefs.current[index].checked);
                      // }}
                    />
                    <label
                      htmlFor={`item ${index}`}
                      className="mx-[5px] align-[6px] font-semibold"
                    >
                      {item.title}
                    </label>
                  </div>
                );
              })}
          </div>
          <div className="flex mt-5 justify-center">
            <div>
              {" "}
              <i style={style.leftArrow}></i>
              <i style={style.leftArrow}></i> <i style={style.leftArrow}></i>
            </div>
            <div className="w-[50%] overflow-x-auto">
              {userData
                .filter((_, index) => index <= userData.length / 6)
                .map((item, index) => (
                  <span
                    key={index}
                    className="mx-3"
                    onClick={() => setlowerLimit(index * 6)}
                  >
                    {index + 1}
                  </span>
                ))}
            </div>
            <div>
              <i style={style.rightArrow}></i> <i style={style.rightArrow}></i>
              <i style={style.rightArrow}></i>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  leftArrow: {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(135deg)",
    WebkitTransform: "rotate(135deg)",
  },
  rightArrow: {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
    transform: "rotate(-45deg)",
    WebkitTransform: "rotate(-45deg)",
  },
};
