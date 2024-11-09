"use client";
import { Button, Drawer } from "antd";
import React from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

function Homepage() {
  const [showDrawer, setShowDrawer] = React.useState(false);
  const searchParams = useSearchParams();

  const formType =
    searchParams.get("formType") === "signup" ? "signup" : "signin";

  const menuItems = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="pt-5 px-20">
      <div className="flex justify-between items-center">
        <img src="./swe-logo.png" className="w-40 h-14" />

        <div className="flex gap-5 items-center">
          <div className="flex gap-5">
            {menuItems.map((item) => (
              <span
                className="text-sm font-bold text-gray-500"
                key={item.title}
              >
                {item.title}
              </span>
            ))}
          </div>

          <Button type="primary" onClick={() => setShowDrawer(true)}>
            Login
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 min-h-[80vh] items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-primary">SHEY-WORK-EASY</h1>
          <p className="text-sm text-gray-500 mt-1 font-semibold">
            Shey-Work-Easy is a work management tool that helps you manage your
            projects, tasks, and team members in one place. It's simple and easy
            to use. Get started today!
          </p>
        </div>

        <div className="flex justify-center">
          <img src="./swe-hero.png" className="w-96 h-96" />
        </div>
      </div>

      {showDrawer && (
        <Drawer
          width={500}
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        >
          <div className="flex justify-center">
            {formType === "signin" ? (
              <SignIn
                routing="hash"
                signUpUrl="/?formType=signup"
                fallbackRedirectUrl="/account/projects"
              />
            ) : (
              <SignUp
                routing="hash"
                signInUrl="/?formType=signin"
                fallbackRedirectUrl="/account/projects"
              />
            )}
          </div>
        </Drawer>
      )}
    </div>
  );
}

export default Homepage;
