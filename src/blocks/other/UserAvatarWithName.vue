<template>
    <div class="user-avatar-with-name">
        <div class="user-avatar-with-name__avatar">
            <span>{{ avatarText }}</span>
        </div>
        <div class="user-avatar-with-name__details">
            <h4 class="user-avatar-with-name__name">{{ fullName }}</h4>
            <p class="user-avatar-with-name__note-count">{{ noteCount }} заметок</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    noteCount: {
        type: Number,
        default: 0
    }
})

const avatarText = computed(() => {
    return props.firstName?.charAt(0).toUpperCase() || '?'
})

const fullName = computed(() => {
    return `${props.firstName} ${props.lastName}`
})
</script>

<style lang="scss" scoped>
.user-avatar-with-name {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__avatar {
        width: 40px;
        height: 40px;
        background-color: white;
        color: #3498db;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: bold;
    }

    &__details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
    }

    &__name {
        font-size: 1.2rem;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
    }

    &__note-count {
        font-size: 0.9rem;
        color: #ffffffcc;
    }
}
</style>