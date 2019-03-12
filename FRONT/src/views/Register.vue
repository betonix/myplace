<template>
  <div class="login">
    <form v-on:submit.prevent="onSubmit">
      <h1>MyPlace</h1>
      <h2>Criar Conta</h2>
      <input type="text" placeholder="Nome" v-model="usertoRegister.name">
      <input type="text" placeholder="Email" v-model="usertoRegister.email">
      <input type="password" placeholder="Senha" v-model="usertoRegister.password">
      <button @click="registerUser">CRIAR CONTA</button>
      <div class="btns">
        <button @click="login">LOGIN</button>
      </div>
      <router-link to="/recovery-password">Esqueceu a senha?</router-link>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { router } from "../router";
export default {
  name: "ChangePassword",
  data() {
    return {
      usertoRegister: {}
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.user
    })
  },
  methods: {
    ...mapActions("users", ["createUser"]),

    login() {
      router.push("login");
    },

    onSubmit() {},

    registerUser() {
      this.createUser(this.usertoRegister);
    }
  },
  components: {}
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
    height: 670px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 60px;
      color: #ffffff;
    }
    h2 {
      font-size: 25px;
      color: #ffffff;
    }
    .btns {
      width: 100%;
      display: flex;
      justify-content: space-around;
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

