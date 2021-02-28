export default {
  data () {
    return {
    }
  },
  watch: {
    dialog () {
      if (this.dialog) {
        const overlay = document.createElement('div')
        overlay.className = 'overlay'
        document.querySelector('body').insertBefore(overlay, document.querySelector('#app'))
      } else {
        document.querySelector('.overlay').remove()
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:dialog', false)
    }
  }
}
