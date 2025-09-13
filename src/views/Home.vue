<template>
  <div>
    hello, {{ userStore.username }}! Your uid is {{ userStore.uid }}.
  </div>
</template>

<script setup>
import { profile } from '@/apis/userInfo'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import { reactive, ref, onMounted } from 'vue'

const userStore = useUserStore();

const aaa = ref(userStore.username);
const bbb = ref(userStore.uid);

onMounted(async () => {
  const res = await profile();
  if (res.code === 200) {
    message.success(res.message);
    userStore.setUserInfo(res.data);
    console.log("store after set:", userStore.$state);
  } else {
    message.error("获取用户信息失败");
  }
});

</script>
