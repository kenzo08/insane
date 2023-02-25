<template>
  <div :class="$style.container">
    <h1>Страница не найдена</h1>
    <p>Адрес не существует.</p>
    <router-link to="/" :class="$style.link">
      На главную
    </router-link>
  </div>
</template>
<style module>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link {
  font-size: 1.5rem;
  text-decoration: none;
  color: darkblue;
  outline: none;
}
</style>
