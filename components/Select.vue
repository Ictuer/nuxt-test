<template>
    <div>
        <div v-for="option in options" :key="option[optionKey]" @click="onSelect(option)"
            class="flex items-center justify-between p-4 border-gray-200 cursor-pointer hover:bg-gray-50"
            :class="{ 'border-b': option !== options.at(-1) }">
            <div class="flex-1">
                <span class="text-gray-900">{{ option[optionLabel] }}</span>
            </div>

            <div class="flex items-center justify-center w-5 h-5">
                <div v-if="model !== option[optionKey]" class="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                <div v-else class="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                    <nuxt-img src="icons/check.svg" alt="selected" class="w-4 h-4 text-white" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const model = defineModel()
const props = defineProps({

    options: {
        type: Array,
        required: true,
        default: () => []
    },
    optionKey: {
        type: String,
        required: true,
        default: 'value'
    },
    optionLabel: {
        type: String,
        required: true,
        default: 'label'
    }
})

const emit = defineEmits(['select'])


const onSelect = (item) => {
    model.value = item[props.optionKey]
    emit('select', item)
}


</script>
