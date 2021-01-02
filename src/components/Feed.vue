<template>
  <div class="container-fluid">
    <div class="row justify-content-between">
      <div class="col-4">
        <h1 class="my-3 text-center">{{ username | capitalize }}</h1>
      </div>
      <div class="col-3">
        <div class="form-group row my-3">
          <label for="feedNumber" class="col-sm-4 col-form-label">Number of feeds</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="feedNumber" id="feedNumber">
          </div>
        </div>
      </div>
    </div>
    <gallery :username="username" :feed-number="feeds"></gallery>
  </div>
</template>

<script>
import Gallery from './Gallery.vue'
export default {
  components: {
    Gallery
  },
  data () {
    return {
      feedNumber: 12
    }
  },
  computed: {
    username () {
      return this.$route.params.username
    },
    feeds () {
      return parseInt(this.feedNumber)
    }
  }
}
</script>
