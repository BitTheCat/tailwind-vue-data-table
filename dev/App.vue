<template>
  <div class="pb-36">
    <div class="flex max-w-2xl mx-auto mb-10 space-x-4 sm:mt-10">
      <div class="flex flex-col flex-grow">
        <div class="font-semibold mb-2">
            Tailwind Vue DataTable v0.2.1
            <span class="text-xs font-light">by BitTheCat</span>
        </div>
        <div>
            <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'App',
});
</script>