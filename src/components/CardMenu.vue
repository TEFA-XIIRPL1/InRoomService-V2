<script setup>
import { defineProps } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  tanggal: String,
  namaToko: String,
  jam: String,
  iconName: String,
  link: String,
});
</script>

<template>
  <a
    class="row justify-center items-center"
    style="max-width: 100%; text-decoration: none;" 
    :href="link"
  >
    <div
      class="shadow linecard"></div>
    <q-card class="menu row items-center">
      <q-card-section>
        <p class="text-blue" >{{ tanggal }}</p>
        <!-- elemen ini berdasarkan props -->
        <p class="text-h6 text-black" >{{ namaToko }}</p>
        <!-- elemen ini berdasarkan props -->
        <p style="color: #808080;">{{ jam }}</p>
        <!-- elemen ini berdasarkan props -->
      </q-card-section>
      <q-card-section>
        <q-icon :name="iconName" class="text-black text-7xl" size="xl" />
      </q-card-section>
      <!-- name nya berdasarkan props -->
    </q-card>
  </a>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.shadow {
  box-shadow: 0 4px 6px -1px rgb( 0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.linecard {
  height: 120px; 
  background: #0985BA; 
  border-radius: 20px;  
  border: 3px solid; 
  margin-right: -5px; 
  z-index: 10;
}
.menu {
  width: 266px;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 1rem;
}
</style>
