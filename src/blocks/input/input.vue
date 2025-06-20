<template>
  <div class="input">
    <label :for="id" class="input__label">{{ label }}</label>
    <!-- v-if -->
    <input :id="id" :type="type" v-model="model" :placeholder="placeholder" :required="required" class="input__field" />
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
    required: false,
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

<style lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &__label {
    display: block;
    color: #fff;
    font-size: 1rem;
  }

  &__field {
    display: block;
    padding: 10px 14px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    color: #000;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
    }

    &::placeholder {
      color: #999;
    }
  }
}
</style>