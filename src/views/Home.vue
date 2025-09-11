<template>
  hello, {{ userStore.username }}! Your uid is {{ userStore.uid }}.
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
</script>
