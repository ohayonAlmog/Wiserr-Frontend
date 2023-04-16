import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gig'

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  addGigMsg,
}
window.cs = gigService

async function query(
  filterBy = {
    // title: '',
    // price: 0,
    // daysToMake: 0,
    // description: '',
    // budget: null,
    // seller: [],
    owner: {}
  }
) {
  var gigs = await storageService.query(STORAGE_KEY)
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, 'i')
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    )
  }
  /*if (filterBy.price !== 0) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.price)
  }*/
  if (filterBy.seller.length) {
    gigs = gigs.filter((gig) => {
      return filterBy.seller.includes(gig.owner.level)
    })
  }
  if (filterBy.budget) {
    gigs = gigs.filter(
      (gig) =>
        gig.price >= filterBy.budget.min && gig.price <= filterBy.budget.max
    )
  }
  if (filterBy.deliveryTime) {
    console.log(+filterBy.deliveryTime)
    gigs = gigs.filter((gig) => gig.daysToMake <= filterBy.deliveryTime)
  }
  return gigs
}

function getById(gigId) {
  let gig = storageService.get(STORAGE_KEY, gigId)
  return gig
}

async function remove(gigId) {
  await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
  var savedGig
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig)
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(STORAGE_KEY, gig)
  }
  return savedGig
}

async function addGigMsg(gigId, title) {
  // Later, this is all done by the backend
  const gig = await getById(gigId)
  if (!gig.msgs) gig.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    title,
  }
  gig.msgs.push(msg)
  await storageService.put(STORAGE_KEY, gig)

  return msg
}

function getEmptyGig(
  title = '',
  price = 100,
  daysToMake = 5,
  description = '',
  url = [],
  owner = {},
  reviews = {}
) {
  return {
    title,
    price,
    daysToMake,
    description,
    url,
    owner,
    reviews,
  }
}

