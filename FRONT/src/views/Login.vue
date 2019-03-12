<template>
  <div class="login">
    <form v-on:submit.prevent="onSubmit">
      <h1>MyPlace</h1>
      <input type="text" placeholder="Email" v-model="currentUser.email">
      <input type="password" placeholder="Senha" v-model="currentUser.password">
      <button @click="login">ENTRAR</button>
      <div class="btns">
        <fb-signin-button
          @success="loginViaFacebook"
          :params="fbSignInParams"
          @error="getUserData"
        >FACEBOOK</fb-signin-button>
        <button @click="criarConta">CRIAR CONTA</button>
      </div>
      <router-link to="/recovery-password">Esqueceu a senha?</router-link>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapState, mapActions } from "vuex";
import { router } from "../router";

export default {
  name: "Login",
  data() {
    return {
      fbSignInParams: {}
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.user,
      message: state => state.util.message
    })
  },
  methods: {
    ...mapActions("users", ["loginEmail", "loginFacebook"]),

    onSubmit() {},

    getUserData(data) {
      this.fetchData();
    },
    criarConta() {
      router.push("register");
    },
    login() {
      this.loginEmail(this.currentUser);
    },

    loginViaFacebook(data) {
      let token = data.authResponse.accessToken;
      this.loginFacebook(token);
    }
  },
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(152deg, #b518db, #7642d1, #7f8dc5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    width: 500px;
    height: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 60px;
      color: #ffffff;
    }
    .btns {
      width: 100%;
      display: flex;
      justify-content: space-around;
      :first-child {
        background: #0470cf;
        width: 100%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          background-color: #3995e6;
        }
      }
    }
  }
  input {
    width: 100%;
    height: 60px;
    background: #ffffff;
    border: 0px;
    border-radius: 6px;
    font-size: 27px;
    padding: 5px;
  }
  a {
    align-self: flex-end;
    color: #ffffff;
    font-size: 20px;
    text-decoration: none;
  }
}
</style>

