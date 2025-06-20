<template>
  <div class="note-content">
    <p v-if="!isEditing" class="note-content__text" @click="$emit('edit-start')">
      {{ content }}
    </p>
    <textarea v-else ref="textareaRef" v-model="localContent" class="note-content__textarea"
      @blur="$emit('edit-save', localContent)" @keyup.enter="$emit('edit-save', localContent)" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit-start', 'edit-save'])

const textareaRef = ref(null)
const localContent = ref(props.content)

watch(() => props.isEditing, async (newVal) => {
  if (newVal) {
    localContent.value = props.content
    await nextTick()
    textareaRef.value.focus()
  }
})
</script>

<style lang="scss" scoped>
.note-content {
  &__text {
    font-size: 0.9rem;
    color: #cccccc;
    line-height: 1.5;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    cursor: pointer;
    word-break: break-word;
  }

  &__textarea {
    width: 100%;
    height: 100px;
    padding: 0.5rem;
    font-size: 0.9rem;
    resize: none;
    border-radius: 4px;
    border: 1px solid #777;
    outline: none;
    background-color: #1e1e1e;
    color: #fff;
    box-sizing: border-box;
  }
}
</style>