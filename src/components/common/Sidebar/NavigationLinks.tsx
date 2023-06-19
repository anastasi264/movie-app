
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { MdMonitor } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { BiGift } from "react-icons/bi";
import { BsFillCollectionPlayFill } from "react-icons/bs";

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
    title: "TV Shows",
    path: "/tv",
    icon: <MdMonitor />,
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
  },
  {
    title: "Watchlist",
    path: "/watchlist",
    icon: <BsFillCollectionPlayFill />,
  }
]
