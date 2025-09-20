<template>
  <a-layout-header class="topbar">
    <div class="left">
      <a-button type="text" @click="$emit('toggleSider')" class="siderButton">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
      <span class="title">青梅博客</span>
    </div>

    <div class="right">
      <a-tooltip title="发布内容">
        <div class="publish-wrapper" @click="showPublish = true">
          <FormOutlined class="publish-icon"/>
        </div>
      </a-tooltip>
        
      <PublishModal v-model:open="showPublish" />

      <div class="user-dropdown" ref="dropdownRef">
        <!-- 头像 + 用户名 -->
        <div class="user-trigger" @click="toggleDropdown">
          <div class="avatar" v-if="!userStore.avatar">
            {{ displayName }}
          </div>
          <img v-else class="avatar" :src="userStore.avatar" alt="avatar" />
          <span class="username">{{ userStore.username }}</span>
          <DownOutlined class="down-icon"/>
        </div>

        <!-- 下拉菜单 -->
        <div v-if="dropdownOpen" class="dropdown-menu">
          <div class="dropdown-item" @click="goProfile">社区公约</div>
          <div class="dropdown-item" @click="handleLogout">退出登录</div>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, FormOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { logout } from '@/apis/auth'
import PublishModal from "@/components/Topbar/PublishModal.vue";

const userStore = useUserStore()
const router = useRouter()
const dropdownOpen = ref(false)
const showPublish = ref(false);
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    dropdownOpen.value = false
  }
}

const displayName = computed(() => {
  const name = userStore.username || ''
  if (!name) return ''
  const firstChar = name.charAt(0)
  if (/[\u4e00-\u9fff]/.test(firstChar)) {
    return firstChar
  } else {
    return name.slice(0, 2)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const goProfile = () => {
  message.info('社区公约')
  dropdownOpen.value = false
}

const handleLogout = () => {
  Modal.confirm({
    title: "确认退出登录吗？",
    okText: "确定",
    cancelText: "取消",
    okButtonProps: {
      style: { backgroundColor: '#704da8', borderColor: '#453d7c', color: '#fff' }
    },
    cancelButtonProps: {
      style: { backgroundColor: '#f5f5f5', color: '#333', borderColor: '#d9d9d9' }
    },
    async onOk() {
      const { code, data, message: msg } = await logout();
      if (code === 200) {
        userStore.clearUserInfo(); 
        localStorage.removeItem("token");
        router.push("/login");
        message.success(msg);
      } else {
        message.error(msg)
      }
    },
  });
  dropdownOpen.value = false
}

defineProps<{ collapsed: boolean }>()
defineEmits(['toggleSider'])
</script>

<style scoped>
.publish-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: var(--color-primary);
  cursor: pointer;
  transition: all 0.7s;
  margin-right: 12px;
}

.publish-wrapper:hover {
  color: var(--color-deeper);
  background-color: var(--color-lighter);
}

.publish-icon {
  font-size: 20px;
}

.user-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.user-trigger {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 6px;
  user-select: none;
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
  text-transform: uppercase;
  flex-shrink: 0;
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

.down-icon {
  font-size: 12px;
  margin-left: 4px;
  color: gray;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 3px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  width: 130px;
  z-index: 1000;
  padding: 5px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: #F0F0F0;
  border-radius: 8px;
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

.topbar {
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
  color: var(--color-primary);
  text-shadow: 1px 1px 2px var(--color-accent);
}

.right {
  display: flex;
  align-items: center;
  color: white;
}
</style>
