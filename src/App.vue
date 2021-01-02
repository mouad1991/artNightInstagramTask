<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-brand href="#">ArtNight</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item :exact-active-class="'active'" :to="{ name: 'feed', params: { username: 'artnightevents' } }">Artnightevents</b-nav-item>
          <b-nav-item :exact-active-class="'active'" :to="{ name: 'feed', params: { username: 'shakenightevents' } }">Shakenightevents</b-nav-item>
          <b-nav-item :exact-active-class="'active'" :to="{ name: 'feed', params: { username: 'plantnightevents' } }">Plantnightevents</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
