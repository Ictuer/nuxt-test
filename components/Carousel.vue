<template>
    <div class="min-w-[588px]">
        <!-- Main image -->
        <div class="aspect-square border border-[#0000001A] flex items-center justify-center relative overflow-hidden">
            <NuxtImg :src="images[currentIndex]" alt="image" class="min-w-[480px] max-h-full object-contain" />

            <!-- Controls -->
            <div class="bottom-2 right-2 absolute flex gap-1">
                <button @click="prev"
                    class="min-w-10 min-h-10 z-10 rounded-full bg-[#f3f5f8] flex items-center justify-center cursor-pointer hover:bg-[#e9ecf1]">
                    <nuxt-img src="icons/arrow-left.svg" class="min-w-6 min-h-6" />
                </button>
                <button @click="next"
                    class="min-w-10 min-h-10 z-10 rounded-full bg-[#f3f5f8] flex items-center justify-center cursor-pointer hover:bg-[#e9ecf1]">
                    <nuxt-img src="icons/arrow-right.svg" class="min-w-6 min-h-6 z-10" />
                </button>
            </div>
        </div>

        <!-- Thumbnails -->
        <div class="grid grid-cols-4 gap-2 mt-2">
            <button v-for="(img, i) in images" :key="img"
                class="aspect-square border flex items-center justify-center cursor-pointer transition-colors"
                :class="i === currentIndex ? 'border-black' : 'hover:border-gray-400'" @click="setMainImage(i)">
                <nuxt-img :src="img" alt="image" class="w-full" />
            </button>
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    images: { type: Array, required: true }
})

const currentIndex = ref(0)

const setMainImage = (index) => {
    if (index < 0) currentIndex.value = props.images.length - 1
    else if (index >= props.images.length) currentIndex.value = 0
    else currentIndex.value = index
}

const prev = () => setMainImage(currentIndex.value - 1)
const next = () => setMainImage(currentIndex.value + 1)
</script>
