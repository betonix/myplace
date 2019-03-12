<template>
  <div class="login">
    <Header/>
    <form v-on:submit.prevent="onSubmit">
      <h1>Alterar senha</h1>
      <input type="password" placeholder="Senha atual" v-model="payload.password">
      <input type="password" placeholder="Nova Senha" v-model="payload.new_password">
      <input type="password" placeholder="Confirmar senha" v-model="payload.confirm_password">
      <button @click="updatePassword">ALTERAR SENHA</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "ChangePassword",
  data() {
    return {
      payload: {}
    };
  },
  computed: {
    ...mapState({
      currentUser: state => state.users.user,
      message: state => state.util.message
    })
  },
  methods: {
    ...mapActions("users", ["changePassword"]),

    login() {},

    onSubmit() {},

    updatePassword() {
      this.changePassword(this.payload);
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
    height: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 30px;
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
    height: 30px;
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

