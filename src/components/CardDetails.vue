<template>
  <section class="card row active">
    <div class="col">
      <h3>{{ item.title }}</h3>
      <p>{{ item.contents }}</p>
    </div>
    <div class="col">
      <p class="desc">{{ item.created_at | dateFormat }}</p>
    </div>
  </section>
</template>

<script>
import util from '@/mixins/util'

export default {
  name: 'CardDetails',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  mixins: [util]
}
</script>
