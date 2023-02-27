<script setup lang="ts">
import {computed, defineAsyncComponent, onMounted, ref} from "vue";
import ContactCard from "@/components/ContactCard.vue";
import InputBase from "@/components/atom/InputBase.vue";
import {Contact} from "@/types/general"
import {getContact} from "@/services/contactServices";
import BtnBase from "@/components/atom/BtnBase.vue";

const ModalBase = defineAsyncComponent(() => import('@/components/atom/ModalBase.vue'));
const contacts = ref<Contact[]>([]);
const editId = ref<number>(0);
const editFio = ref('');
const editEmail = ref('');
const editPhone = ref('');
const editTags = ref<string[]>([]);
const newTag = ref('');
const searchKey = ref('');
const isShowModal = ref(false);

const filteredContacts = computed(() => {
  if (!searchKey.value) {
    return contacts.value;
  } else {
    const lowercaseSearchKey = searchKey.value.toLowerCase();
    return contacts.value.filter(contact => {
      return (
          contact.fio.toLowerCase().includes(lowercaseSearchKey) ||
          contact.phone.toLowerCase().includes(lowercaseSearchKey) ||
          contact.email.toLowerCase().includes(lowercaseSearchKey) ||
          contact.tags.join(' ').toLowerCase().includes(lowercaseSearchKey)
      );
    });
  }
});

const deleteContact = (id: number) => {
  return contacts.value = filteredContacts.value.filter(contact => contact.id !== id);
}

const editContact = (id: number, type?: 'getContact') => {
  isShowModal.value = true;
  filteredContacts.value.forEach(contact => {
    if (contact.id === id) {
      if (type === 'getContact') {
        editId.value = contact.id;
        editFio.value = contact?.fio;
        editEmail.value = contact?.email;
        editPhone.value = contact?.phone;
        editTags.value = contact?.tags
      } else {
        contact.fio = editFio.value;
        contact.email = editEmail.value;
        contact.phone = editPhone.value;
        contact.tags = editTags.value
        isShowModal.value = false
      }
    }
  });
}

const addNewTag = () => {
  editTags.value.push(newTag.value);
  newTag.value = '';
}

const deleteTags = (tag: string) => {
  editTags.value = editTags.value.filter(item => item != tag)
}
onMounted(async () => {
  contacts.value = await getContact();
})
</script>

<template>
  <div :class="$style['contact_list']">
    <h1>Контакты</h1>
    <InputBase
        v-model="searchKey"
        placeholder="Поиск..."
        :debounceDelay="400"
    />
    <ul v-show="filteredContacts.length">
      <li v-for="contact in filteredContacts" :key="contact.id">
        <ContactCard
            :id="contact.id"
            :fio="contact.fio"
            :phone="contact.phone"
            :email="contact.email"
            :tags="contact.tags"
            @edit="editContact(contact.id, 'getContact')"
            @delete="deleteContact"
        />
      </li>
    </ul>
    <span v-show="!filteredContacts.length" :class="$style['empty_result']">
      Ничего не найдено
    </span>
    <ModalBase
        v-if="isShowModal"
        title="Редактировать контакт"
        @close="isShowModal=false"
    >
      <div :class="$style.modal">
        <InputBase v-model="editFio" placeholder="ФИО"/>
        <InputBase v-model="editPhone" placeholder="Телефон"/>
        <InputBase v-model="editEmail" placeholder="Электронная почта"/>
        <InputBase v-model="newTag" placeholder="Добавить тег"/>
        <BtnBase
            :disabled="!newTag.length"
            size="small"
            @click="addNewTag"
        >
          Добавить тег
        </BtnBase>
        <div :class="$style['tag_list']">
            <span v-for="tag in editTags" :class="$style.tag">
              {{ tag }}
              <span :class="$style['delete_tag']" @click="deleteTags(tag)">
                x
              </span>
            </span>
        </div>
      </div>
      <template #footer>
        <BtnBase size="small" @click="editContact(editId)">
          Редактировать
        </BtnBase>
      </template>
    </ModalBase>
  </div>
</template>

<style module>
.tag_list {
  display: flex;
  gap: 6px;
  margin-top: 16px;
}

.delete_tag {
  font-size: 15px;
  padding: 4px;
  color: #ffffff;
}

.tag {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #ccc;
  padding: 4px;
  border-radius: 10px;
}

.contact_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.contact_list h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.contact_list ul {
  max-width: 1200px;
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

.contact_list li {
  margin-bottom: 1rem;
}

.empty_result {
  margin-top: 1rem;
  font-size: 1rem;
}

@media (min-width: 576px) {
  .contact_list {
    padding: 2rem;
  }

  .contact_list ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }

  .contact_list li {
    margin-right: 1rem;
    margin-bottom: 1rem;
    max-width: 33.33%;
  }
}

@media (min-width: 768px) {
  .contact_list {
    justify-content: center;
  }

  .contact_list ul {
    margin-top: 3rem;
  }

  .contact_list li {
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    max-width: 25%;
  }
}

@media (min-width: 992px) {
  .contact_list li {
    max-width: 20%;
  }
}

@media (min-width: 576px) {
  .contact_list {
    padding: 2rem;
  }

  .contact_list ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  }

  .contact_list li {
    margin-right: 1rem;
    margin-bottom: 1rem;
    max-width: 33.33%;
  }

  .contact_list li:first-child:last-child {
    max-width: 100%;
  }
}


.modal {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
