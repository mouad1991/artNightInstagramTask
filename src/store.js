
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    feeds: []
  },
  getters: {
    getImages: state => (username, feedNumber) => {
      const feed = state.feeds.find(item => item.username === username)
      return feed ? feed.images.slice(0, feedNumber) : []
    },
    getVideos: state => (username, feedNumber) => {
      const feed = state.feeds.find(item => item.username === username)
      return feed ? feed.videos.slice(0, feedNumber) : []
    }
  },
  mutations: {
    setFeeds: (state, payload) => {
      state.feeds.push(payload)
    },
    initialiseStore (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  },
  actions: {
    fetchFeed ({ commit, state }, params) {
      let username = params.username.replace(' ', '_').toLowerCase()
      if (!state.feeds.find(item => item.username === username)) {
        let url = `https://www.instagram.com/${username}/?__a=1`
        axios.get(url).then(response => {
          let user = response.data.graphql.user
          if (user) {
            let images = []
            let videos = []
            const mediaImages = user.edge_owner_to_timeline_media
            mediaImages.edges.forEach((node, index) => {
              const image = {
                'likes': node['node']['edge_media_preview_like']['count'],
                'original': node['node']['display_url']
              }
              images.push(image)
            })

            const mediaVideos = user.edge_felix_video_timeline
            mediaVideos.edges.forEach((node, index) => {
              const video = {
                'thumbnail': node['node']['thumbnail_src'],
                'video_url': node['node']['video_url'],
                'views': node['node']['video_view_count']
              }
              videos.push(video)
            })
            const payload = {
              username: username,
              images: images,
              videos: videos
            }
            commit('setFeeds', payload)
          } else {
            console.log('Username does not exists')
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store
