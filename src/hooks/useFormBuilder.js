// src/hooks/useFormBuilder.js
import { useState } from "react";

export const useFormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const addElement = (element) => setFormElements(prev => [...prev, element]);
  const updateElement = (id, updates) => setFormElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  const deleteElement = (id) => setFormElements(prev => prev.filter(el => el.id !== id));
  const reorderElements = (newOrder) => setFormElements(newOrder);
  const clearSelection = () => setSelectedElementId(null);

  return {
    formElements,
    selectedElementId,
    setSelectedElementId,
    addElement,
    updateElement,
    deleteElement,
    reorderElements,
    clearSelection
  };
};
