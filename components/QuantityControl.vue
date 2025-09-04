<template>
    <div class="w-64">
        <span>Quantity</span>
        <div class="border flex items-center justify-center h-11">
            <button @click="model--" class="p-1 hover:bg-gray-100 rounded" :disabled="model <= 1">
                <nuxt-img src="icons/minus.svg" alt="minus" class="min-w-6 min-h-6" />
            </button>
            <span class="mx-3 min-w-[2rem] text-center">{{ model }}</span>
            <div @click="model++" class=" hover:bg-gray-100 rounded">
                <nuxt-img src="icons/plus.svg" alt="plus" class="min-w-6 min-h-6" />
            </div>
        </div>
    </div>
</template>

<script setup>

const model = defineModel({
    type: Number,
    default: 1
})


</script>
