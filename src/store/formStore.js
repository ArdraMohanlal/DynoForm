import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set, get) => ({
      formElements: [],
      nextId: 1,
      selectedElementId: null,

      addElement: (element) => {
        const state = get();

        if (element.type === "group" && element.fields) {
          const fieldsWithIds = element.fields.map((field) => ({
            ...field,
            id:
              field.id ||
              `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          }));

          const newElement = {
            ...element,
            id: state.nextId,
            fields: fieldsWithIds,
          };

          set({
            formElements: [...state.formElements, newElement],
            nextId: state.nextId + 1,
            selectedElementId: newElement.id,
          });
        } else {
          const newElement = { ...element, id: state.nextId };
          set({
            formElements: [...state.formElements, newElement],
            nextId: state.nextId + 1,
            selectedElementId: newElement.id,
          });
        }
      },

      updateElement: (id, updates) =>
        set((state) => {
          const updatedElements = state.formElements.map((el) => {
            if (el.id === id) return { ...el, ...updates };

            if (el.type === "group" && el.fields) {
              const updatedFields = el.fields.map((f) =>
                f.id === id ? { ...f, ...updates } : f
              );
              if (updatedFields.some((f, i) => f !== el.fields[i])) {
                return { ...el, fields: updatedFields };
              }
            }
            return el;
          });

          return { formElements: updatedElements };
        }),

      deleteElement: (id) =>
        set((state) => {
          const topLevelFiltered = state.formElements.filter(
            (el) => el.id !== id
          );

          if (topLevelFiltered.length !== state.formElements.length) {
            return {
              formElements: topLevelFiltered,
              selectedElementId:
                state.selectedElementId === id ? null : state.selectedElementId,
            };
          }

          const updatedElements = state.formElements.map((el) => {
            if (el.type === "group" && el.fields) {
              const filteredFields = el.fields.filter((f) => f.id !== id);
              if (filteredFields.length !== el.fields.length) {
                return { ...el, fields: filteredFields };
              }
            }
            return el;
          });

          return {
            formElements: updatedElements,
            selectedElementId:
              state.selectedElementId === id ? null : state.selectedElementId,
          };
        }),

      reorderElements: (newOrder) => set({ formElements: newOrder }),

      setSelectedElementId: (id) => {
        set({ selectedElementId: id });
        console.log("tRIGGEREDDD", id);
      },

      clearSelection: () => set({ selectedElementId: null }),

      loadTemplate: (templateElements) =>
        set(() => ({
          formElements: templateElements,
          nextId:
            (templateElements.reduce(
              (max, el) => (typeof el.id === "number" ? Math.max(max, el.id) : max),
              0
            ) || 0) + 1,
          selectedElementId: null,
        })),
    }),
    {
      name: "form-builder-storage",
      partialize: (state) => ({
        formElements: state.formElements,
        nextId: state.nextId,
      }),
    }
  )
);
