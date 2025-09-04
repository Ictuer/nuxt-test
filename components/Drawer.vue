<template>
    <Teleport to="body">
        <!-- Overlay -->
        <Transition enter-active-class="transition-opacity duration-1000 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-600 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="modelValue" class="fixed inset-0 z-[9999] w-screen h-screen pointer-events-auto bg-black/50"
                @click="model = false">
                <!-- Drawer -->
                <Transition enter-active-class="transition-transform duration-1000 ease-out"
                    enter-from-class="translate-x-full" enter-to-class="translate-x-0"
                    leave-active-class="transition-transform duration-1000 ease-in" leave-from-class="translate-x-0"
                    leave-to-class="translate-x-full">
                    <div v-if="modelValue" @click.stop :class="[
                        'absolute right-0 top-0 h-full bg-white shadow-2xl flex flex-col',
                        'border-l border-gray-200'
                    ]">
                        <!-- Header -->
                        <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                            <h2 v-if="title" class="text-lg font-semibold text-gray-900">
                                {{ title }}
                            </h2>
                            <div v-else></div>
                            <button @click="close"
                                class="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 group">
                                <nuxt-img src="icons/x.svg" alt="close" class="w-5 h-5" />
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 overflow-auto min-w-[512px]">
                            <slot />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' },
})

const model = defineModel({
    type: Boolean,
    default: false
})



// Prevent body scroll when drawer is open
watchEffect(() => {
    if (typeof document !== 'undefined') {
        if (props.modelValue) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
})

// Clean up on unmount
onUnmounted(() => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
})
</script>
