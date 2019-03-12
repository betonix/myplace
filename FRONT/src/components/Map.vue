<template>
  <GmapMap
    ref="mapRef"
    :center="defaultcenter"
    :zoom="17"
    map-type-id="terrain"
    style="width: 100%; height: 100%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in places"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :icon="m.icon"
      @click="detail(m)"
    />
    <directions-renderer v-if="hasDirectionsResult" :directions="directionsResult"></directions-renderer>
  </GmapMap>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DirectionsRenderer from "./Direction.vue";

export default {
  name: "Map",
  props: ["myMarker", "routePlace"],
  data() {
    return {
      defaultcenter: { lat: 0, lng: 0 },
      hasDirectionsResult: false,
      mapLoaded: false,
      icon: {}
    };
  },
  watch: {
    routePlace: function(val) {
      this.setRoute(this.routePlace);
    }
  },
  computed: {
    directionsResult() {
      return this.hasDirectionsResult && this.$directionsResult;
    },
    ...mapState({
      user: state => state.users.user,
      places: state => state.place.places
    })
  },
  created() {},
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      map.panTo(this.myMarker.position);
      this.icon = {
        url: this.user.photo,
        scaledSize: new google.maps.Size(50, 50)
      };
      this.myMarker["icon"] = this.icon;
      this.defaultcenter = this.myMarker.position;
      this.places.push(this.myMarker);
    });
  },
  methods: {
    ...mapActions("util", ["openModal"]),

    setRoute(place) {
      this.$directionsResult = {};
      this.hasDirectionsResult = false;

      this.$gmapApiPromiseLazy()
        .then(gmap => {
          this.$directionsService = new gmap.maps.DirectionsService();

          var start = new google.maps.LatLng(
            this.myMarker.position.lat,
            this.myMarker.position.lng
          );
          var end = new google.maps.LatLng(
            place.position.lat,
            place.position.lng
          );

          return new Promise(resolve => {
            this.$directionsService.route(
              {
                destination: end,
                origin: start,
                travelMode: "WALKING"
              },
              resolve
            );
          });
        })
        .then(result => {
          this.$directionsResult = result;
          this.hasDirectionsResult = true;
        });
    },

    detail(place) {
      this.setRoute(place);
      this.openModal(place.place_id);
    }
  },
  components: {
    DirectionsRenderer
  }
};
</script>


