import { persist } from "zustand/middleware";
import { Item } from "../types";
import { create } from "zustand";
import moment from "moment";

interface IssueState {
  items: Item[];
  setItems: (items: Item[] | ((prev: Item[]) => Item[])) => void;
  addItem: (item: Item) => void;
  deleteItem: (uuid: string) => void;
  getItemsByDate: (date?: string) => Item[];
}

export const useIssueStore = create<IssueState>()(
  persist(
    (set, get) => ({
      items: [],
      setItems: (items) => {
        if (typeof items === "function") {
          set((state) => ({ items: items(state.items) }));
        } else {
          set({ items });
        }
      },
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      deleteItem: (uuid) =>
        set((state) => ({
          items: state.items.filter((item) => item.uuid !== uuid),
        })),
      getItemsByDate: (date?: string) => {
        if (date === undefined) return [];
        const state = get();
        return state.items.filter((item) => {
          const itemDate = moment(item.date).format("YYYY-MM-DD");
          return itemDate === date;
        });
      },
    }),
    {
      name: "issues-storage",
    }
  )
);
