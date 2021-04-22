<template>
  <div>login</div>
  <Button
    block
    @click="handleLogin"
    :loading="loading"
  >登录</Button>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Button } from "ant-design-vue";
import { useMessage } from "/@/hooks/web/useMessage";
import { useI18n } from "/@/hooks/web/useI18n";
import router from "/@/router";
import store from "/@/store";

export default defineComponent({
  name: "Login",
  components: {
    Button,
  },
  setup() {
    const { t } = useI18n();
    const loading = ref(false);
    const { notification } = useMessage();
    function handleLogin() {
      loading.value = true;
      store.commit("user/commitTokenState", "fakeToken1");
      router.replace("/dashboard");
      notification.success({
        message: t("sys.login.loginSuccessTitle"),
        description: `${t("sys.login.loginSuccessDesc")}: liliang!`,
        duration: 3,
      });
      loading.value = false;
    }

    return {
      handleLogin,
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
</style>