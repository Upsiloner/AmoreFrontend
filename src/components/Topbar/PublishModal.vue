<template>
  <a-modal
    v-model:open="props.open"
    @cancel="handleCancel"
    title="发布内容"
    width="600px"
    :footer="null"
  >
    <div class="publish-modal-body">
      <div class="input-wrapper">
        <a-input
          v-model:value="title"
          placeholder="请输入标题"
          class="titleInput"
          @input="handleTitleInput"
        />
        <span class="word-count">{{ titleRemaining }} / {{ maxTitleLength }}</span>
      </div>

      <div class="input-wrapper">
        <!-- 高亮层 -->
        <div class="highlight-layer" v-html="highlightedContent"></div>

        <!-- 真实输入框 -->
        <a-textarea
          v-model:value="content"

          placeholder="随时随地，分享新鲜事~"
          :auto-size="{ minRows: 5, maxRows: 30 }"
          class="textInput"
          @input="handleContentInput"
        />
        <span class="word-count">{{ contentRemaining }} / {{ maxContentLength }}</span>
      </div>

      <div class="buttom-wrapper">
        
        <div class="emoji-bar" @mouseleave="showEmoji = false">
          <div @mouseenter="showEmoji = true" class="emoji-btn"><SmileOutlined /></div>
          <div v-if="showEmoji" class="emoji-popup">
            <emoji-picker @emoji-click="onEmojiClick" />
          </div>
        </div>

        <div class="image-bar">
          <FileImageOutlined />
        </div>

        <div class="tag-bar" @click="onTagClick">
          <NumberOutlined />
        </div>

        <div class="map-bar" @click="onTagClick">
          <MapIcon/>
        </div>
      </div>

    </div>

    <div class="publish-modal-footer">
      <a-button class="cancel-btn" danger @click="handleCancel">取消</a-button>
      <a-button class="confirm-btn" type="primary" :loading="loading" @click="handleConfirm">确认</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { ref, computed } from "vue";
import { message } from "ant-design-vue";
import { SmileOutlined, FileImageOutlined, NumberOutlined } from '@ant-design/icons-vue'
import MapIcon from '@/assets/icons/map.svg'
import axios from "axios";
import "emoji-picker-element";

const props = defineProps({
  open: { type: Boolean, required: true }
});

const emit = defineEmits(["update:open"]);

const title = ref("");
const content = ref("");
const loading = ref(false);
const showEmoji = ref(false);

const maxTitleLength = 50;
const maxContentLength = 500;

const titleRemaining = computed(() => title.value.length);
const contentRemaining = computed(() => content.value.length);

const onEmojiClick = (event) => {
  const emoji = event.detail.unicode;
  content.value += emoji;
};

const onTagClick = (event) => {};

const handleTitleInput = (e) => {
  if (e.target.value.length > maxTitleLength) {
    title.value = e.target.value.slice(0, maxTitleLength);
    message.warning(`标题最多 ${maxTitleLength} 字`);
  }
};

// 处理内容输入
const handleContentInput = (e) => {
  if (e.target.value.length > maxContentLength) {
    content.value = e.target.value.slice(0, maxContentLength);
    message.warning(`内容最多 ${maxContentLength} 字`);
  }
};

const handleCancel = () => {
  emit("update:open", false);
  title.value = "";
  content.value = "";
};

const handleConfirm = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    return message.warning("标题和内容不能为空");
  }

  loading.value = true;
  try {
    const res = await axios.post("/api/publish", {
      title: title.value,
      content: content.value
    });

    if (res.data.code === 200) {
      message.success("发布成功");
      emit("update:open", false);
      title.value = "";
      content.value = "";
    } else {
      message.error(res.data.message || "发布失败");
    }
  } catch (err) {
    message.error("请求出错：" + err.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.publish-modal-body {
  margin: 20px 0;
}

.input-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.titleInput, .textInput {
  border: var(--color-lighter) 1px solid;
  font-size: 16px;
}

.titleInput:hover, .textInput:hover,
.titleInput:focus, .textInput:focus {
  border: var(--color-deeper) 1px solid;
}

.buttom-wrapper {
  display: flex;
  align-items: center;
}

.emoji-bar {
  position: relative;
}

.emoji-popup {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 1000;
}

.emoji-btn, .image-bar, .tag-bar, .map-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 36px;
  border-radius: 8px;
  margin: 2px;
  font-size: 20px;
  color: gray;
  padding: 3px 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.emoji-btn:hover, .image-bar:hover, .tag-bar:hover, .map-bar:hover {
  background-color: var(--color-lighter);
  color: var(--color-deeper);
}

.word-count {
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
  color: #999;
}

.publish-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
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
