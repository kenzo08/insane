<script setup lang="ts">
import BtnBase from "@/components/atom/BtnBase.vue";

interface Props {
  id: number;
  fio: string;
  phone: string;
  email: string;
  tags: string[];
}

defineProps<Props>();
</script>

<template>
  <div :class="$style.contact">
    <div :class="$style['contact_info']">
      <router-link :to="{name: 'ContactPage', params: {id: id}}" :class="$style['router_link']">
        <div :class="$style['contact_name']">{{ fio }}</div>
      </router-link>
      <nav :class="$style['nav_bar']">
        <btn-base
            size="small"
            @click="$emit('edit', id)"
        >
          Редактировать
        </btn-base>
        <btn-base
            size="small"
            @click="$emit('delete', id)"
        >
          Удалить
        </btn-base>
      </nav>
      <div :class="$style['contact_details']">
        <div :class="$style['contact_phone']">{{ phone }}</div>
        <div :class="$style['contact_email']">{{ email }}</div>
      </div>
    </div>
    <div :class="$style['contact_tags']">
      <div :class="$style['contact_tag']" v-for="tag in tags" :key="tag">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<style module>
.router_link {
  text-decoration: none;
  color: inherit;
  outline: none;
}


.contact_name::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.contact {
  position: relative;
  display: flex;
  gap: 12px;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  height: 200px;
}

.nav_bar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contact:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.contact:focus {
  outline: none;
  transform: translateY(-1px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.contact_info {
  display: flex;
  flex-direction: column;
}

.contact_name {
  font-size: 24px;
  font-weight: bold;
}

.contact_details {
  display: flex;
  flex-direction: column;
  font-size: 16px;
}

.contact_phone,
.contact_email {
  margin-top: 8px;
  word-break: break-word;
}

.contact_tags {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
}

.contact_tag {
  display: flex;
  align-items: center;
  height: 25px;
  background-color: #f5f5f5;
  border-radius: 4px;
  color: #8c8c8c;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 4px 8px;
}

@media only screen and (max-width: 1024px) {
  .contact {
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 230px;
  }

  .contact_name {
    font-size: 20px;
    flex: 1;
  }

  .contact_phone,
  .contact_email {
    font-size: 14px;
    flex: 1;
  }

  .contact_tags {
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .contact_tag {
    font-size: 12px;
    margin-bottom: 4px;
    padding: 2px 4px;
  }
}


@media only screen and (max-width: 768px) {
  .contact {
    padding: 12px;
    margin-bottom: 12px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 340px;
  }

  .contact_info {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .contact_name {
    font-size: 18px;
    margin-bottom: 8px;
  }

  .contact_details {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .contact_phone,
  .contact_email {
    margin-top: 4px;
    margin-bottom: 4px;
    word-break: break-word;
  }

  .contact_tags {
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .contact_tags {
    margin-top: 8px;
  }

  .contact_tag {
    font-size: 12px;
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 2px 4px;
  }

  .contact:hover, .contact:focus {
    transform: none;
    box-shadow: none;
  }
}
</style>
