<script setup lang="ts">
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
      <div :class="$style['contact_name']">{{ fio }}</div>
      <div :class="$style['contact_details']">
        <div :class="$style['contact_phone']">{{ phone }}</div>
        <div :class="$style['contact_email']">{{ email }}</div>
      </div>
    </div>
    <div :class="$style['contact_tags']">
      <div :class="$style['contact_tag']" v-for="tag in tags" :key="tag">{{ tag }}</div>
    </div>
  </div>
</template>

<style module>
.contact {
  display: flex;
  background-color: white;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  height: 160px;
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
  margin-right: 16px;
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
  flex-wrap: wrap;
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

.contact_tag:hover {
  transform: scale(1.1);
  background-color: #e5e5e5;
  color: #333;
}


@media only screen and (max-width: 1024px) {
  .contact {
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .contact_name {
    font-size: 20px;
    margin-right: 12px;
    flex: 1;
  }

  .contact_phone,
  .contact_email {
    font-size: 14px;
    margin-right: 8px;
    flex: 1;
  }

  .contact_tags {
    margin-top: 12px;
    flex: 1;
  }

  .contact_tag {
    font-size: 12px;
    margin-right: 4px;
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
    height: auto;
  }

  .contact_info {
    margin-bottom: 8px;
  }

  .contact_name {
    font-size: 18px;
    margin-right: 0;
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
