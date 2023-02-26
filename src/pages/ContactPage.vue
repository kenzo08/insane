<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getContact} from "@/services/contactServices";
import {Contact} from "@/types/general";
import BtnBase from "@/components/atom/BtnBase.vue";


const route = useRoute();
const contactId = ref(Number(route.params.id));
const contact = ref<Contact>()

const editContact = () => {
  console.log('edit')
}

const deleteContact = () => {
  console.log('delete')
}

onMounted(async () => {
  contact.value = await getContact(contactId.value)
})
</script>

<template>
  <div :class="$style.container">
    <h1>{{ contact?.fio }}</h1>
    <div :class="$style['contact_details']">
      <div :class="$style['contact_info']">
        <div :class="$style['contact_tem']">
          <label>Телефон:</label>
          <span>{{ contact?.phone }}</span>
        </div>
        <div :class="$style['contact_item']">
          <label>Электронная почта:</label>
          <span>{{ contact?.email }}</span>
        </div>
      </div>
      <div :class="$style['contact_tags']">
        <label>Теги:</label>
        <div :class="$style['tag_list']">
          <span v-for="tag in contact?.tags" :key="tag" :class="$style.tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <nav :class="$style['nav_bar']">
      <BtnBase @click="editContact">Редактировать</BtnBase>
      <BtnBase @click="deleteContact">Удалить</BtnBase>
    </nav>
  </div>
</template>

<style module>
.container {
  max-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.contact_details {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.nav_bar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 12px;
}

.contact_info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact_item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact_item label {
  font-weight: bold;
  margin-bottom: 5px;
}

.contact_tags {
  display: flex;
  flex-direction: column;
}

.tag_list {
  display: flex;
  flex-direction: column;
  margin-top: 5px;
}

.tag {
  display: inline-block;
  word-break: break-word;
  width: 60px;
  background-color: #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
}

@media screen and (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .nav_bar {
    margin-top: 16px;
    flex-direction: column;
  }

  .contact_details {
    flex-direction: column;
  }

  .contact_info {
    margin-right: 0;
  }

  .contact_tags {
    margin-top: 20px;
  }
}
</style>

