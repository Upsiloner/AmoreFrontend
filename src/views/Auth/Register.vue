<!-- src/views/Auth/Regoster.vue -->
<template>
  <AuthLayout :imageUrl=LoginImage>
    <RegisterForm />
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/Auth/AuthLayout.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'

import { getCoverImage } from '@/utils/coverImages'
const LoginImage = getCoverImage()
</script>