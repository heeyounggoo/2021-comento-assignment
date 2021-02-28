<template>
  <div class="feeds">
    <div class="feeds--filter">
      <button type="button" class="btn sort asc active" @click="sortList('asc')">오름차순</button>
      <button type="button" class="btn sort desc" @click="sortList('desc')">내림차순</button>
      <button type="button" class="btn btn--outlined" @click="openDialog">필터</button>
    </div>
    <div class="feeds--cards">
      <template v-for="(item, index) in list">
        <ad
          v-if="adList[index/3 - 1]"
          :key="`ad-card-${index}`"
          :item="adList[index/3 - 1]"
        ></ad>
        <card
          :key="`card-${index}`"
          :item="item"
        ></card>
      </template>
    </div>
    <div class="feeds--loading"></div>
    <filter-dialog
      :dialog.sync="dialog"
      :items="category"
      @select="filterList"
    ></filter-dialog>
  </div>
</template>

<script>
import api from '@/mixins/api'
import Card from '@/components/Card'
import Ad from '@/components/Ad'
import FilterDialog from '@/components/dialog/FilterDialog'

export default {
  name: 'Feeds',
  components: { Card, Ad, FilterDialog },
  mixins: [api],
  data () {
    return {
      dialog: false,

      page: 1,
      sort: 'asc',

      list: [],
      adList: [],
      category: [],
      filteredCategory: []
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
    getList (type) {
      this.api('get', '/list', {
        params: {
          page: this.page,
          ord: this.sort,
          category: type === 'filter' ? this.filteredCategory : this.category.map(item => item.id),
          limit: 10
        }
      })
        .then((data) => {
          if (type === 'filter') this.list = data.data
          else this.list.push(...data.data)
          this.getAdList()
        })
    },
    getAdList () {
      this.api('get', '/ads', {
        params: {
          page: 1,
          limit: Math.floor(this.list.length / 3)
        }
      })
        .then((data) => {
          this.adList = data.data
        })
    },
    filterList (selected) {
      this.filteredCategory = selected
      this.getList('filter')
    },
    sortList (order) {
      this.sort = order
      this.$el.querySelector(`.${order}`).classList.add('active')
      this.$el.querySelector(`.${order === 'asc' ? 'desc' : 'asc'}`).classList.remove('active')
      this.list.sort((a, b) => order === 'asc' ? a.id - b.id : b.id - a.id)
    },
    infiniteScroll () {
      const target = this.$el.querySelector('.feeds--loading')
      const io = new IntersectionObserver((entries, observer) => {
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
