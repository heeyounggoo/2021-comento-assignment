import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json'
  }
})

export default {
  methods: {
    api (methods, url, args) {
      const params = methods === 'get' ? Object.assign({}, { params: args.params || {} }) : args.parameter

      return instance[methods](url, params || {})
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          return Promise.reject(err.response.status)
        })
    }
  }
}
