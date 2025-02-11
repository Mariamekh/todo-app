import React from "react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-full md:w-1/4 bg-white shadow-lg p-4 rounded-md">
      <nav className="flex flex-col gap-4">
        <button
          className={`p-2 rounded ${router.pathname === "/" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          onClick={() => router.push("/")}
        >
          📝 Tasks
        </button>
        <button
          className={`p-2 rounded ${router.pathname === "/history" ? "bg-purple-500 text-white" : "bg-gray-200"}`}
          onClick={() => router.push("/history")}
        >
          ⏳ History
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
