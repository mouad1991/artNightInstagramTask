<template>
<div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: media == 'images' }" v-on:click="media = 'images'">Images</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: media == 'videos' }" v-on:click="media = 'videos'">Videos</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <div class="box" v-if="media == 'images'">
      <div class="wrapper" v-for="(item, index) in images" :key="index">
        <img :src="item.original" height="300" width="300" />
        <span class="mb-2 float-left"><b-icon icon="heart" font-scale="1" class="mx-2"></b-icon>{{ item.likes }}</span>
      </div>
    </div>
    <div class="box" v-if="media == 'videos'">
      <div class="wrapper" v-for="(item, index) in videos" :key="index" @click="readVideo(item.video_url)">
        <img :src="item.thumbnail" height="300" width="300" />
        <span v-if="media == 'videos'" class="mb-2 float-left"><b-icon icon="eye" font-scale="1" class="mx-2"></b-icon>{{ item.views }}</span>
      </div>
    </div>
  </div>
  <b-modal centered id="bv-modal-example" hide-footer>
     <video width="100%" height="500" :src="videoUrl" autoplay controls></video>
  </b-modal>
</div>
</template>

<script>
export default {
  props: {
    username: String,
    feedNumber: Number
  },
  data () {
    return {
      media: 'images',
      videoUrl: ''
    }
  },
  computed: {
    images () {
      return this.$store.getters.getImages(this.username, this.feedNumber)
    },
    videos () {
      return this.$store.getters.getVideos(this.username, this.feedNumber)
    },
    selfProps () {
      return this.feedNumber + this.username
    }
  },
  watch: {
    selfProps: function () {
      this.fetchFeed()
    },
    media: function () {
      this.fetchFeed()
    }
  },
  mounted () {
    this.fetchFeed()
  },
  methods: {
    fetchFeed () {
      this.$store.dispatch('fetchFeed', {
        username: this.username
      })
    },
    readVideo (videoUrl) {
      this.videoUrl = videoUrl
      this.$bvModal.show('bv-modal-example')
    }
  }
}
</script>

<style>
.nav-link {
  cursor: pointer;
}
.card {
  background-color: transparent;
}
.wrapper{
  width:300px;
  height:300px;
  border:10px solid white;
  border-radius:16px;
  position:relative;
  background:white;
  margin: 30px 10px;
  box-shadow:
    3px 3px 3px 3px rgba(40,40,40,0.2);
}
.wrapper:before, .wrapper:after{
    content:"";
  display:block;
  width:98%;
  height:98%;
  background:white;
  box-shadow:
    3px 3px 3px 3px rgba(40,40,40,0.2);
  position:absolute;
  border:10px solid white;
  border-radius:16px;
  transition: all 0.5s ease-out;
}
.wrapper:before{
  z-index:-9;
  transform:rotate(-5deg);
  top:-15px;
  left:-20px;
}
.wrapper:after {
  z-index:-10;
  transform:rotate(6deg);
  top:0px;
  left:20px;
}
.wrapper:hover:before, .wrapper:hover:after{
    transform:rotate(0);
}
.wrapper:hover:before{top:10px; left:0px;}
.wrapper:hover:after{top:-15px; left:0px;}
img{
  border-radius:10px;
  opacity:0.7;
  transition:opacity 0.5s ease;
}
.wrapper:hover img {
    opacity:1;
}
.box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.modal-dialog {
      max-width: 800px;
      margin: 30px auto;
  }

.modal-body {
  position:relative;
  padding:0px;
}
.close {
  position:absolute;
  right:-30px;
  top:0;
  z-index:999;
  font-size:2rem;
  font-weight: normal;
  color:#fff;
  opacity:1;
}
</style>
