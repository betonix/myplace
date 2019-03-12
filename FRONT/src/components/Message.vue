<template>
  <transition name="modal" v-if="message">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>{{message}}</h1>
          <button @click="close()">OK</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Message",
  computed: {
    ...mapState({
      message: state => state.util.message
    })
  },
  methods: {
    ...mapActions("util", ["setMessage"]),
    close() {
      this.setMessage("");
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 10009;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  height: 17%;
  width: 17%;
  min-width: 200px;
  min-height: 200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #a9b8f3d1;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  h1 {
    color: white;
    font-size: 20px;
  }
  button {
    height: 50px;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

