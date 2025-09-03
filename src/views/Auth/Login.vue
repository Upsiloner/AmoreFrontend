<!-- src/views/Auth/Login.vue -->
<template>
  <AuthLayout :imageUrl=LoginImage>
    <LoginForm />
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/Auth/AuthLayout.vue'
import LoginForm from '@/components/Auth/LoginForm.vue'

import { getCoverImage } from '@/utils/coverImages'
const LoginImage = getCoverImage()
</script>
