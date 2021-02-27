<template>
  <div class="filter dialog dialog--wrapper">
    <div class="dialog--contents">
      <header class="dialog__header">
        <h3>필터</h3>
      </header>
      <div class="dialog__text">
        <label
          v-for="(item, index) in items"
          :key="index"
          :label="item.name"
        >
          <input
            :value="item.id"
            type="checkbox"/>
        </label>
      </div>
      <div class="dialog__action">
        <button type="button" @click="saveCategory">저장하기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    items: {
      required: true,
      type: Array
    }
  },
  methods: {
    saveCategory () {}
  }
}
</script>
