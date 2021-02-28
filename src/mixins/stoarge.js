export function setItem (key, value) {
  if (!key || !value) return false
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getItem (key) {
  if (!Object.prototype.hasOwnProperty.call(localStorage, key)) return false
  return JSON.parse(localStorage.getItem(key))
}
