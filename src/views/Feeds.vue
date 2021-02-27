<template>
  <div class="feeds">
    <div class="feeds--filter">
      <button type="button" @click="sortItems('asc')">오름차순</button>
      <button type="button" @click="sortItems('desc')">내림차순</button>
      <button type="button" @click="openDialog">필터</button>
    </div>
    <div class="feeds--cards">
      <template v-for="(item, index) in list">
        <ad
          v-if="index % 4 === 0 && index !== 0"
          :key="`ad-card-${index}`"
        ></ad>
        <card
          :key="`card-${index}`"
          :item="item"
        ></card>
      </template>
    </div>
    <div class="feeds--loading"></div>
    <filter-dialog
      v-if="dialog"
      :items="category"
    ></filter-dialog>
  </div>
</template>

<script>
import api from '@/mixins/api'
import dialog from '@/mixins/dialog'
import Card from '@/components/Card'
import Ad from '@/components/Ad'
import FilterDialog from '@/components/FilterDialog'

export default {
  name: 'Feeds',
  components: { Card, Ad, FilterDialog },
  mixins: [api, dialog],
  data () {
    return {
      page: 1,
      sort: 'asc',
      list: [],
      category: []
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.api('get', '/category', { assignTarget: 'category' })
        .then((data) => {
          this.category = data.category
          this.getList()
          this.infiniteScroll()
        })
    },
    getList () {
      this.api('get', '/list', {
        params: {
          page: this.page,
          ord: this.sort,
          category: this.category.map(item => item.id),
          limit: 10
        }
      })
        .then((data) => {
          this.list.push(...data.data)
        })
    },
    sortItems (order) {
      this.sort = order
      this.list.sort((a, b) => order === 'asc' ? a.id - b.id : b.id - a.id)
    },
    infiniteScroll () {
      const target = this.$el.querySelector('.feeds--loading')
      const io = new IntersectionObserver((entries, observer) => {
        // TODO 처음 분기 처리
        entries.forEach(entry => {
          const isEmptyList = JSON.parse(JSON.stringify(this.list)).length === 0
          if (entry.isIntersecting && !isEmptyList) {
            this.page++
            this.getList()
          }
        })
      }, {
        threshold: 0.3
      })

      if (target) io.observe(target)
    },
    openDialog () {
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .feeds--loading {
    width: 80px;
    height: 80px;
    margin: 0 auto;

    &:after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid;
      border-color: #fff #00C854 #fff #00C854;
      animation: loading-ring 1.2s linear infinite;
    }
  }
  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
