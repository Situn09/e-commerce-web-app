import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex justify-center my-10">
      <div className="border-2 w-[576px] h-[691px] rounded-[20px] ">
        <div className="text-xl my-10 text-center font-bold text-[32px]">
          Create your account
        </div>
        <div className="mx-[50px]">
          <label htmlFor="name" className="text-[16px] font-semibold mb-5">
            Name
          </label>{" "}
          <br />
          <input
            id="name"
            type="text"
            placeholder="Enter"
            className="border-2 w-[100%] mt-5 mb-11 pt-[8px] pb-[5px] pr-[5px] pl-[10px]"
          />
          <label htmlFor="email" className="text-[16px] font-semibold mb-5">
            Email
          </label>{" "}
          <br />
          <input
            id="email"
            type="email"
            placeholder="Enter"
            className="border-2 w-[100%] mt-5 mb-11 pt-[8px] pb-[5px] pr-[5px] pl-[10px]"
          />
          <label htmlFor="password" className="text-[16px] font-semibold mb-5">
            Password
          </label>{" "}
          <br />
          <input
            id="password"
            type="password"
            placeholder="Enter"
            className="border-2 w-[100%] mt-5 mb-11 pt-[8px] pb-[5px] pr-[5px] pl-[10px]"
          />
          <Link href="/login">
            <input
              type="submit"
              value="CREATE ACCOUNT"
              className="border-2 w-[100%] mt-5 mb-11 py-[13px]   bg-black text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
