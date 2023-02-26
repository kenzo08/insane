<script setup lang="ts">
import {onBeforeUnmount, onMounted} from 'vue';
import BtnBase from "@/components/atom/BtnBase.vue";

interface Props {
  title: string;
}

defineProps<Props>();

onMounted(() => {
  document.body.style.overflowY = 'hidden';
});

onBeforeUnmount(() => {
  document.body.style.overflowY = 'auto';
});
</script>

<template>
  <div :class="$style['modal_wrapper']">
    <div :class="$style['modal_overlay']" @click="$emit('close')"></div>
    <div :class="$style.modal">
      <div :class="$style['modal_header']">
        <h2 :class="$style['modal_title']">{{ title }}</h2>
        <button :class="$style['modal_close']" @click="$emit('close')">×</button>
      </div>
      <div :class="$style['modal_body']">
        <slot/>
      </div>
      <div :class="$style['modal_footer']">
        <slot name="footer"/>
        <BtnBase size="small"
                 @click="$emit('close')"
        >
          Закрыть
        </BtnBase>
      </div>
    </div>
  </div>
</template>

<style module>
.modal_wrapper {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal {
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 20px;
  max-width: 80%;
}

.modal_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal_title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.modal_close {
  background-color: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.modal_body {
  margin-bottom: 20px;
}

.modal_footer {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.modal_close:hover {
  color: #999;
}
</style>
