<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm @submit.prevent="doSignUp">
                <h1>Регистрация</h1>
                <p class="text-muted">Создать аккаунт</p>
                <CInput
                  placeholder="Логин"
                  autocomplete="username"
                  v-model="$v.login.$model"
                  :isValid="$v.login.$error ? false : null"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>

                <!-- <CInput placeholder="Email" autocomplete="email" prepend="@" /> -->
                <CInput
                  placeholder="Пароль"
                  type="password"
                  autocomplete="new-password"
                  v-model="$v.password.$model"
                  :isValid="$v.password.$error ? false : null"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <!-- <CInput
                  placeholder="Повторите пароль"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>-->
                <CButton color="success" type="submit" block
                  >Создать аккаунт</CButton
                >
                <p class="text-center mt-2">
                  Есть аккаунт? <CLink to="/login">Войти</CLink>
                </p>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Register",
  data() {
    return {
      login: "",
      password: "",
      // passwordRepeat: ''
    };
  },
  validations: {
    login: {
      required,
    },
    password: {
      required,
      minLength: minLength(3),
    },
  },
  mounted() {
    console.log(this.$v);
  },
  methods: {
    async doSignUp() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const { data } = await this.$api.post("adminSignup", null, {
        login: this.login,
        password: this.password,
      });
      if (data.ok) {
        this.$notify({
          group: "main",
          type: "success",
          title: "Пользователь создан!",
        });
        this.$router.push("/login");
      }
    },
  },
};
</script>
