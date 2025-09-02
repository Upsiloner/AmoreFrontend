<!-- src/views/User/Forget.vue -->
<template>
  <UserLayout :imageUrl=LoginImage>
    <ForgetForm />
  </UserLayout>
</template>

<script setup>
import UserLayout from '@/components/User/UserLayout.vue'
import ForgetForm from '@/components/User/ForgetForm.vue'

import { getCoverImage } from '@/utils/cover_images'
const LoginImage = getCoverImage()
</script>
