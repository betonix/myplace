<template>
  <div class="header">
    <h1>MyPlace</h1>
    <div class="user">
      <img :src="user.photo" alt>
      <small>{{user.name}}</small>
      <div class="options">
      <ul>
        <li><router-link to="/perfil">Perfil</router-link></li>
        <li><router-link to="/change-password">Alterar senha</router-link></li>
         <li><router-link to="/home">Lugares</router-link></li>
         <li><a @click="logout()">Logout</a></li>
      </ul>
    </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  methods:{
     ...mapActions('users', [
        'logout',
    ]),
  },
  computed: {
      ...mapState({
        user: state => state.users.user,
      })
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  height: 97px;
  background-image: linear-gradient(100deg, #b518db, #7642d1, #7f8dc5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  top: 0px;
  h1 {
    margin-left: 30px;
    color: #ffffff;
  }
}
.user {
    width: 113px;
    height: 78px;
    margin-right: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    small{
      color: white;
    }
  &:hover {
      .options{
            display: block;
          }
      }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
     
  }
}
.options{
    width: 200px;
    z-index: 10000;
    background: white;
    position: absolute;
    top: 55px;
    right: 0;
    display: none;
    ul{
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
      li{
        height: 33px;
        border-bottom: solid 1px white;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #7e85c666;
        color: white;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        a{
          text-decoration: none;
          margin:0;
          padding: 0;
          color:white;
        }
        &:hover {
          background: #a7aeea;
        }
      }
    }
}
</style>

