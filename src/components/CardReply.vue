<template>
  <section class="row card">
    <div class="col">
      <p class="desc">{{ item.user.name }}</p>
    </div>
    <div class="col">
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
  name: 'CardReply',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  mixins: [util]
}
</script>
