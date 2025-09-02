<!-- src/views/User/Regoster.vue -->
<template>
  <UserLayout :imageUrl=LoginImage>
    <RegisterForm />
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/components/User/UserLayout.vue'
import RegisterForm from '@/components/User/RegisterForm.vue'

import { getCoverImage } from '@/utils/cover_images'
const LoginImage = getCoverImage()
</script>