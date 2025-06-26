import React, { createContext, useContext } from "react";

const LoggerContext = createContext();

export const LoggerProvider = ({ children }) => {
  const log = (message, data = {}) => {
    const entry = {
      timestamp: new Date().toISOString(),
      message,
      ...data,
    };
    // Replace console.log with your own logging middleware
    fetch("/log", {
      method: "POST",
      body: JSON.stringify(entry),
    });
  };

  return (
    <LoggerContext.Provider value={{ log }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = () => useContext(LoggerContext);
