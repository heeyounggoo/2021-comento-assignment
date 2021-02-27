export default {
  filters: {
    dateFormat (date) {
      return date.replace(/^(\d{4})-(\d{2})-(\d{2})(.*)/, '$1-$2-$3')
    }
  }
}
