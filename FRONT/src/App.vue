<template>
  <div id="app">
    <Message/>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Message from "@/components/Message.vue";

export default {
  name: "Header",
  methods: {
    ...mapActions("users", ["logout"])
  },
  computed: {
    ...mapState({
      user: state => state.users.user
    })
  },
  components: {
    Message
  }
};
</script>
<style  lang="scss">
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "Montserrat", sans-serif;
  background-image: linear-gradient(7deg, #000000, #010101, #636363);
}

button {
  background: #4f0170;
  color: #ffffff;
  border: none;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  width: 100%;
  height: 72px;
  &:hover {
    background: #8729af;
  }
}

@media (max-width: 600px) {
  form {
    width: 80% !important;
  }
  .places ul li {
    height: 36px !important;
    font-size: 11px !important;
  }
  .listagem {
    width: 160px !important;
  }
}
</style>
