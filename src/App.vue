<template>
  <HeaderComponent />
  <div :class="`container ${menuStore.active ? '' : 'hidden'}`">
    <RouterView />
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/Header/HeaderComponent.vue';
import { useMenuStore } from './stores/menu';

const menuStore = useMenuStore();
</script>

<style scoped lang="scss">
@import '/src/assets/variables.scss';

.container {
  padding: $defaultPadding;
  padding-left: calc($menuWidth + (3 * $defaultPaddingHor));
  transition: 1s;
}

.hidden {
  padding-left: calc(5 * $defaultPaddingHor);
  transition: 1s;
}
</style>
