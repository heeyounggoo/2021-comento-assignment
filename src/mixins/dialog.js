export default {
  data () {
    return {
    }
  },
  watch: {
    dialog () {
      const body = document.querySelector('body')

      if (this.dialog) {
        const overlay = document.createElement('div')
        overlay.className = 'overlay'
        body.insertBefore(overlay, document.querySelector('#app'))
        body.classList.add('hidden')
      } else {
        document.querySelector('.overlay').remove()
        body.classList.remove('hidden')
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:dialog', false)
    }
  }
}
