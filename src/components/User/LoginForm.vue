<template>
  <div class="login-page">
    <img src="/logo.svg" alt="logo" class="logo" />

    <a-form :model="formState" :rules="rules" layout="vertical" @finish="handleSubmit" @finishFailed="onFinishFailed">
      <!-- 用户名校验 -->
      <a-form-item label="邮箱" name="email" :rules="emailRules" has-feedback class="form-item">
        <a-input v-model:value="formState.email" placeholder="请输入邮箱" class="input-button" />
      </a-form-item>

      <!-- 密码 -->
      <a-form-item label="密码" name="password" :rules="passwordRules" has-feedback class="form-item">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码" class="input-button" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block class="button">
          登录
        </a-button>
      </a-form-item>

      <!-- 注册 & 忘记密码 -->
      <div class="extra-links">
        <router-link to="/register" class="register-link">注册账号</router-link>
        <router-link to="/forget" class="forget-link">忘记密码？</router-link>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const formState = reactive({
  email: '',
  password: ''
})

const emailRules = [
  { required: true, message: '请输入邮箱', trigger: 'blur' },
  { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] },
  { min: 3, message: '邮箱长度不能小于 3 个字符', trigger: 'blur' },
  { max: 30, message: '邮箱长度不能超过 30 个字符', trigger: 'blur' }
]

const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' },
  { max: 18, message: '密码长度不能超过 18 个字符', trigger: 'blur' },
]

const handleSubmit = async () => {}

const onFinishFailed = ({ errorFields }) => {
  message.error('请填写正确的邮箱和密码')
}
</script>

<style scoped>
.logo {
  height: 108px;
  margin-bottom: 20px;
}

::v-deep(.ant-form-item-label > label) {
  font-size: 18px;
  color: rgb(59, 59, 59);
  font-weight: bold;
}

.button {
  background-color: var(--color-primary);
  font-size: 16px !important;
  height: 38px;
  margin-top: 16px;
}

.button:hover {
  background-color: var(--color-deeper);
}

.input-button {
  height: 38px
}

.input-button:hover {
  border-color: var(--color-primary);
}

.input-button:checked {
  border-color: var(--color-primary);
}

.extra-links {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: -10px;
  padding: 0 2px;
}

.extra-links a {
  color: var(--color-primary);
  text-decoration: none;
}

.extra-links a:hover {
  text-decoration: underline;
}
</style>