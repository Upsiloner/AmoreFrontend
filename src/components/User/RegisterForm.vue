<template>
  <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical" @finish="handleSubmit"
    @finishFailed="onFinishFailed">
    <!-- 用户名创建 -->
    <a-form-item label="用户名" name="username" :rules="usernameRules" has-feedback class="form-item">
      <a-input v-model:value="formState.username" placeholder="请输入用户名" class="input-button" />
    </a-form-item>

    <!-- 密码创建 -->
    <a-form-item label="密码" name="password" :rules="passwordRules" has-feedback class="form-item">
      <a-input-password v-model:value="formState.password" placeholder="请输入密码" class="input-button" />
    </a-form-item>

    <!-- 邮箱绑定 -->
    <a-form-item label="邮箱" name="email" :rules="emailRules" has-feedback class="form-item">
      <a-input v-model:value="formState.email" placeholder="请输入邮箱" class="input-button" />
    </a-form-item>

    <a-form-item label="验证码" name="captcha">
      <div style="display: flex; gap: 10px;">
        <a-input v-model:value="formState.captcha" placeholder="请输入验证码" style="flex: 1" class="input-button" />
        <a-button :disabled="isCounting" @click="SendCaptcha" style="width: 100px; height: 38px" class="sendCaptcha">
          {{ isCounting ? `${countdown}s` : '发送验证码' }}
        </a-button>
      </div>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" block class="button">
        注册
      </a-button>
    </a-form-item>

    <!-- 注册 & 忘记密码 -->
    <div class="extra-links">
      <router-link to="/login" class="left-link">⇐ 返回登录界面</router-link>
      <router-link to="/forget" class="right-link">忘记密码？</router-link>
    </div>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const formRef = ref()

const formState = reactive({
  username: '',
  password: '',
  email: '',
  captcha: ''
})

const usernameRules = [
  { required: true, message: '请输入用户名', trigger: 'blur' },
  { min: 3, message: '用户名长度不能小于 3 个字符', trigger: 'blur' },
  { max: 18, message: '用户名长度不能超过 18 个字符', trigger: 'blur' },
  { pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/, message: '用户名只能包含汉字和字母', trigger: 'blur' }
]

const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' },
  { max: 18, message: '密码长度不能超过 18 个字符', trigger: 'blur' },
  { pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=?<>][}{}]+$/, message: '密码只能包含字母、数字和特殊字符', trigger: 'blur' }
]

const emailRules = [
  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
  { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
  { min: 3, message: '邮箱长度不能小于 3 个字符', trigger: 'blur' },
  { max: 30, message: '邮箱长度不能超过 30 个字符', trigger: 'blur' }
]

const isCounting = ref(false)
const countdown = ref(60)
let timer = null

const SendCaptcha = async () => {
  if (isCounting.value) return
  try {
    await formRef.value.validateFields(['email']);
  } catch (error) {
    message.warning('请输入正确的邮箱');
    return;
  }

  isCounting.value = true
  countdown.value = 60

  timer = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(timer)
      isCounting.value = false
    }
  }, 1000)
  /* 发送验证码接口 */
}

const handleSubmit = async () => {
  if (formState.captcha.length != 6) {
    message.error('请填写正确的信息')
    return
  }
  /* 注册接口 */
}

const onFinishFailed = ({ errorFields }) => {
  message.error('请填写正确的信息')
}
</script>

<style scoped>
::v-deep(.ant-form-item-label > label) {
  font-size: 18px;
  color: rgb(59, 59, 59);
  font-weight: bold;
}

.button {
  background-color: var(--color-primary);
  font-size: 16px !important;
  /* 登录按钮字体大小 */
  height: 38px;
  margin-top: 6px;
  margin-bottom: 10px !important;
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

.sendCaptcha:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.input-button:checked {
  border-color: var(--color-deeper);
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