import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProductResponse } from "@/core/types/products/products.model";

export interface CartItem {
  cartItemId: string;
  product: ProductResponse;
  quantity: number;
  selectedExtras: { id: number; name: string; price: number }[];
  notes: string;
  finalPrice: number;
}

export type CartItemDraft = Omit<CartItem, "cartItemId">;

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;

  addItem: (item: CartItemDraft) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, amount: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => {
            const sameProduct = item.product.id === newItem.product.id;

            const sameNotes = item.notes.trim() === newItem.notes.trim();

            const itemExtrasIds = item.selectedExtras
              .map((e) => e.id)
              .sort()
              .join(",");
            const newItemExtrasIds = newItem.selectedExtras
              .map((e) => e.id)
              .sort()
              .join(",");
            const sameExtras = itemExtrasIds === newItemExtrasIds;

            return sameProduct && sameNotes && sameExtras;
          });

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { items: updatedItems };
          }

          return {
            items: [
              ...state.items,
              { ...newItem, cartItemId: crypto.randomUUID() },
            ],
          };
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, amount) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.cartItemId === cartItemId) {
                const newQuantity = Math.max(0, item.quantity + amount);
                return { ...item, quantity: newQuantity };
              }
              return item;
            })
            .filter((item) => item.quantity > 0), 
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.finalPrice * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "central-res-cart", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);