<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { SelectOption } from '@/types/general';


interface Props {
  modelValue: SelectOption | null;
  options: SelectOption[];
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const changeOption = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  const selectedItem = props.options.find((item) => item.value === selectedValue) || null;
  emit('update:modelValue', selectedItem);
};
</script>

<template>
  <select :class="$style.select" :value="modelValue?.value" @change="changeOption">
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :selected="option.value === modelValue?.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style module>
select{
  padding: 10px 15px;
  border-radius: 10px;
  border: solid 1px;
  font-size: 15px;
}
</style>
