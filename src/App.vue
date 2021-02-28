<template>
  <div id="app">
    <header class="topbar">
      <p>[2021.02.28] 구희영</p>
    </header>
    <div class="container">
      <nav class="sidebar cols-3" v-if="$route.name === 'Feeds'">
        <button type="button" class="btn btn--xlarge">로그인</button>
      </nav>
      <main :class="$route.name === 'Feeds' ? 'cols-9' : 'cols-12'">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
