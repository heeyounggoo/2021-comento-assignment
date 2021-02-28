<template>
  <section class="card row" @click="$router.push({ name: 'Details', params: { id: item.id } })">
    <div class="col card__header">
      <p class="desc">{{ categoryName(item.category_id) }}</p>
      <p class="desc">{{ item.id }}</p>
      <p class="desc">{{ item.user_id }} | {{ item.created_at | dateFormat }}</p>
    </div>
    <div class="col card__contents">
      <h3>{{ item.title }}</h3>
      <p>{{ item.contents }}</p>
    </div>
  </section>
</template>

<script>
import util from '@/mixins/util'
import {
  mapState
} from 'vuex'

export default {
  name: 'Card',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  mixins: [util],
  computed: {
    ...mapState('feeds', [
      'category'
    ]),
    categoryName () {
      return (categoryId) => {
        return this.category.find(item => item.id === categoryId).name
      }
    }
  }
}
</script>