// TEST DATA
;(() => {
  utilService.saveToStorage(STORAGE_KEY, [
    {
      _id: 'g100',
      title: 'I will design amazing mascot, esports, youtube, and twitch logo',
      price: 25,
      daysToMake: 5,
      description: `Hello There!!\nAre you looking for a logo for personal, business, team, or streaming?\nYou come to the right place.\n\nHere's My Service\n\n- Get a FREE SKETCH PREVIEW!! (feel free to send me a message, will send it in 24 hours or more depending on the count of orders, no major concept changes after the sketch are approved)\n- 100% Original Artwork, made from scratch.\n- HIRES Image, or any size you need.\n- Source File and Vector File PSD, Ai, Eps, SVG, YOU CHOOSE.\n- SATISFACTION.\n\nWhat is included in every Package?\nBasic Package:\n- Good Quality Logo\n- Hi-Res Logo, Png transparent, 4k Jpeg\n- PSD file\nStandard Package:\n- Awesome Quality Logo\n- Hi-Res Logo, Png transparent, 4k Jpeg\n- PSD file\nPremium Package:\n- Awesome Detailed Quality Logo\n- Hi-Res Logo, Png transparent, 4k Jpeg\n- PSD file, Vector File, Pdf, or any files you need.\n\nAvailable Extras:\n* Social media kit\n* Intro animation.\n\nIf anything is still unclear, feel free to hit the DM.\n\nSo Let's Go!!\nMake your Idea Come To Life.\nThank You!`,
      logoStyle: 'Cartoon',
      url: [
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/132579264/original/f30016318e7a85c72a17e94e3dd73cdb35604a4a/design-original-mascot-logo-for-twitch-youtube-shop-etc.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/132579264/original/ebe8397d6bbf3c9c671e56472c77789c2a83adb3.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/132579264/original/d47fa26e363d15011ccd4771e36bfe7bd496ea1a.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/3b155c09401145753ae7074419fe461a-1679415449/UPLOAD.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/d93f99da24ef06db93e6079023db8983-1679243813/UPLOAD.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/ce11055c93e2706d19eb8937723fd868-1679229605/UPLOAD.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/6143d4a881f2cda05c868ff054581781-1679211890/UPLOAD.jpg',
      ],
      owner: {
        _id: 'u101',
        fullname: 'Dudu Da',
        username: 'slepyz',
        level: 'Level 2 Seller',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
        slogan: 'Just Work And Create!!',
        from: 'Indonesia',
        since: 'Dec 2018',
        response: '1 hour',
        lastDelivery: 'about 3 hours',
        languages: 'English',
        brief: `Hi!, My Name is Dim... i've done many project.. especially illustration & logo... if you need any illustration just let me know... i'm here to help... Thanks!!`,
      },
    },
    {
      _id: 'g101',
      title: 'I will design stunning cartoon character and mascot logo design',
      price: 15,
      daysToMake: 4,
      description: `Hi there,\nAre you looking for a professional cartoon or mascot logo for your twitch, E-sport team, YouTube channel, gaming community, etc.?\n\nYou're In The Right Gig..!\n\nI'm a highly-skilled graphic designer with more than 5 years professional designing experience.\nI'll design a amazing best illustration cartoon or mascot logo for you like animal, person type, etc. I'll make your ideas become the best amazing mascot or cartoon logo .\nthis is 100% Original my own work. my first priority is your satisfaction.\n\nWhy You Should Choose Me?\n--------------------------------------\n01. On-Time Delivery\n02. Fresh Unique Ideas & Stunning Creativity\n03. 100% Vector Logo Design\n04. Easy And Fast Response\n05. Free Unlimited Revisions\n06. All Logos Are Unique No Stock Images\n07. High Resolution(300DPI) JPG And PNG Files\n08. Source/Vector Files (Ai/EPS)\n09. Able To Provide Any Style As per Reference\n10. 100% Money Back Guarantee\n\nI will do the best to make you satisfied.\nyour satisfied is my first goal and my motivation.\nbest regard.\n\n\nHZNgraphic.\nThank you.!`,
      logoStyle: 'Cartoon',
      url: [
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/184789459/original/0665d5ab1fbafe92a6fe39d19a3f6fec9ac88502.png',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/184789459/original/cf80334e78f170de4a46900bc418e64a0ee02816.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/184789459/original/d7fe0a6a4a578eb9a1fdf67201109f9e3b80788f.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/b93c9bf54550e6ba7b0e1423fd3bd18e-1679390325/Display%20Mockup.png',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/beaa36658847adbb1a6d90d4837d93fa-1679307074/Display%20Mockup.png',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/ba744361dfb475a49bba6072f3a8e7f6-1679204451/Display%20Mockup.png',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/7b33ccec10dc7c2e739587628aa1c3c5-1679081645/DISPLY%20MOCKUP.png',
      ],
      owner: {
        _id: 'u101',
        fullname: 'Dudu Da',
        username: 'slepyz',
        level: 'Level 2 Seller',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
        slogan: 'Solutions for all your creativity needs',
        from: 'Sri Lanka',
        since: 'Oct 2020',
        response: '1 hour',
        lastDelivery: 'about 13 minutes',
        languages: 'Sinhala, Tamil, English',
        brief: `Hello.! I'm Gayan,\nI'm a Graphic Professional With More Than 5 Years Experience.\nI Was Majoring In Graphic Design And Cartoon Designing.\nMy Specialized Areas Are Vector Art, Drawing, Cartoon And Illustrations.\nAll Fills Will Be Providing AI, EPS(Editable Source File), PDF, JPG, PNG, PSD With 100% Satisfaction. If You Want Any Kind Of Drawing Or Designing, I am Here To Provide My Service For You.\nContact Me, Share Your Ideas.\nI'm Very Passionate About My Work And Always Try To Do Best For My Customers.`,
      },
    },
    {
      _id: 'g102',
      title: 'I will create professional logo design',
      price: 10,
      daysToMake: 2,
      description: `Are you looking for a modern minimalist and luxury logo design for your brand or company?\nYou are just at the right spot.\nI will create a 100% custom made modern minimalist and luxury logo design by using my skills.\nWhy me?\n* Reliable and quick communication\n* Unlimited revisions\n* Unique and high quality logo design\n* 24 hours customer support\n* superb aftercare\n\nMy expertise:\nMinimalist/ Modern/ Feminine/ Signature/ Minimal/ Professional/ Text/ Vintage/ Custom logo\nPlease feel free to contact me for any questions.\nThank you for your time and looking forward to working with you.`,
      logoStyle: 'Minimalist',
      url: [
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/254903688/original/359ddbaae11d5628bb5dc447fcae27c2f712fc70.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs2/254903688/original/e025510bd0671c3482b1bf668994941c27aa7ae3.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs3/254903688/original/8801d715cdc500a869a2c7e2aa198596cba96532.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/005313f9027fc1cedbaf6519af73d99e-1679470425/Preview.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/9faea58d9014eb12a4148bb9a19c60d6-1679440112/Design%20A.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/5c71a1727aad47335de476b574b97ad7-1679430943/JPG%20File%20A.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/56c8664979ece9443c020ecf98181041-1679427226/Design%20A.jpg',
        'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/727175ad1b8ab4c627b6be2819e2bf2d-1679421548/JPG%20File.jpg',
      ],
      owner: {
        _id: 'u101',
        fullname: 'Dudu Da',
        username: 'slepyz',
        level: 'Level 2 Seller',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/97e0facefc9a62acdd40efca7f214384-1630943665431/dbf54aee-fe81-411b-811d-dc51dbf51425.jpg',
        slogan: 'Logo and Brand Design Expert',
        from: 'Sri Lanka',
        since: 'Dec 2022',
        response: '1 hour',
        lastDelivery: 'about 2 hours',
        languages: 'English',
        brief: `Hello,\nI am a professional graphic designer with more than 7 years of experience.\nI have completed a degree in marketing management and a diploma in graphic designing.\nI am here to provide my services on fiverr. My style is simple, recognizable and minimalist.`,
      },
    },
    {
      _id: 'g103',
      title: 'I will create animated explainer video in english or german',
      price: 100,
      daysToMake: 14,
      description: `As a TOP RATED SELLER, we are here to help you with awesome explainer videos.\nIf you are looking for quality and affordability, we will give your company a marketing video that has a SIGNATURE LOOK!!!\n****Sie können mir gerne in Deutsch schreiben****\nWHY BUY FROM US?\nWe will handle all elements of your video creation. We personally handle script writing ( if you don't have one, with an extra cost ), voiceover, animations, and editing. This ensures quality and makes edits easier.\n We are working FULL TIME here on Fiverr and this means better service & better communication!\nWe have a LONG reputation for delivering quality work ON TIME and keeping our word. Just read our reviews.\nWork samples https://goo.gl/oifCEA\nBefore ordering please send us your script for a quick review to ensure we can deliver a fantastic explainer video! \nDon't have a script, no problem. We have an extra service for scriptwriting.\nOur Packages include :\nCharacter & Scene Creation\nProfessional Voice Over (Male or Female)\nSync your own Voice Over\nBackground Music\nImplementation of your Logo and URL\nUNLIMITED REVISIONS\nFull HD 1080p\nWe can create your video also in SOCIAL MEDIA formats. SQUARE&VERTICAL`,
      logoStyle: 'Minimalist',
      url: [
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/60196844/original/4192d0da331d499c4562288175f3c855764e5c32/create-2d-animated-explainer-video.png',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/60196844/original/782d20f87d1db2dad85b402c565446e51cfa3a70/create-2d-animated-explainer-video.png',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/60196844/original/b3526e60f6156dff3edc1efd7d48e1ab40e9ceaf/create-2d-animated-explainer-video.png',
      ],
      owner: {
        _id: 'u102',
        fullname: 'Budu Ba',
        username: 'hzngraphic',
        level: 'Level 2 Seller',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/59c3441a4b65220a9ccd5133a135cf26-1664333732617/535c55ad-3805-453c-9668-e7cfad9d4533.jpg',
        slogan: 'Professional 2d Animation Designer',
        from: 'Turkey',
        since: 'Aug 2014',
        response: '5 hour',
        lastDelivery: 'about 4 hours',
        languages: 'English',
        brief: `Hello Fiverr People.\nWe are a 360 web agency of 6 hardworking workaholics.\nFrom Explainer Videos to SEO services.\nThis is our full-time job. We will be happy to help you with your projects.\nFEEL FREE TO CONTACT US.\nCOME AS A CUSTOMER, STAY AS A FRIEND`,
      },
    },
    {
      _id: 'g104',
      title:
        'I will write surfer SEO optimized articles with jarvis or jasper ai',
      price: 10,
      daysToMake: 2,
      description: `Hey Buddies, I'm your Friendly Jasper ai (Formally Jarvis) writer!\nYou want to rank high on Google, but don't have the time or resources to write quality SEO optimized articles.\nRanking high on Google is essential for any business looking to attract more customers online. But writing quality articles can be incredibly time consuming and difficult.\nLet me take care of it for you. I can write SEO optimized articles that will help you rank higher on Google and attract more customers.\nI do it all with the help of jarvis or jasper ai and Surfer, so you can be sure that your articles are of the highest quality.\nMy Services includes:\nUpto 3000 words\nJasper ai (Formally Jarvis) assisted articles\nHigh Quality and Well Researched Content\nQuick Turnaround time\n100% Grammarly Passed\nSurfer SEO Optimized (Score above 75)\nAnd Much More..!\nI've 2 years experience on writing on Tech & Finance niche. By the way, I can write on any niche.\nIf you're interested in my services, please don't hesitate to contact me. I'll be more than happy to discuss your needs and see how I can help you.\nThank you for your time.`,
      logoStyle: 'Minimalist',
      url: [
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/232547419/original/892c0c0e81e19a09ccb05ebf901a357098e3f491/write-seo-friendly-article-using-jarvis-ai.png',
        'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/2c576d31a941c57a35485134b9f84743-1678956411/jasper%20AI%20Surfer%20SEo/write-seo-friendly-article-using-jarvis-ai.jpg',
        'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/a2583246bf3e131f8c1a2c39c90846cc-1678120452/Surfer%20SEO/write-seo-friendly-article-using-jarvis-ai.jpg',
        'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/8ed693e984b9d47638ef8dad4da785c6-1677783916/Surfer/write-seo-friendly-article-using-jarvis-ai.jpeg',
        'https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/0a6fcfedda5a708625ae9cbcf6389cc6-1677495655/Surfer%20SEO%20Jasper%20Ai%20Jarvis%20Ai/write-seo-friendly-article-using-jarvis-ai.jpg',
      ],
      owner: {
        _id: 'u102',
        fullname: 'Budu Ba',
        username: 'hzngraphic',
        level: 'Level 2 Seller',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/59c3441a4b65220a9ccd5133a135cf26-1664333732617/535c55ad-3805-453c-9668-e7cfad9d4533.jpg',
        slogan: 'Satisfaction and Quality is my Priority!',
        from: 'Pakistan',
        since: 'Feb 2021',
        response: '1 hour',
        lastDelivery: 'about 4 hours',
        languages: 'Urdu, English',
        brief: `Hi Guys,\nI am Ayan, and I love working with people. I have a lot of experience in the field of Blogging & SEO, and I like to help others grow their businesses through my expertise.\nI'm also passionate about Digital Marketing, and I'm always eager to learn new skills and technologies that will allow me to serve my clients better. My goal is to provide top-notch services that are tailored according to my clients' needs.D`,
      },
    },
    {
      _id: 'g105',
      title:
        'I will design wix website, redesign wix website or wix business website',
      price: 80,
      daysToMake: 2,
      description: `Are You Looking for a Professional website designer for your Business?\nso you reached the right gig I will design Wix Website for You.\nI can make an online platform for your business that should be mobile responsive and optimized at a reasonable price.\nServices include:\nCreate Wix Website\nRedesign Wix website\n Add Latest Features to Your Wix design\nWix eCommerce Store / Wix Online Store\nWix Onpage SEO\nMobile Responsive Design / Mobile Friendly\nWix Online Booking site\nWix Events site\nWix website Redesign\nWhy Chose Me?\nWix Expert\nHigh-Quality Work\nOn-time Delivery\n100% Refund Policy\nIf you have any questions just leave a message....!\nIf the above packages/Prices are out of budget? Please feel free to contact me and negotiate. Just inbox me with your work details, I'll get back to your ASAP.\n Thank you for your time.`,
      logoStyle: 'Minimalist',
      url: [
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/195034142/original/b6d69783597f391afe098a2179ec7b7f74ec9b2d/do-professional-website-design-website-redesign-business-wix-website.jpg',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/195034142/original/1a6795d0a7f13e5caf8d61d1cfd96f5fd3ec0b41/do-professional-website-design-website-redesign-business-wix-website.png',
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/195034142/original/2a3740f4801356c70a8013c72da49283f56507c8/do-professional-website-design-website-redesign-business-wix-website.png',
        'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20221004/QWQ%20Cash_aszq7m.jpg',
        'https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20221004/Geeksblock%20New_reiker.jpg',
      ],
      owner: {
        _id: 'u102',
        fullname: 'Budu Ba',
        username: 'hzngraphic',
        level: 'Level 2 Seller',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/59c3441a4b65220a9ccd5133a135cf26-1664333732617/535c55ad-3805-453c-9668-e7cfad9d4533.jpg',
        slogan: 'competent to assist you in your business endeavors',
        from: 'United Arab Emirates',
        since: 'May 2020',
        response: '1 hour',
        lastDelivery: 'about 18 hours',
        languages: 'English, Arabic, Turkish, Urdu',
        brief: `HHi there I've held the position of managing partner of two distinct businesses for the past five years, starting with one that offers a variety of business consulting services and another that is a digital agency. Since I've been in charge of a digital agency, I've assisted over 300 companies in maximizing their online visibility. In the other More than 200 of my clients have benefited from our expertise in the business consulting field, as We have written business plans that have resulted in the acquisition of much needed loans and investments. We wish to shed light on other people's Lives.`,
      },
    },
  ])
})()

