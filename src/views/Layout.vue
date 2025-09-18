<template>
  <a-layout class="main-layout">
    <!-- sider -->
    <a-layout-sider
      theme="light"
      v-model:collapsed="collapsed"
      collapsible
      :width="200"
      class="sider"
    >
      <div class="logo">
        <img
          src="/logo.svg"
          :class="{ small: collapsed }"
          alt="logo"
        />
      </div>
      <a-menu>
        <a-menu-item key="/home" @click="goTo('/home')">
          <HomeOutlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/profile" @click="goTo('/profile')">
          <UserOutlined />
          <span>个人中心</span>
        </a-menu-item>
        <a-menu-item key="/settings" @click="goTo('/settings')">
          <SettingOutlined />
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- main -->
    <a-layout class="main-content">
      <Topbar :collapsed="collapsed" @toggleSider="collapsed = !collapsed" />
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { profile } from '@/apis/userInfo'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons-vue'
import Topbar from '@/components/Topbar.vue'

const userStore = useUserStore()
const router = useRouter()
const collapsed = ref(false)

const goTo = (path) => {
  if (router.currentRoute.value.path !== path) {
    router.push(path)
  }
}

onMounted(async () => {
  const { code, data, message: msg } = await profile()
  if (code === 200) {
    userStore.setUserInfo(data)
  } else {
    message.error(msg)
  }
})
</script>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin: 16px;
  padding: 50px 0;
  transition: all 0.3s;
}

.logo img {
  width: 80px;
  height: auto;
  transition: all 0.3s;
}

.logo img.small {
  width: 42px;
}

.main-layout {
  min-height: 100vh;
  width: 100%;
}

.sider {
  border-right: 1px solid #f0f0f0;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content {
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;
  flex: 1;
}

.sider ::v-deep(.ant-menu-item) {
  padding: 0 0 0 27px;
  font-size: 16px;
  height: 40px;
  margin-bottom: 10px;
}

.sider ::v-deep(.ant-menu-item-selected) {
  background-color: var(--color-lighter) !important;
  color: var(--color-deeper) !important;
  font-weight: bolder;
}
</style>
