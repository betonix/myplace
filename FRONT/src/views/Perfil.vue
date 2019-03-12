<template>
  <div class="login">
    <Header/>
    <form v-on:submit.prevent="onSubmit">
      <h1>Perfil</h1>
      <img :src="currentUser.photo" alt="">
      <input type="text" placeholder="Nome" v-model="currentUser.name">
      <button @click="edit">Salvar</button>
    </form>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { mapState, mapActions } from "vuex";
export default {
  name: "ChangePassword",
  data(){
    return{
     payload:{}
    }
  },
  computed: {
      ...mapState({
        currentUser: state => state.users.user,
        message: state => state.util.message,
      })
  },
  methods: {
    ...mapActions('users', [
        'editUser'
      ]),

    login(){},

    onSubmit() {},

    edit() {
      this.payload.name = this.currentUser.name;
      this.editUser(this.payload);
    },
   
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
      margin: 0;
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
  img{
    border-radius: 50%;
    width: 150px;
  }
}
</style>