// reviews: {
//   average: 3.8,
//   amount: 166,
//   list: [
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/48fbf6efb1d296f4aaf8f0f5eb3aab4f-1645411619027/99051a05-4d98-4da7-b2d8-cbc09b68596c.jpg',
//       name: 'petenlckerson',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `I am absolutely blown away with what hzngraphic came up with. This is amazing, and exactly what I had in mind. I truly don't have the words to describe how proud I am to call this my companies logo. If you are looking for amazing logo for your company, LOOK NO FURTHER. This is the designer you need`,
//       time: '2 months ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b85aac4e1d52d2e6dfafc8ea3e100f18-1670277440854/1f32c6c7-789f-4d2c-ba06-1ed80614b2ee.png',
//       name: 'cyntia_clark',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `Awesome design!! Was better than I could have expected. Exactly what I wanted even though I didnt know what I wanted for sure! The first time I didnt need any revisions for something like this!! I highly recommend!!`,
//       time: '2 months ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/b731faedd0b1251322f080315f4ae4bf-1671917933378/b4ec666b-c334-4738-a124-2331d836e4c7.jpg',
//       name: 'andersmadsen755',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png',
//       country: 'Denmark',
//       stars: 5,
//       text: `We got the best service, the artist just made an amazing job. We love the Logo we ended up with! We had 3 revisions, and hzngraphic listent to all we had to improve the artwork that we wanted! Thanks for the job :)`,
//       time: '2 months ago',
//     },
//   ],
// },
// reviews: {
//   average: 5.0,
//   amount: 1585,
//   list: [
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2ab4482f5bb69cc942c86e8901f7d8fb-1343398581663342050.030801/D6DDE3E7-BD55-45EA-A242-BC8F6BCA8FA9',
//       name: 'terezfirewoman',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `It was a pleasure. Mostafa was very responsive and went above and beyond to ensure the mobile view of my Wix site page was clean and functional - which is no easy feat, as the mobile version of the Wix platform can be extremely difficult to sort out. Thank you, Mostafa, for a job well done! More work is coming your way soon! `,
//       time: '1 month ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/4d3d492787c30b21199f6367d678efe8-1628036902463/0b9a3480-552d-4534-b165-035a560ff891.png',
//       name: 'rajtank1',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1ea.png',
//       country: 'United States',
//       stars: 5,
//       text: `Massive amount of patience and extremely attentive. Listened to everything that I wanted. Great working with these guys again. Thank you and I'll be back :)`,
//       time: '1 month ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/1402ba95f8e6ff5e024fc549e3a0a8fd-1640715127363/a2de2874-3291-4ebf-bd16-aecf64d548b9.png',
//       name: 'jncampbell08',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png',
//       country: 'Spain',
//       stars: 5,
//       text: `An outstanding experience. The seller is very professional, the service was first-class and the work product was excellent. I was very impressed with the Sellers flexibility and willingness to provide me with what I wanted, I have no hesitation in recommending.`,
//       time: '1 week ago',
//     },
//   ],
// },
// reviews: {
//   average: 5.0,
//   amount: 1585,
//   list: [
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2ab4482f5bb69cc942c86e8901f7d8fb-1343398581663342050.030801/D6DDE3E7-BD55-45EA-A242-BC8F6BCA8FA9',
//       name: 'topazg',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `Third project. Excellent work. Dozens of more projects are in the pipeline with him. He fully understand SurferSEO and Jarvis and really want you are buying is the quality of SurferSEO's grading system. If you believe the score, Ayan is your guy. What more can I say?`,
//       time: '1 week ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/4d3d492787c30b21199f6367d678efe8-1628036902463/0b9a3480-552d-4534-b165-035a560ff891.png',
//       name: 'topazg',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `Ayan is crushing it for me. Right now my little secret but not for long. He is my go-to person for jasper/surferseo. Give him a shot! Highly recommend. Always very responsive and helpful with any issues I have had. Couldn't ask for better service! Ayan is the man.`,
//       time: '1 month ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/1402ba95f8e6ff5e024fc549e3a0a8fd-1640715127363/a2de2874-3291-4ebf-bd16-aecf64d548b9.png',
//       name: 'theotucker94',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ea-1f1f8.png',
//       country: 'Spain',
//       stars: 4.3,
//       text: `The article was good overall, it just needed a few corrections. However, it took longer than expected for the review.`,
//       time: '3 weeks ago',
//     },
//   ],
// },
// reviews: {
//   average: 5.0,
//   amount: 1585,
//   list: [
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2ab4482f5bb69cc942c86e8901f7d8fb-1343398581663342050.030801/D6DDE3E7-BD55-45EA-A242-BC8F6BCA8FA9',
//       name: 'popupdatez',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `I was blown away by the quality of the final product. He really understood my vision and was able to bring it to life in a way that was engaging, informative, and fun. He was professional, responsive, and easy to work with. The animation itself was top-notch, with vibrant colors, smooth transitions, and attention to detail that really brought the characters and scenes to life. The voiceover and sound effects were also spot on!! 0/10`,
//       time: '1 week ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/4d3d492787c30b21199f6367d678efe8-1628036902463/0b9a3480-552d-4534-b165-035a560ff891.png',
//       name: 'zafer08',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png',
//       country: 'Switzerland',
//       stars: 5,
//       text: `Thank you for making this so easy for me. I really liked your ideas and additions which made my explainer video even better. I can fully recommend your work! Also got many feedback from friends which love this video. Thank you!`,
//       time: '1 month ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/beac2b6a19c046066547920070192142-1665523079929/06a48e9f-b4db-4af5-9057-054f1d13e7ba.png',
//       name: 'theotucker94',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//       country: 'United Kingdom',
//       stars: 5,
//       text: `In terms of quality, responsiveness, professionalism and customer service, you will struggle to find a better animator across Fiverr. Both gigs were exactly as required, highly recommended. We will continue to work with skotiskoti in the future :)`,
//       time: '2 months ago',
//     },
//   ],
// },
// reviews: {
//   average: 4.2,
//   amount: 568,
//   list: [
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/113938b95b26a5a73320e539c4187dd1-1678947096108/4b2a6999-8624-4cbd-945c-92d752d8f58f.jpg',
//       name: 'sierra_olson',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png',
//       country: 'Germany',
//       stars: 5,
//       text: `Words can't explain how amazingly obsessed I am with the finished design, almost cried tears of joy! 10/10 Recommend. Absolutely amazing!`,
//       time: '5 days ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/4d3d492787c30b21199f6367d678efe8-1628036902463/0b9a3480-552d-4534-b165-035a560ff891.png',
//       name: 'cornellbartell',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `Absolutely perfect logo. This is my first time using Fiverr. He is pretty picky when it comes to logos. Especially the font and color. Overall I am absolutely thrilled. Excellent work and I would highly recommend.`,
//       time: '5 days ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/beac2b6a19c046066547920070192142-1665523079929/06a48e9f-b4db-4af5-9057-054f1d13e7ba.png',
//       name: 'u_9bb2472aff7f',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ff-1f1e6.png',
//       country: 'South Africa',
//       stars: 5,
//       text: `Liana's professionalism and expertise were evident from the start, as she took the time to listen to my ideas and understand my vision for the logo. She provided me with several design options, and each one was creative, well thought-out, and perfectly captured the essence of my brand. Liana was also incredibly responsive and communicative throughout the entire process, making sure that I was completely satisfied with the final design. I highly recommend Liana's services to anyone looking for`,
//       time: '4 weeks ago',
//     },
//   ],
// },
// reviews: {
//   average: 4.8,
//   amount: 255,
//   list: [
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/5a078b5e15df550ebc6c7a6e49ede0db-760800091659644050.7617579/51FA430B-40CE-44E0-811F-C7749EE65640',
//       name: 'devitaparke',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `EXCELLENT WORK! STELLAR CUSTOMER SERVICE! DETAIL ORIENTED, PATIENT,KIND, COURTEOUS, COMPASSIONATE AND MAJORLY UNDERSTANDING! Never made me feel like I was a bother or too needy! Always welcomed my feedback! Brought my vision to life! Im grateful!`,
//       time: '1 month ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/9a38e5c7a4192e64e456f8cc4c7e1a35-1675340939526/e3a622b8-c9e5-459e-a32b-87f47542f5b8.jpg',
//       name: 'topdmagaewizard',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `great price. Great communication. Great work. This seller was a joy to work with. Fair price for the time they put in. I really would recommend them. Thanks to them for their help on my project. Take care fiverr folks.`,
//       time: '2 months ago',
//     },
//     {
//       imgUrl:
//         'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/8366cc410d30241782c0eb7a35d7694b-1019364311672814333.36426/AC8DA537-7035-46F1-832B-AA47890F9041',
//       name: 'justinfruge',
//       flagImgUrl:
//         'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//       country: 'United States',
//       stars: 5,
//       text: `Excellent communication and brought exactly the idea I had to life! Can't thank this seller enough for their amazing work! Highly recommend! Thank you again`,
//       time: '2 months ago',
//     },
//   ],
// },