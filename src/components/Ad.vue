<template>
  <section class="row card">
    <div class="col">
      <p class="desc">sponsored</p>
    </div>
    <div class="col">
      <img :src="`https://cdn.comento.kr/assignment/${item.img}`" alt="ad-img">
    </div>
    <div class="col">
      <h3>{{ item.title }}</h3>
      <p>{{ item.contents }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Ad',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
