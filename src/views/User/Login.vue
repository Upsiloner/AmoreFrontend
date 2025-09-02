<!-- src/views/User/Login.vue -->
<template>
  <UserLayout :imageUrl=LoginImage>
    <LoginForm />
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/components/User/UserLayout.vue'
import LoginForm from '@/components/User/LoginForm.vue'

import { getCoverImage } from '@/utils/cover_images'

const LoginImage = getCoverImage()

</script>
