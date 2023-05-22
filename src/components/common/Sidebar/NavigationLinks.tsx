
import { MdOutlineExplore } from "react-icons/md";
// import { AiOutlineSchedule } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
// import { AiFillHeart } from "react-icons/ai";
// import { RiMovie2Fill } from "react-icons/ri";
// import { GiCeremonialMask } from "react-icons/gi";
import { MdMonitor } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { BiGift } from "react-icons/bi";
// import { IoNewspaperOutline } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";


export const navLinks = [ 
  {
    title: "Explore",
    path: "/explore",
    icon: <MdOutlineExplore />,
  },
  {
    title: "Movies",
    path: "/movies",
    icon: <BiCameraMovie />,

  },
  {
    title: "TV",
    path: "/tv",
    icon: <MdMonitor />,

  },
  {
    title: "Cartoons",
    path: "/cartoons",
    icon: <MdChildCare />,

  },
  {
    title: "Genres",
    path: "/genres",
    icon: <BiGift />,

  },
  {
    title: "Favourites",
    path: "/favourites",
    icon: <AiOutlineHeart />,
  }
]
