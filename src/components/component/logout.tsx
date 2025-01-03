'use client'

import React from "react";
import {signOut} from 'next-auth/react'
export const Logout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
    >
      Cerrar Sesion
    </button>
  );
};
