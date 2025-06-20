<template>
  <div class="input">
    <label  :for="id" class="input__label">{{ label }}</label>
<!-- v-if -->
    <input
      :id="id"
      :type="type"
      v-model="perem"
      :placeholder="placeholder"
      :required="required"
      class="input__field"
    />
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'


const model = defineModel()
const perem = ref('');

watch(perem, (newX) => {
 
})


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

<style scoped src="./input.scss"></style>