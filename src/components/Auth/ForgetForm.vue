<template>
  <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical" @finish="handleSubmit"
    @finishFailed="onFinishFailed">

    <!-- 新密码 -->
    <a-form-item label="新密码" name="password1" :rules="passwordRules" has-feedback class="form-item">
      <a-input-password v-model:value="formState.password1" placeholder="请输入新密码" class="input-button" />
    </a-form-item>

    <!-- 再次输入新密码 -->
    <a-form-item label="重复密码" name="password2" :rules="passwordRules" has-feedback class="form-item">
      <a-input-password v-model:value="formState.password2" placeholder="再次输入新密码" class="input-button" />
    </a-form-item>

    <!-- 邮箱绑定 -->
    <a-form-item label="邮箱" name="email" :rules="emailRules" has-feedback class="form-item">
      <a-input v-model:value="formState.email" placeholder="请输入邮箱" class="input-button" />
    </a-form-item>

    <a-form-item label="验证码" name="code">
      <div style="display: flex; gap: 10px;">
        <a-input v-model:value="formState.code" placeholder="请输入验证码" style="flex: 1" class="input-button" />
        <a-button :disabled="isCounting" @click="SendCode" style="width: 100px; height: 38px" class="sendCode">
          {{ isCounting ? `${countdown}s` : '发送验证码' }}
        </a-button>
      </div>
    </a-form-item>


    <a-form-item>
      <a-button type="primary" html-type="submit" block class="purple-button">
        修改密码
      </a-button>
    </a-form-item>

    <!-- 注册 & 忘记密码 -->
    <div class="extra-links">
      <router-link to="/login" class="left-link">⇐ 返回登录界面</router-link>
      <router-link to="/register" class="right-link">注册账号</router-link>
    </div>
  </a-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { sendCode, forget } from '@/apis/auth'

const router = useRouter();
const formRef = ref()

const formState = reactive({
  password1: '',
  password2: '',
  email: '',
  code: ''
})

const passwordRules = [
  { required: true, message: '请输入密码', trigger: 'blur' },
  { min: 6, message: '密码长度不能小于 6 个字符', trigger: 'blur' },
  { max: 18, message: '密码长度不能超过 18 个字符', trigger: 'blur' },
  { pattern: /^[a-zA-Z0-9!@#$%^&*()_\+\-=?<>\[\]{}]{6,18}$/, message: '密码只能包含字母、数字和特殊字符', trigger: 'blur' }
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

const SendCode = async () => {
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

  const res = await sendCode({ email: formState.email });
  if (res.code === 200) {
    message.success(res.message);
  } else {
    message.warning(res.message);
  }
}

const handleSubmit = async () => {
  if (formState.code.length != 6) {
    message.error('请填写正确的信息')
    return
  } else if (formState.password1 != formState.password2) {
    message.error('两次输入的密码不一致')
    return
  }
  
  const res = await forget({
    email: formState.email,
    code: formState.code,
    password: formState.password1
  });
  if (res.code === 200) {
    message.success(res.message);
    router.push('/login');
  } else {
    message.warning(res.message);
  }
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

.purple-button {
  background-color: var(--color-primary);
  font-size: 16px !important;
  /* 登录按钮字体大小 */
  height: 38px;
  margin-top: 6px;
  margin-bottom: 10px !important;
}

.purple-button:hover {
  background-color: var(--color-deeper);
}

.input-button {
  height: 38px
}

.input-button:hover {
  border-color: var(--color-primary);
}

.sendCode:hover {
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