<template>
  <div v-if="dialog" class="dialog dialog--wrapper col">
    <div class="row">
      <header class="dialog__header col">
        <h3>필터</h3>
        <button type="button" class="btn" @click="close"></button>
      </header>
      <div class="dialog__content col">
        <label
          v-for="(item, index) in items"
          :key="index"
          :label="item.name"
        >
          <input
            :value="item.id"
            type="checkbox"
            @input="handleCheckbox"
          />
          {{ item.name }}
        </label>
      </div>
      <div class="dialog__action col text-right">
        <button type="button" @click="emitSelected">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import dialog from '@/mixins/dialog'
import {
  mapState
} from 'vuex'
import {
  getItem,
  setItem
} from '@/mixins/stoarge'

export default {
  name: 'FilterDialog',
  mixins: [dialog],
  props: {
    dialog: {
      required: false,
      type: Boolean
    }
  },
  data () {
    return {
      selected: []
    }
  },
  computed: {
    ...mapState('feeds', {
      items: state => state.category
    })
  },
  watch: {
    dialog () {
      if (this.dialog) this.$nextTick(() => this.setSelected())
    }
  },
  methods: {
    handleCheckbox (event) {
      const value = event.target.value
      const checked = event.target.checked

      if (checked) this.selected.push(Number(value))
      else this.selected.splice(this.selected.indexOf(Number(value)), 1)
    },
    setSelected () {
      const selected = getItem('filter')
      this.selected = selected === 0 ? this.items.map(item => item.id) : selected

      this.selected.forEach(select => {
        const selected = this.items.find(item => item.id === Number(select)).name
        document.querySelector(`label[label="${selected}"] input`).checked = true
      })
    },
    emitSelected () {
      // TODO 아무것도 선택 안 할 때 안내처리
      setItem('filter', this.selected)
      this.$emit('select', this.selected)
      this.close()
    }
  }
}
</script>
