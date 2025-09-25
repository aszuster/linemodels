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

  const addToGuardados = (model) => {
    setGuardadosList(prev => {
      // Verificar si el modelo ya existe para evitar duplicados (comparar por id)
      if (!prev.some(item => item.id === model.id)) {
        return [...prev, model];
      }
      return prev;
    });
  };

  const removeFromGuardados = (modelId) => {
    setGuardadosList(prev => prev.filter(item => item.id !== modelId));
  };

  const clearAllGuardados = () => {
    setGuardadosList([]);
  };

  const copyAllUrls = async () => {
    try {
      const baseUrl = window.location.origin;
      const urls = guardadosList.map(model => `${baseUrl}/modelo/${model.slug?.current || model.slug}`);
      const urlsText = urls.join('\n');
      
      await navigator.clipboard.writeText(urlsText);
      return true;
    } catch (error) {
      console.error('Error copying URLs to clipboard:', error);
      return false;
    }
  };

  const value = {
    guardadosList,
    isClient,
    addToGuardados,
    removeFromGuardados,
    clearAllGuardados,
    copyAllUrls,
  };

  return (
    <GuardadosContext.Provider value={value}>
      {children}
    </GuardadosContext.Provider>
  );
};
