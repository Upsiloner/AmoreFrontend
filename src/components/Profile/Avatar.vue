<template>
  <div
    class="avatar-container"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- 头像区域 -->
    <div class="avatar-wrapper" @click="openCropper">
      <img v-if="userStore.avatar" :src="userStore.avatar" class="avatar" />
      <div v-else class="avatar-empty">
        <CameraOutlined class="camera-icon" />
      </div>

      <!-- hover遮罩 -->
      <transition name="fade">
        <div v-if="hover" class="avatar-overlay">更改头像</div>
      </transition>
    </div>

    <!-- 裁剪弹框 -->
    <a-modal
      v-model:open="isCropperOpen"
      title="裁剪头像"
      destroyOnClose
      width="600px"
    >
      <div class="cropper-container">
        <img ref="imageRef" :src="tempImage" alt="cropper" />
      </div>
      <template #footer>
        <a-button class="cancel-btn" @click="isCropperOpen = false">取消</a-button>
        <a-button class="confirm-btn" type="primary" @click="saveCroppedImage">确定</a-button>
      </template>
    </a-modal>

    <!-- 隐藏文件选择 -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="onFileChange"
      style="display: none"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { CameraOutlined } from "@ant-design/icons-vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { useUserStore } from "@/stores/user";
import { message } from 'ant-design-vue'
import { avatar } from '@/apis/userInfo'

const userStore = useUserStore();

const hover = ref(false);
const isCropperOpen = ref(false);
const fileInput = ref(null);
const imageRef = ref(null);
const cropper = ref(null);

const tempImage = ref("");

// 打开文件选择
const openCropper = () => {
  fileInput.value.click();
};

// 文件选择
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    message.warn("图片大小不能超过2MB");
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    tempImage.value = event.target.result;
    isCropperOpen.value = true;
  };
  reader.readAsDataURL(file);

  e.target.value = "";
};

// 监听弹窗打开，初始化 Cropper
watch(isCropperOpen, async (open) => {
  if (open) {
    await nextTick();
    if (cropper.value) {
      cropper.value.destroy();
    }
    cropper.value = new Cropper(imageRef.value, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      responsive: true,
      background: false,
      dragMode: "move",
    });
  } else {
    if (cropper.value) {
      cropper.value.destroy();
      cropper.value = null;
    }
  }
});

// 确认裁剪
const saveCroppedImage = async () => {
  if (!cropper.value) return;
  const canvas = cropper.value.getCroppedCanvas({
    width: 200,
    height: 200,
  });

  // 转成 Blob (异步)
  const blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png")
  );
  // 用 FormData 包装
  const formData = new FormData();
  formData.append("file", blob, "avatar_" + userStore.uid + ".png");
  
  const { code, data, message: msg } = await avatar(formData);
  if (code === 200) {
    userStore.avatar = data;
    message.success(msg)
  } else {
    message.error(msg)
  }
  
  isCropperOpen.value = false;
};
</script>

<style scoped>
.avatar-container {
  display: inline-block;
  position: relative;
}

.avatar-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(141, 201, 159, 0.35), -4px -4px 8px rgba(112, 77, 168, 0.35);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-empty {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-icon {
  font-size: 32px;
  color: var(--color-primary);
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 保证裁剪区域显示 */
.cropper-container {
  width: 100%;
  height: 400px; /* 固定高度，Cropper 才能显示 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.cropper-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
}

.cancel-btn:hover {
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.confirm-btn {
  background-color: var(--color-primary);
  color: white;
}

.confirm-btn:hover {
  background-color: var(--color-deeper);
}
</style>
