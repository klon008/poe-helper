<script setup>
import { defineComponent } from 'vue';

import TheWelcome from './TheWelcome.vue'
import TheCurr from './TheCurr.vue'
</script>

<template>
  <div class="h-100">
    <div class="buttons">
      <button :class="{ active: (selected == 0) }" @click="selected=0">Divine Converter</button>
      <button :class="{ active: (selected == 1) }" @click="selected=1">Stash currency Helper</button>
    </div>
    <div class="content-full-height">
      <div v-show="selected == 0">
        <TheWelcome />
      </div>
      <div v-show="selected == 1">
        <TheCurr />
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-100{
  height:100%;
  display: flex;
  flex-direction: column;
}
.content-full-height{
  height: 100%;
  display: flex;
  place-items: center;
}
.buttons{
  padding-top: 25px;
  flex-wrap: nowrap;
  text-align: center;
}
.buttons button{
  background: transparent;
  border: 1px solid;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
  margin-right: 2px;
  border-radius: 3px;
  box-sizing: border-box;
}
.buttons button.active{
  background: var(--vt-c-text-light-2);
}
</style>

<script>
export default defineComponent({
    name: "HelloWorld",
    data() {
        return {
            selected: 0
        }
    }
})
</script>
