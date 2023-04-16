// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'order'

export const orderService = {
  query,
  getById,
  save,
  remove,
//   getEmptyCar,
//   addCarMsg,
}
window.cs = orderService

async function query(filterBy = { by: null, user: null }) {
  return httpService.get(STORAGE_KEY, filterBy)

  // var orders = await storageService.query(STORAGE_KEY)
  // if (filterBy.by && filterBy.user) {
  //     let orderKey = filterBy.by
  //     orders = orders.filter(order => order[orderKey]._id === filterBy.user._id)
  // }
  // return orders
}
function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
  // return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
  await storageService.remove(STORAGE_KEY, orderId)
  // return httpService.delete(`order/${orderId}`)
}
async function save(order) {
  var savedOrder
  if (order._id) {
    savedOrder = await storageService.put(STORAGE_KEY, order)
    // savedOrder = await httpService.put(`order/${order._id}`, order)
  } else {
    // Later, owner is set by the backend
    // order.owner = userService.getLoggedinUser()
    savedOrder = await storageService.post(STORAGE_KEY, order)
    // savedOrder = await httpService.post('order', order)
  }
  return savedOrder
}

// async function addCarMsg(orderId, txt) {
//     const savedMsg = await httpService.post(`order/${orderId}/msg`, {txt})
//     return savedMsg
// }

// function getEmptyCar() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

;( () => {
  utilService.saveToStorage(STORAGE_KEY, [
    {
      _id: 'o1225',
      buyer: { _id: 'u101',
       fullname: 'Dudu Da',
       username: 'slepyz' ,
       imageUrl:"https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg"
      },
      seller: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz' },
      gig: {
        _id: 'g101',
        title: 'I will design amazing mascot, esports, youtube, and twitch logo',
        price: 25,
      },
      imageUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
      status: 'Pending',
      date: "3.3.2023",
    },
    {
      _id: 'o1223',
      buyer: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz',       imageUrl:"https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg"
    },
      seller: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz' },
      gig: {
        _id: 'g102',
        title: 'I will create animated explainer video in english or german',
        price: 100,
      },
      imageUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
      status: 'Rejected',
      date: "3.3.2023",

    },
    {
      _id: 'o1224',
      buyer: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz',       imageUrl:"https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg"
    },
      seller: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz' },
      gig: {
        _id: 'Gyg102Lk5',
        title: 'I will create animated explainer video in english or german',
        price: 100,
      },
      imageUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
      status: 'Rejected',
      date: "3.3.2023",

    },
    {
      _id: 'o1228',
      buyer: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz',       imageUrl:"https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg"
    },
      seller: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz' },
      gig: {
        _id: 'g100',
        title: 'I will design amazing mascot, esports, youtube, and twitch logo',
        price: 25,
      },
      imageUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
      status: 'Completed',
      date: "3.3.2023",

    },
    {
      _id: 'o1228',
      buyer: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz',       imageUrl:"https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg"
    },
      seller: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz' },
      gig: {
        _id: 'g100',
        title: 'I will design amazing mascot, esports, youtube, and twitch logo',
        price: 25,
      },
      imageUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
      status: 'Completed',
      date: "3.3.2023",

    },
    {
      _id: 'o1228',
      buyer: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz',       imageUrl:"https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg"
    },
      seller: { _id: 'u101', fullname: 'Dudu Da', username: 'slepyz' },
      gig: {
        _id: 'g100',
        title: 'I will design amazing mascot, esports, youtube, and twitch logo',
        price: 25,
      },
      imageUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
      status: 'Completed',
      date: "3.3.2023",

    },
  
  
  ])
})()
