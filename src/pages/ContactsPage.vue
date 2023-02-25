<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import ContactCard from "@/components/ContactCard.vue";
import InputBase from "@/components/atom/InputBase.vue";
import {Contact} from "@/types/general"
import {getContact} from "@/services/contactServices";


const contacts = ref<Contact[]>([]);
const searchKey = ref('');

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
onMounted(async () => {
  contacts.value =  await getContact();
})
</script>

<template>
  <div :class="$style['contact_list']">
    <h1>Контакты</h1>
    <InputBase
        v-model.trim="searchKey"
        placeholder="Введите поиск..."
        :debounceDelay="400"
    />
    <ul v-show="filteredContacts.length">
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="{name: 'ContactPage', params: {id: contact.id}}" :class="$style['router_link']">
          <ContactCard
              :fio="contact.fio"
              :phone="contact.phone"
              :email="contact.email"
              :tags="contact.tags"
          />
        </router-link>
      </li>
    </ul>
    <span v-show="!filteredContacts.length" :class="$style['empty_result']">
      Ничего не найдено
    </span>
  </div>
</template>

<style module>
.router_link {
  text-decoration: none;
  color: inherit;
  outline: none;
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

</style>
