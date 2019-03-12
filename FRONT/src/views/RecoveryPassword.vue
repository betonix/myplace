<template>
  <div class="panel">
    <form v-on:submit.prevent="onSubmit">
      <h1>Recuperar Senha</h1>
      <input type="text" placeholder="Email" v-model="payload.email">
      <button @click="recovery">RECUPERAR SENHA</button>
      <button @click="login()">VOLTAR LOGIN</button>
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
      payload: {}
    };
  },
  computed: {},
  methods: {
    ...mapActions("users", ["recoveryPassword"]),

    login() {},

    onSubmit() {},
    login() {
      router.push("/login");
    },
    recovery() {
      this.recoveryPassword(this.payload);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.panel {
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
      font-size: 45px;
      color: #ffffff;
      margin: 0;
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
  img {
    border-radius: 50%;
    width: 150px;
  }
}
</style>

