import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import type { OptionType, ProductOption } from "../stores/cart";

interface ProductData {
  optionTypes: OptionType[];
}

export const useProductOptions = (mockData: ProductData) => {
  const cart = useCartStore();

  const getSelectedOrDefault = (
    type: OptionType
  ): ProductOption | undefined => {
    const name = type.displayName;
    const provided = cart.selectedOptions?.[name];
    if (provided) return provided;
    const first = Array.isArray(type.options) ? type.options[0] : undefined;
    return first;
  };

  const unitPrice = computed<number>(() => {
    let price = 0;
    if (!Array.isArray(mockData.optionTypes)) return price;
    for (const type of mockData.optionTypes) {
      const opt = getSelectedOrDefault(type);
      if (opt?.price) price += opt.price;
    }
    return price;
  });

  const initializeDefaults = () => {
    cart.initOptions(mockData.optionTypes);
  };

  return {
    unitPrice,
    initializeDefaults,
  };
};
