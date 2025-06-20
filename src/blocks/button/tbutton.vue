<template>
    <button class="action-btn" :class="type" :title="title" @click="$emit('click')">
        <component :is="iconComponent" :name="type" :color="iconColor" :size="30" />
    </button>
</template>

<script setup>
import { computed } from 'vue'
import SvgEdit from '@/components/SvgComponents/SvgEdit.vue'
import SvgDelete from '@/components/SvgComponents/SvgDelete.vue'

const props = defineProps({
    type: {
        type: String,
        required: true,
        validator: (value) => ['edit', 'delete'].includes(value)
    },
    title: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        default: '#000'
    }
})

const iconComponent = computed(() => {
    return props.type === 'edit' ? SvgEdit : SvgDelete
})
</script>

<style scoped>
.action-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.action-btn.delete:hover {
    background-color: rgba(235, 76, 63, 0.1);
}

.action-btn.edit:hover {
    background-color: rgba(241, 196, 15, 0.1);
}
</style>