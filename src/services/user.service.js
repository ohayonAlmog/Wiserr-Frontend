import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { httpService } from './http.service'
// import { store } from '../store/store'
import { socketService } from './socket.service'
import { showSuccessMsg } from './event-bus.service'

const STORAGE_KEY = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  // changeScore
}

window.userService = userService

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

// function onUserUpdate(user) {
//     showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//     store.dispatch({ type: 'setWatchedUser', user })
// }

async function getById(userId) {
  // const user = await storageService.get('user', userId)
  const user = await httpService.get(`user/${userId}`)

  // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}
function remove(userId) {
  // return storageService.remove('user', userId)
  return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
  // const user = await storageService.get('user', _id)
  // let user = getById(_id)
  // user.score = score
  // await storageService.put('user', user)

  user = await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  
  console.log(userCred)
  // const users = await storageService.query('user')
  // const user = users.find(
  //   (user) =>
  //     user.username === userCred.userName && user.password === userCred.password
  // )
  // return saveLocalUser(user)
  try {
    // console.log(userCred)
    const user = await httpService.post('auth/login', userCred)
    // console.log(user)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
    return user
  }
  catch {
    console.log('failed to login')
  }
}

async function signup(userCred) {
  // userCred.score = 10000
  // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
  // const user = await storageService.post('user', userCred)
  const user = await httpService.post('auth/signup', userCred)
  // socketService.login(user._id)
  return saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }

function saveLocalUser(user) {
  user = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    username: user.username,
    password: user.password,
    // level: user.level,
    // slogan: user.slogan,
    // from: user.from,
    // since: user.since,
    // response: user.response,
    // lastDelivery: user.lastDelivery,
    // languages: user.languages,
    // brief: user.brief,
    // reviews: user.reviews /* , score: user.score */,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(() => {
//     utilService.saveToStorage(STORAGE_KEY,
//         [
//             {
//               _id: 'u101',
//               fullname: 'Dudu Da',
//               username: 'slepyz',
//               password: '1234',
//               level: 'Level 2 Seller',
//               imgUrl:
//                 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
//               slogan: 'Just Work And Create!!',
//               from: 'Indonesia',
//               since: 'Dec 2018',
//               response: '1 hour',
//               lastDelivery: 'about 3 hours',
//               languages: 'English',
//               brief: `Hi!, My Name is Dim... i've done many project.. especially illustration & logo... if you need any illustration just let me know... i'm here to help... Thanks!!`,
//               reviews: {
//                 average: 4.8,
//                 amount: 255,
//                 list: [
//                   {
//                     gig: {
//                       _id: 'g100',
//                       title:
//                         'I will design amazing mascot, esports, youtube, and twitch logo',
//                     },
//                     imgUrl:
//                       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/5a078b5e15df550ebc6c7a6e49ede0db-760800091659644050.7617579/51FA430B-40CE-44E0-811F-C7749EE65640',
//                     name: 'devitaparke',
//                     flagImgUrl:
//                       'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//                     country: 'United States',
//                     stars: 5,
//                     text: `EXCELLENT WORK! STELLAR CUSTOMER SERVICE! DETAIL ORIENTED, PATIENT,KIND, COURTEOUS, COMPASSIONATE AND MAJORLY UNDERSTANDING! Never made me feel like I was a bother or too needy! Always welcomed my feedback! Brought my vision to life! Im grateful!`,
//                     time: '1 month ago',
//                   },
//                   {
//                     gig: {
//                       _id: 'g101',
//                       title:
//                         'I will design stunning cartoon character and mascot logo design',
//                     },
//                     imgUrl:
//                       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/9a38e5c7a4192e64e456f8cc4c7e1a35-1675340939526/e3a622b8-c9e5-459e-a32b-87f47542f5b8.jpg',
//                     name: 'topdmagaewizard',
//                     flagImgUrl:
//                       'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//                     country: 'United States',
//                     stars: 5,
//                     text: `great price. Great communication. Great work. This seller was a joy to work with. Fair price for the time they put in. I really would recommend them. Thanks to them for their help on my project. Take care fiverr folks.`,
//                     time: '2 months ago',
//                   },
//                   {
//                     gig: {
//                       _id: 'g102',
//                       title: 'I will create professional logo design',
//                     },
//                     imgUrl:
//                       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/8366cc410d30241782c0eb7a35d7694b-1019364311672814333.36426/AC8DA537-7035-46F1-832B-AA47890F9041',
//                     name: 'justinfruge',
//                     flagImgUrl:
//                       'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//                     country: 'United States',
//                     stars: 5,
//                     text: `Excellent communication and brought exactly the idea I had to life! Can't thank this seller enough for their amazing work! Highly recommend! Thank you again`,
//                     time: '2 months ago',
//                   },
//                 ],
//               },
//             },
//             {
//               _id: 'u102',
//               fullname: 'Budu Ba',
//               username: 'hzngraphic',
//               password: '1234',
//               level: 'Level 2 Seller',
//               imgUrl:
//                 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/59c3441a4b65220a9ccd5133a135cf26-1664333732617/535c55ad-3805-453c-9668-e7cfad9d4533.jpg',
//               slogan: 'Solutions for all your creativity needs',
//               from: 'Sri Lanka',
//               since: 'Oct 2020',
//               response: '1 hour',
//               lastDelivery: 'about 13 minutes',
//               languages: 'Sinhala, Tamil, English',
//               brief: `Hello.! I'm Gayan,\nI'm a Graphic Professional With More Than 5 Years Experience.\nI Was Majoring In Graphic Design And Cartoon Designing.\nMy Specialized Areas Are Vector Art, Drawing, Cartoon And Illustrations.\nAll Fills Will Be Providing AI, EPS(Editable Source File), PDF, JPG, PNG, PSD With 100% Satisfaction. If You Want Any Kind Of Drawing Or Designing, I am Here To Provide My Service For You.\nContact Me, Share Your Ideas.\nI'm Very Passionate About My Work And Always Try To Do Best For My Customers.`,
//               reviews: {
//                 average: 3.8,
//                 amount: 166,
//                 list: [
//                   {
//                     gig: {
//                       _id: 'g103',
//                       title:
//                         'I will create animated explainer video in english or german',
//                     },
//                     imgUrl:
//                       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/48fbf6efb1d296f4aaf8f0f5eb3aab4f-1645411619027/99051a05-4d98-4da7-b2d8-cbc09b68596c.jpg',
//                     name: 'petenlckerson',
//                     flagImgUrl:
//                       'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//                     country: 'United States',
//                     stars: 5,
//                     text: `I am absolutely blown away with what hzngraphic came up with. This is amazing, and exactly what I had in mind. I truly don't have the words to describe how proud I am to call this my companies logo. If you are looking for amazing logo for your company, LOOK NO FURTHER. This is the designer you need`,
//                     time: '2 months ago',
//                   },
//                   {
//                     gig: {
//                       _id: 'g104',
//                       title:
//                         'I will write surfer SEO optimized articles with jarvis or jasper ai',
//                     },
//                     imgUrl:
//                       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b85aac4e1d52d2e6dfafc8ea3e100f18-1670277440854/1f32c6c7-789f-4d2c-ba06-1ed80614b2ee.png',
//                     name: 'cyntia_clark',
//                     flagImgUrl:
//                       'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//                     country: 'United States',
//                     stars: 5,
//                     text: `Awesome design!! Was better than I could have expected. Exactly what I wanted even though I didnt know what I wanted for sure! The first time I didnt need any revisions for something like this!! I highly recommend!!`,
//                     time: '2 months ago',
//                   },
//                   {
//                     gig: {
//                       _id: 'g105',
//                       title:
//                         'I will design wix website, redesign wix website or wix business website',
//                     },
//                     imgUrl:
//                       'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b731faedd0b1251322f080315f4ae4bf-1671917933378/b4ec666b-c334-4738-a124-2331d836e4c7.jpg',
//                     name: 'andersmadsen755',
//                     flagImgUrl:
//                       'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png',
//                     country: 'Denmark',
//                     stars: 5,
//                     text: `We got the best service, the artist just made an amazing job. We love the Logo we ended up with! We had 3 revisions, and hzngraphic listent to all we had to improve the artwork that we wanted! Thanks for the job :)`,
//                     time: '2 months ago',
//                   },
//                 ],
//               },
//             },
//           ]    
//     )
// })()
// await userService.signup({fullname: 'Muki G', username: 'muki', password:'123456'/* , score: 10000 */})