import { defineStore } from "pinia";

export interface ProductOption {
  uid: string;
  displayName: string;
  price: number;
}

export interface OptionType {
  displayName: string;
  options: ProductOption[];
}

export interface CartItem {
  id: string;
  product: any;
  selectedOptions: Record<string, ProductOption>;
  quantity: number;
  addedAt: string;
  price?: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    quantity: 0 as number,
    selectedOptions: {} as Record<string, ProductOption>,
    // legacy cart fields (kept for API compatibility if used elsewhere)
    items: [] as CartItem[],
    totalItems: 0 as number,
    totalPrice: 0 as number,
  }),

  getters: {
    // price for current configuration (in cents)
    totalPrice(state): number {
      const base = Object.values(state.selectedOptions).reduce<number>(
        (sum, opt) => sum + (typeof opt?.price === "number" ? opt.price : 0),
        0
      );
      return base * (state.quantity || 0);
    },
  },

  actions: {
    // cart actions (kept as no-ops unless you use them actively)
    addToCart(payload: {
      selectedOptions?: Record<string, ProductOption>;
      quantity?: number;
      totalPrice?: number;
      product?: any;
      optionTypes?: OptionType[];
    }) {
      const {
        selectedOptions = {},
        quantity = 1,
        product,
        optionTypes = [],
      } = payload;

      const normalizedOptions = this.normalizeOptions(
        optionTypes,
        selectedOptions
      );
      const itemId = this.generateItemId(normalizedOptions);
      const existing = this.items.find((i) => i.id === itemId);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          id: itemId,
          product,
          selectedOptions: { ...normalizedOptions },
          quantity,
          addedAt: new Date().toISOString(),
        });
      }
      this.updateTotals();
    },

    initOptions(optionTypes: OptionType[] = []) {
      for (const type of optionTypes) {
        const name = type.displayName;
        if (!this.selectedOptions[name]) {
          const first = Array.isArray(type.options)
            ? type.options[0]
            : undefined;
          if (first) this.selectedOptions[name] = first;
        }
      }
    },

    setOption(typeName: string, option: ProductOption) {
      if (typeName && option) this.selectedOptions[typeName] = option;
    },

    normalizeOptions(
      optionTypes: OptionType[] = [],
      selectedOptions: Record<string, ProductOption> = {}
    ) {
      const result: Record<string, ProductOption> = {};
      for (const type of optionTypes) {
        const name = type.displayName;
        const provided = selectedOptions?.[name];
        if (provided) result[name] = provided;
        else {
          const first = Array.isArray(type.options)
            ? type.options[0]
            : undefined;
          if (first) result[name] = first;
        }
      }
      for (const [key, value] of Object.entries(selectedOptions)) {
        if (!result[key]) result[key] = value as ProductOption;
      }
      return result;
    },

    removeFromCart(itemId: string) {
      const idx = this.items.findIndex((i) => i.id === itemId);
      if (idx > -1) this.items.splice(idx, 1);
      this.updateTotals();
    },

    updateQuantity(itemId: string, newQuantity: number) {
      const item = this.items.find((i) => i.id === itemId);
      if (!item) return;
      item.quantity = Math.max(0, Math.floor(newQuantity || 0));
      if (item.quantity === 0) this.removeFromCart(itemId);
      else this.updateTotals();
    },

    clearCart() {
      this.items = [];
      this.updateTotals();
    },

    generateItemId(selected: Record<string, ProductOption>): string {
      const str = Object.entries(selected)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v.uid}`)
        .join("|");
      return btoa(str)
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 16);
    },

    loadCart() {
      if (typeof window === "undefined") return;
      const saved = localStorage.getItem("cart");
      if (!saved) return;
      try {
        const data = JSON.parse(saved) as { items?: CartItem[] };
        this.items = data.items || [];
        this.updateTotals();
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    },

    saveCart() {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: this.items,
            totalItems: this.totalItems,
            totalPrice: this.totalPrice,
          })
        );
      } catch (e) {
        console.error("Error saving cart:", e);
      }
    },

    updateTotals() {
      this.totalItems = this.items.reduce((sum, i) => sum + i.quantity, 0);
      this.totalPrice = this.items.reduce(
        (sum, i) => sum + (i.price ?? 0) * i.quantity,
        0
      );
    },
  },
});
