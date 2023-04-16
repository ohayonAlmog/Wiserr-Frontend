import { httpService } from './http.service.js'

import { userService } from '../services/user.service.js'

import { store } from '../store/store.js'
//import { socketService } from './socket-service'

const ORDER_URL = 'order/'

/*;(() => {
  setTimeout(() => {
    socketService.on('new-order-seller', (order) => {
      store.commit({ type: 'saveOrder', order })
    })

    socketService.on('new-order-buyer', (order) => {
      store.commit({ type: 'saveOrder', order })
    })

    socketService.on('order-changed-status', (order) => {
      store.commit({ type: 'saveOrder', order })
    })
  }, 0)
})()*/

export const orderService = {
  save,
  query,
  getById,
  remove,
}
window.cs = orderService

async function query(filterBy) {
  console.log(filterBy)
  return httpService.get(ORDER_URL, filterBy)
}
async function getById(orderId) {
  return httpService.get(ORDER_URL + orderId)
}
async function remove(orderId) {
  await httpService.delete(ORDER_URL + orderId)
}
async function save(order) {
    console.log('order.service, save(), order:', order)
  var savedOrder
  if (order._id) {
    console.log('put')
    savedOrder = await httpService.put(ORDER_URL + order._id, order)
  } else {
    console.log('post')
    console.log(order)
    savedOrder = await httpService.post(ORDER_URL, order)
  }
  return savedOrder
}