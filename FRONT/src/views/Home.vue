<template>
  <div class="home">
    <modal v-if="showModal"/>
    <Header/>
    <div v-if="!myPosition.position" class="load-position">
      <h1>CARREGANDO LOCALIZAÇÃO</h1>
    </div>
    <div v-if="myPosition.position" class="content">
      <Map
        v-if="showMap"
        class="map"
        :myMarker="myPosition"
        :places="places"
        :routePlace="currentPlace"
      />
      <ListPlaces :places="places" @openPlace="setRoutePlace($event)" class="listagem"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Map from "@/components/Map.vue";
import ListPlaces from "@/components/ListPlaces.vue";
import Modal from "@/components/Modal.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      showMap: true,
      showList: false,
      currentPlace: {}
    };
  },
  computed: {
    ...mapState({
      myPosition: state => state.place.position,
      message: state => state.util.message,
      showModal: state => state.util.modalOpened,
      places: state => state.place.places
    })
  },
  mounted() {
    this.getPosition();
  },
  methods: {
    setRoutePlace(place) {
      this.currentPlace = place;
    },
    ...mapActions("place", ["getPosition"]),
    setMap() {
      this.getPosition();
      this.showMap = true;
      this.showList = false;
    },
    setList() {
      this.showMap = false;
      this.showList = true;
    },
    loginUser() {
      this.login();
    }
  },
  components: {
    Header,
    Map,
    ListPlaces,
    Modal
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}
.listagem {
  position: fixed;
  z-index: 17;
  top: 200px;
  overflow-y: auto;
  width: 222px;
  height: 339px;
  background: #7860ca82;
  border-radius: 5px;
  right: 13px;
}
.tab {
  display: flex;
  position: fixed;
  width: 100%;
  z-index: 10;
  top: 97px;
}
.load-position {
  position: absolute;
  top: 33%;
  color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  h1 {
    text-align: center;
    font-size: 25px;
  }
}
</style>
