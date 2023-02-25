<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getContact} from "@/services/contactServices";
import {useRoute} from "vue-router";
import {Contact} from "@/types/general";


const route = useRoute();
const contactId = ref(Number(route.params.id));
const contact = ref<Contact>()
onMounted(async () => {
  contact.value = await getContact(contactId.value)
})
</script>

<template>
  <div class="container">
    <h1>{{ contact?.fio }}</h1>
    <div class="contact-details">
      <div class="contact-info">
        <div class="contact-item">
          <label>Телефон:</label>
          <span>{{ contact?.phone }}</span>
        </div>
        <div class="contact-item">
          <label>Электронная почта:</label>
          <span>{{ contact?.email }}</span>
        </div>
      </div>
      <div class="contact-tags">
        <label>Теги:</label>
        <div class="tag-list">
          <span v-for="tag in contact?.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-details {
  width: 320px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.contact-item label {
  font-weight: bold;
  margin-bottom: 5px;
}

.contact-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tag-list {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

.tag {
  display: inline-block;
  background-color: #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .container{
    padding: 0 16px;
  }

  .contact-details {
    flex-direction: column;
    align-items: center;
  }

  .contact-info {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .contact-tags {
    margin-top: 20px;
  }
}

</style>

