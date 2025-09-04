<template>
    <div>
        <div class="flex justify-center items-center gap-4 mt-12">
            <span class="uppercase">Choose Options</span>
            <div class="flex-grow bg-gray-900 h-[1px]" />
        </div>

        <table class="w-full border-collapse border mt-6">
            <tbody class="text-sm">
                <tr v-for="optionType in optionTypes" :key="optionType.optionTypeId"
                    class="border-b last:border-b-0 cursor-pointer hover:bg-gray-50" @click="onOptionClick(optionType)">
                    <td class="font-semibold p-4 w-32">{{ optionType.displayName }}</td>
                    <td class="p-4 cursor-pointer">
                        {{ getSelectedLabel(optionType.displayName) || optionType.options[0]?.displayName }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <Drawer v-model="showDrawer" :title="selectedOption?.displayName.toUpperCase()">
        <Select v-model="innerSelectedUid" :options="selectedOption?.options || []" option-key="uid"
            option-label="displayName" @select="onSelect" />
    </Drawer>

</template>

<script setup>
import Drawer from "./Drawer.vue";
import Select from "./Select.vue";

// Selected options map, e.g. { Size: optionObj, Colour: optionObj }
const model = defineModel({
    type: Object,
    required: true,
    default: () => ({})
})

const props = defineProps({
    optionTypes: {
        type: Array,
        required: true
    },
})

const showDrawer = ref(false)
const selectedOption = ref(null)
const innerSelectedUid = ref("")

const getSelectedLabel = (typeName) => model.value?.[typeName]?.displayName

const onOptionClick = (optionType) => {
    showDrawer.value = true
    selectedOption.value = optionType
    const current = model.value?.[optionType.displayName]
    innerSelectedUid.value = current?.uid || optionType.options?.[0]?.uid || ""
}

const onSelect = (item) => {
    if (!selectedOption.value) return
    const typeName = selectedOption.value.displayName
    model.value = { ...(model.value || {}), [typeName]: item }
    showDrawer.value = false
}
</script>
