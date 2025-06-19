<template>
  <div class="input-group">
    <label :for="id" class="input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :required="required"
      class="input__field"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
const model = defineModel()

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped src="./input.scss"></style>