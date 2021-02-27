<template>
  <div class="details" v-if="details" >
    <card-details :item="details"></card-details>
    <div class="details--reply">
      <p>답변 {{ details.reply.length }}</p>
      <card-reply
        v-for="(item, index) in details.reply"
        :key="`card-reply-${index}`"
        :item="item"
      ></card-reply>
    </div>
  </div>
</template>

<script>
import api from '@/mixins/api'
import CardDetails from '@/components/CardDetails'
import CardReply from '@/components/CardReply'

export default {
  name: 'Details',
  components: { CardDetails, CardReply },
  mixins: [api],
  data () {
    return {
      details: null
    }
  },
  created () {
    this.getDetails()
  },
  methods: {
    getDetails () {
      this.api('get', '/view', {
        params: {
          id: this.$route.params.id
        }
      })
        .then((data) => {
          this.details = data.data
        })
    }
  }
}
</script>
