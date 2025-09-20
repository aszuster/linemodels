"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GuardadosContext = createContext();

export const useGuardados = () => {
  const context = useContext(GuardadosContext);
  if (!context) {
    throw new Error("useGuardados must be used within a GuardadosProvider");
  }
  return context;
};

export const GuardadosProvider = ({ children }) => {
  const [guardadosList, setGuardadosList] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Inicializar con lista vacía en lugar de datos de prueba
    setGuardadosList([]);
  }, []);

  const addToGuardados = (name) => {
    setGuardadosList(prev => {
      // Verificar si el nombre ya existe para evitar duplicados
      if (!prev.includes(name)) {
        return [...prev, name];
      }
      return prev;
    });
  };

  const removeFromGuardados = (name) => {
    setGuardadosList(prev => prev.filter(item => item !== name));
  };

  const clearAllGuardados = () => {
    setGuardadosList([]);
  };

  const value = {
    guardadosList,
    isClient,
    addToGuardados,
    removeFromGuardados,
    clearAllGuardados,
  };

  return (
    <GuardadosContext.Provider value={value}>
      {children}
    </GuardadosContext.Provider>
  );
};
