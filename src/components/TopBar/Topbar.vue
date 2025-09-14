<template>
  <a-layout-header class="navbar">
    <div class="left">
      <a-button type="text" @click="$emit('toggleSider')" class="siderButton">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <span class="title">青梅博客</span>
    </div>
    <div class="right">
      <a-dropdown>
        <div class="user-trigger" @click.prevent>
          <div class="avatar" v-if="!userStore.avatar">
            {{ userStore.username.slice(0, 2) }}
          </div>
          <img v-else class="avatar" :src="userStore.avatar" alt="avatar" />
          <span class="username">{{ userStore.username }}</span>
        </div>

        <!-- 下拉内容 -->
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">个人中心</a-menu-item>
            <a-menu-item key="2">退出登录</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

defineProps<{ collapsed: boolean }>()
defineEmits(['toggleSider'])
</script>

<style scoped>
.user-trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 6px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  margin-right: 8px;
  user-select: none;
  flex-shrink: 0;
  text-transform: uppercase;
}

.user-trigger img.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-style: italic;
  color: gray;
  font-weight: 500;
  font-size: 16px;
}

.siderButton {
  color: gray;
}

.siderButton:hover {
  box-shadow: none;
  border-radius: 4px;
}

.siderButton:focus,
.siderButton:active {
  outline: none;
  box-shadow: none;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff;
}

.left {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 12px;
  font-size: 20px;
  font-weight: bolder;
  color: var(--color-deeper);
  text-shadow: 1px 1px 2px var(--color-accent);
}

.right {
  color: white;
}
</style>
