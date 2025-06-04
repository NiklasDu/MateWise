import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function DashboardHero() {
  const { user } = useAuth();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="relative h-[400px] bg-white dark:bg-gray-900 max-w-screen-lg mx-auto">
        <div className="absolute inset-0">
          <img
            src="welcome_pic.jpg"
            alt="Background Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Schön, dass du wieder da bist,
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {user.username || "Gast"}
          </h2>
          <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto">
            Starte jetzt mit neuen Lernpartnern, entdecke spannende Skills und
            wachse gemeinsam mit der Community!
          </p>
        </div>
      </div>
    </section>
  );
}

export default DashboardHero;
