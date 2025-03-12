"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={toggleSidebar}
          className="fixed top-5 left-5 z-50 p-0 bg-transparent"
        >
          <Image
            src="/icons/icons8-arrow-96.png"
            alt="Toggle Sidebar"
            width={45}
            height={45}
            className="transition-transform duration-300 transform hover:scale-110 mt-3 mr-12"
          />
        </button>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-purple-500 to-pink-500 p-5 shadow-lg transform transition-transform duration-300 z-40 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-2xl font-bold text-white mb-10">Genres</h2>
          <ul className="space-y-4">
            {[
              "Fiction",
              "Finance",
              "Fantasy",
              "Computer Science",
              "Adventure",
              "Programming",
              "Science",
              "Web Development",
              "Non Fiction",
              "Romance",
            ].map((genre) => (
              <li key={genre}>
                <Link
                  href={`/genres/${genre.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white hover:text-yellow-300 cursor-pointer"
                >
                  {genre}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-20">
            <Link
              href="/admin"
              className="block text-center text-white font-bold bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
            >
              Admin Interface
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
// 