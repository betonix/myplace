<template>
  <div class="places">
    <ul>
      <li
        v-for="item in places"
        :key="item.id"
        @click="openPlace(item)"
        v-if="item.place_id"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "ListPlaces",
  props: ["places"],
  computed: {},
  methods: {
    ...mapActions("util", ["openModal"]),

    openPlace(place) {
      this.$emit("openPlace", place);
      this.openModal(place.place_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.places {
  width: 100%;
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    li {
      height: 50px;
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
      &:hover {
        background: #a7aeea;
      }
    }
  }
}
</style>

