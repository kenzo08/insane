<script setup lang="ts">
import {debounce} from 'lodash';
import {watch} from 'vue';


interface Props {
  placeholder?: string;
  debounceDelay?: number;
  validateFn?: (value: string) => string | undefined;
  modelValue?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);


const handleInput = debounce((event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value)
  if (validate) {
    validate(value);
  }
}, props.debounceDelay || 500);

let validate: (value: string) => void;
let error: string | undefined;
let searchTerm = '';

if (props.validateFn) {
  validate = debounce((value: string) => {
  }, props.debounceDelay || 500);
}

watch(
    () => props.modelValue,
    (newValue) => {
      searchTerm = newValue as string;
    }
);
</script>

<template>
  <input
      v-model.trim="searchTerm"
      :placeholder="placeholder"
      :class="{'input--error': error}"
      :debounce="debounceDelay"
      @input="handleInput"
  />
</template>

<style module>
input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 2px solid #e2e8f0;
}

input:focus {
  outline: none;
  border-color: #63b3ed;
}
</style>
