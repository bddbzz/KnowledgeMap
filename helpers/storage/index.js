import { Storage } from './storage'
export const $session = new Storage(window.sessionStorage)
export const $local = new Storage(window.localStorage)