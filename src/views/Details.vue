<template>
  <div class="details row" v-if="details" >
    <div class="col">
      <card
        :item="details"
        :options="{ header: false }"
      ></card>
    </div>
    <div class="col">
      <template v-for="(item, index) in details.reply">
        <card
          :key="`card-reply-${index}`"
          :item="item"
          class="underline"
        >
          <template v-slot:header>
            <p class="desc">{{ item.user.name }}</p>
          </template>
        </card>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/mixins/api'
import Card from '@/components/Card'
// import CardDetails from '@/components/CardDetails'
// import CardReply from '@/components/CardReply'

export default {
  name: 'Details',
  components: { Card },
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
