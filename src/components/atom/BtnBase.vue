<script setup lang="ts">
interface Props {
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
})
</script>

<template>
  <button :class="[$style.button, $style[`button_${size}`]]">
    <slot/>
  </button>
</template>

<style module>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.button_small {
  font-size: 0.75rem;
  height: 30px;
  padding: 0.25rem 0.5rem;
}

.button_medium {
  font-size: 1rem;
  height: 36px;
  padding: 0.50rem 1rem;
}

.button_large {
  font-size: 1.25rem;
  height: 42px;
  padding: 0.75rem 1.5rem;
}

.button:hover,
.button:focus {
  background-color: #ccc;
}
</style>
