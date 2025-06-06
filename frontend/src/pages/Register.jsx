import React from "react";
import RegisterForm from "../components/RegisterForm";

/**
 * Zusammensetzen aller Registrierungs Komponenten
 * @returns die Registrierseite
 */
function Register() {
  return (
    <>
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"> */}
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-800 dark:to-emerald-900">
        <RegisterForm />
      </div>
    </>
  );
}

export default Register;
