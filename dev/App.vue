<template>
    <div class="py-8 px-8">
        <div class="font-semibold mb-2">
            Tailwind Vue DataTable v0.2.2
            <span class="text-xs font-light">by BitTheCat</span>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'App',
});
</script>