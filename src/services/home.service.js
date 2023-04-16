export const homeService = {
    getSlides,
    getCategories,
}
const slides=[
    {
      title: "Add talent to AI",
      content: "AI Artists",
      image:
        "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/f27bec553efc12cc60baed89b8f2223e-1674661140708/ai-artists-2x.png",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Build your beand",
      content: "Logo Design",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/tsjasljano86zfjpsyhb.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Customize your site",
      content: "WordPress",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/ptkrcbqnwyegt4pb1rv7.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Share your message ",
      content: "Voice Over",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793305/gigs/ksixpld6dq1amhahdibu.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Engage your audience",
      content: "Video Explainer",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/oxavedfug6zyrbjorika.jpg",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Reach more customers",
      content: "Social Media",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/rahdwdft5vutjezykopc.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Unlock growth online",
      content: "SEO",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/alhg6ir99obt8b1dhkvl.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Color your dreams",
      content: "Illustration",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/hbrjpedcyu8ytdhlbffm.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Go global",
      content: "Translation",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793611/gigs/ctvfjcpsnicackorfnoh.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Learn your business",
      content: "Data Entry",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/jezoetuwvxqzc115bria.webp",
      link: "http://localhost:5173/#/explore"
    },
    {
      title: "Showcase your story",
      content: "Book Covers",
      image:
        "https://res.cloudinary.com/dhsdxj3y3/image/upload/v1670793304/gigs/yd9pvpdsuwi6rmjfvvlj.webp",
      link: "http://localhost:5173/#/explore"
    }
  ]

const categories= [
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg",
      titleStr: "Graphics & Design",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/online-marketing.a3e9794.svg",
      titleStr: "Digital Marketing",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.a787f2f.svg",
      titleStr: "Writing & Translation",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.1356999.svg",
      titleStr: "Video & Animation",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.ede4c90.svg",
      titleStr: "Music & Audio",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming.6ee5a90.svg",
      titleStr: "Programming & Tech",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.fabc3a7.svg",
      titleStr: "Business",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lifestyle.112b348.svg",
      titleStr: "Lifestyle",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/data.855fe95.svg",
      titleStr: "Data",
      loading: "lazy"
    },
    {
      src:
        "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/photography.0cf5a3f.svg",
      titleStr: "Photography",
      loading: "lazy"
    }
  ]


function getSlides() {
    return slides
}
function getCategories() {
    return categories
}