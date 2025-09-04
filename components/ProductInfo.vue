<template>
    <div class="flex-grow">
        <h1 class="text-2xl">{{ product.name }}</h1>
        <p class="mt-6">{{ product.description }}</p>
    </div>
</template>

<script setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>
