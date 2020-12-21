<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="doLogin">
                  <h1>Войти</h1>
                  <p class="text-muted">Войти в ваш аккаунт</p>
                  <CInput placeholder="Логин" v-model="login">
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Пароль"
                    type="password"
                    autocomplete="curent-password"
                    v-model="password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" type="submit">Войти</CButton>
                    </CCol>
                    <CCol col="12">
                      <CAlert color="danger" class="mt-3" v-if="error">{{error}}</CAlert>
                    </CCol>
                    
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
         
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      error: "",
    };
  },

  methods: {
    async doLogin() {
      try {
        const { data: result } = await this.$api.post("adminLogin", null, {
          login: this.login,
          password: this.password,
        });
        if (result.error) {
          this.error = result.error;
        }
        if (result.token) {
          this.$store.commit("user/setToken", result.token);
          this.$store.commit("user/setUser", result.user);
          this.$router.push("/");
        }
      } catch (err) {
        this.$error(err)
      }
    },
  },
};
</script>
