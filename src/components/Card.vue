<template>
  <section class="card row" @click="$router.push({ name: 'Details', params: { id: item.id } })">
    <div class="col">
      <p class="desc">카테고리 아이템</p>
      <p class="desc">{{ item.id }}</p>
    </div>
    <div class="col">
      <p class="desc">{{ item.user_id }} | {{ item.created_at }}</p>
    </div>
    <div class="col">
      <h3>{{ item.title }}</h3>
      <p>{{ item.contents }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Card',
  props: {
    item: {
      required: true,
      type: Object
    },
    contents: {
      // required: true,
      type: Object
    }
  }
}
</script>
