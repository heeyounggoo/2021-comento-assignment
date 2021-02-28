import axios from 'axios'
import store from '@/store/'

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json'
  }
})

// loading
instance.interceptors.request.use(config => {
  store.dispatch('addLoading', config.url.replace(/\//, ''))
  return config
})

instance.interceptors.response.use(response => {
  store.dispatch('removeLoading', response.config.url.replace(/\//, ''))
  return response
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
