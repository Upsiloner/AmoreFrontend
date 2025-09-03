<!-- src/components/AuthLayout.vue -->
<template>
  <div class="layout-wrapper">
    <div class="layout">
      <div class="layout-left" :style="{
        backgroundImage: `url(${imageUrl})`
      }">
      </div>

      <div class="layout-right">
        <div class="form-container">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="copyright">
      <p>© 2025 Amore. All rights reserved.</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.layout-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.layout {
  display: flex;
  width: 800px;
  /* 固定宽度 */
  height: 580px;
  /* 固定高度 */
  margin: 0 auto;
  /* 居中显示 */
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  /* 关键：让子元素不“突出”边角 */
}

.layout-left {
  flex: 1;
  /* 左侧区域占 50% 宽度 */
  min-height: 100%;
  /* 确保高度充满屏幕 */
  background-size: cover;
  background-position: center;
  background-color: rgb(240, 240, 240);
}

.layout-right {
  flex: 1;
  /* 右侧区域占 50% 宽度 */
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(204, 204, 219, 0.26);
}

.form-container {
  width: 90%;
  max-width: 400px;
  padding: 20px;
}

.copyright {
  position: absolute;
  bottom: 16px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #aaa;
  /* 字体颜色 */
}
</style>