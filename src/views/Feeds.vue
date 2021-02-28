<template>
  <div class="feeds row">
    <div class="feeds__filter col">
      <button type="button" class="btn sort asc active" @click="sortList('asc')">오름차순</button>
      <button type="button" class="btn sort desc" @click="sortList('desc')">내림차순</button>
      <button type="button" class="btn btn--outlined btn--small text--gray" @click="openDialog">필터</button>
    </div>
    <div class="feeds__cards col">
      <template v-for="(item, index) in list">
        <card
          v-if="adList[index/3 - 1]"
          :key="`ad-card-${index}`"
          :options="{ footer: false }"
          :item="adList[index/3 - 1]"
          class="feeds__cards--ad ellipsis"
        >
          <template v-slot:header>
            <p class="desc">sponsored</p>
          </template>
          <template v-slot:contents="{ card }">
            <div class="row no-gutters">
              <div class="col cols-12 cols-md-4">
                <img :src="`https://cdn.comento.kr/assignment/${card.img}`" alt="ad-img">
              </div>
              <div class="col cols-12 cols-md-8">
                <h3>{{ card.title }}</h3>
                <p>{{ card.contents }}</p>
              </div>
            </div>
          </template>
        </card>
        <card
          :key="`card-${index}`"
          :options="{ footer: false }"
          :to="{ name: 'Details', params: { id: item.id } }"
          :item="item"
          class="ellipsis"
        >
          <template v-slot:header>
            <div class="row no-gutters">
              <div class="col header pb-3">
                <p class="desc">{{ categoryName(item.category_id) }}</p>
                <p class="desc">{{ item.id }}</p>
              </div>
              <div class="col sub-header pt-3">
                <p class="desc"><span class="text--primary">{{ item.user_id }}</span> <span class="text--black">| {{ item.created_at | dateFormat }}</span></p>
              </div>
            </div>
          </template>
        </card>
      </template>
    </div>
    <div v-show="$store.getters.loading" class="feeds__loading"></div>
    <filter-dialog
      :dialog.sync="dialog"
      @select="filterList"
    ></filter-dialog>
  </div>
</template>

<script>
import api from '@/mixins/api'
import util from '@/mixins/util'
import Card from '@/components/Card'
import FilterDialog from '@/components/dialog/FilterDialog'
import {
  mapState,
  mapActions
} from 'vuex'
import {
  getItem
} from '@/mixins/stoarge'

export default {
  name: 'Feeds',
  components: { Card, FilterDialog },
  mixins: [api, util],
  data () {
    return {
      dialog: false,

      list: [],
      adList: [],
      filteredCategory: []
    }
  },
  computed: {
    ...mapState('feeds', [
      'params',
      'category'
    ]),
    categoryName () {
      return (categoryId) => {
        return this.category.find(item => item.id === categoryId).name
      }
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    ...mapActions([
      'updateParams',
      'updateCategory'
    ]),
    getCategory () {
      this.api('get', '/category', { assignTarget: 'category' })
        .then((data) => {
          this.updateCategory(data.category)
          this.getFilteredCategory()
          this.getList()
          this.infiniteScroll()
        })
    },
    getList (type) {
      this.api('get', '/list', { params: this.params })
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
    getFilteredCategory () {
      const filtered = getItem('filter')
      this.updateParams({
        category: filtered && filtered.length > 0 ? filtered : this.category.map(item => item.id)
      })
    },
    filterList (selected) {
      this.updateParams({ category: selected.length === 0 ? this.category.map(item => item.id) : selected })
      this.getList('filter')
    },
    sortList (order) {
      this.updateParams({ ord: order })
      this.$el.querySelector(`.${order}`).classList.add('active')
      this.$el.querySelector(`.${order === 'asc' ? 'desc' : 'asc'}`).classList.remove('active')
      this.list.sort((a, b) => order === 'asc' ? a.id - b.id : b.id - a.id)
    },
    infiniteScroll () {
      const target = this.$el.querySelector('.feeds__loading')
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          const isEmptyList = JSON.parse(JSON.stringify(this.list)).length === 0
          if (entry.isIntersecting && !isEmptyList) {
            this.updateParams({ page: this.page + 1 })
            this.getList()
          }
        })
      }, {
        threshold: 0.3
      })

      if (target) io.observe(target)
    },
    openDialog (event) {
      event.target.blur()
      this.dialog = true
    }
  }
}
</script>
