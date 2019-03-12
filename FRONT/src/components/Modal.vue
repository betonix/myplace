<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-if="place.result">
          <span @click="close()">X</span>
          <div class="info">
            <div class="rating">
              <i
                @click="setFavorite"
                :class="[place.isfavorite ?  'fas fa-heart favorite fa-3x' : 'fas fa-heart normal fa-3x', 'fa']"
              ></i>
              <h1>{{place.result.name}}</h1>
              <h2>{{place.result.formatted_address}}</h2>
              <star-rating :show-rating="false" v-model="myReview.rate"></star-rating>
              <textarea v-model="myReview.comments" rows="5"></textarea>
              <button @click="sendReview">ENVIAR AVALIAÇÃO</button>
            </div>
          </div>
          <div class="rates">
            <h1>Avaliações</h1>
            <div class="coment">
              <div v-for="item in place.reviews" :key="item.id" class="coment-rate">
                <div class="user">
                  <img :src="item.user.photo" alt>
                  <small>{{item.user.name}}</small>
                  <star-rating
                    :star-size="20"
                    :read-only="true"
                    :show-rating="false"
                    :rating="item.rate"
                  ></star-rating>
                </div>
                <p>{{item.comments}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapState, mapActions } from "vuex";
export default {
  name: "Modal",

  data() {
    return {
      mystarts: 0,
      myReview: {}
    };
  },

  computed: {
    ...mapState({
      place: state => state.place.currentPlace
    })
  },
  methods: {
    ...mapActions("util", ["closeModal"]),
    ...mapActions("favorite", ["saveFavorite", "removeFavorite"]),
    ...mapActions("review", ["saveReview"]),
    sendReview() {
      this.myReview.place_id = this.place.result.place_id;
      this.saveReview(this.myReview);
      this.myReview = {};
    },
    close() {
      this.closeModal();
    },
    setFavorite() {
      if (this.place.isfavorite) {
        this.removeFavorite(this.place.result.place_id);
      } else {
        this.saveFavorite(this.place.result.place_id);
      }
    }
  },
  components: {
    StarRating
  }
};
</script>

<style lang="scss" scoped>
.favorite {
  color: red;
}
.normal {
  color: gray;
}
.stars {
  height: 20px;
}
.info {
  display: flex;
  img {
    width: 100%;
  }
  .rating {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      text-align: center;
    }
    h2 {
      text-align: center;
    }
    textarea {
      width: 99.5%;
      resize: none;
      font-size: 25px;
    }
  }
}
.rates {
  display: flex;
  flex-direction: column;
  .coment {
    width: 100%;
    height: 306px;
    overflow-x: auto;
    background-color: #bec5e2;
  }
}
.coment-rate {
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-top: 15px;
  border-bottom: 1px solid white;
  .user {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      width: 64px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
  p {
    margin-left: 15px;
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
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
  height: 90%;
  width: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #7f8dc5;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: auto;
  position: relative;
  span {
    color: #4f0170;
    font-size: 53px;
    position: absolute;
    right: 14px;
    top: 11px;
    cursor: pointer;
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

