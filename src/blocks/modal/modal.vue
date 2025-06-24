<template>
    <div class="card-base">
        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style scoped>
.card-base {
    background-color: #2a2a2b;
    border-radius: 12px;
    padding: 1.5rem;
    color: white;
    max-width: 500px;
}
</style>