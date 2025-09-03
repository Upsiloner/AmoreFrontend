<!-- src/views/Auth/Forget.vue -->
<template>
  <AuthLayout :imageUrl=LoginImage>
    <ForgetForm />
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/Auth/AuthLayout.vue'
import ForgetForm from '@/components/Auth/ForgetForm.vue'

import { getCoverImage } from '@/utils/coverImages'
const LoginImage = getCoverImage()
</script>
