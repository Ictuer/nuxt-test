<template>
  <div class="p-[120px] flex gap-[102px]">
    <Carousel :images="mockData.product.images" />
    <div class="flex-grow">
      <ProductInfo :product="mockData.product" />

      <OptionTable v-model="uiSelectedOptions" :option-types="mockData.optionTypes" />

      <div class="text-3xl font-semibold mt-6">
        ${{ formatPrice(cartStore.totalPrice) }}
      </div>

      <div class="flex gap-3 mt-6">
        <QuantityControl v-model="cartStore.quantity" />
        <button @click="onAddToCart"
          class="bg-black flex text-white items-center justify-center px-6 gap-3 h-11 py-3 mt-6 w-full hover:bg-gray-800">
          <nuxt-img src="icons/basket-add.svg" alt="cart" class="min-w-6 min-h-6" />
          <span class="uppercase">Add to Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from "../components/Carousel.vue";
import ProductInfo from "../components/ProductInfo.vue";
import OptionTable from "../components/OptionTable.vue";

import QuantityControl from "../components/QuantityControl.vue";
import { useProductOptions } from "../composables/useProductOptions";
import { useCartStore } from "../stores/cart";

import { formatPrice } from "../utils/common";

import mockData from "../mock-data.json";

const { initializeDefaults } = useProductOptions(mockData);

const cartStore = useCartStore();
onMounted(() => {
  cartStore.initOptions(mockData.optionTypes);
});


const uiSelectedOptions = ref({});

watch(
  uiSelectedOptions,
  (val) => {
    for (const [type, opt] of Object.entries(val || {})) {
      if (opt) cartStore.setOption(type, opt);
    }
  },
  { deep: true }
);

const toast = useToast();

const onAddToCart = () => {
  toast.success({
    message: "Product added to cart",
    position: "topRight",
    duration: 3000,
  });
};

// quantity lives in store per your current store implementation

onMounted(() => {
  initializeDefaults();
});
</script>
