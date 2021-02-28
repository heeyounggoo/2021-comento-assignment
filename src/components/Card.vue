<template>
  <section :class="`card row ${to ? 'card--clickable' : ''}`" @click="routerPush">
    <div v-if="option.header" class="col card__header">
      <slot name="header" :card="item"></slot>
    </div>
    <div v-if="option.contents" class="col card__contents">
      <slot name="contents" :card="item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.contents }}</p>
      </slot>
    </div>
    <div v-if="option.footer" class="col card__footer">
      <slot name="footer">
        <p class="desc">{{ item.created_at | dateFormat }}</p>
      </slot>
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
    },
    to: {
      type: [Object, String]
    },
    headerId: String,
    options: Object
  },
  mixins: [util],
  data () {
    return {
      defaultOptions: {
        header: true,
        contents: true,
        footer: true
      }
    }
  },
  computed: {
    ...mapState('feeds', [
      'category'
    ]),
    option () {
      return Object.assign({}, this.defaultOptions, this.options)
    }
  },
  methods: {
    routerPush () {
      if (this.to) {
        const target = typeof to === 'string' ? { name: this.to } : this.to
        console.log(target)
        this.$router.push(target)
      }
    }
  }
}
</script>
