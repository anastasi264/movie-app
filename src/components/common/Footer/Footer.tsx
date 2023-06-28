import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

export const Footer = () => {
  return (
    <footer className={`
      py-8 flex justify-end text-gray-400 items-center
      lg:py-5 sm:items-center sm:flex-col sm:gap-2
    `}>
      <div className="grow text-center md:text-start md:text-base">
        Copyright © 2023
      </div>

      <div className="media flex gap-3 text-2xl lg:text-xl">
        <a href="https://github.com/anastasi264">
          <BsGithub />
        </a>
        <a href="https://www.linkedin.com/in/anastasia-kolotnytska-27b354225/">
          <BsLinkedin />
        </a>
        <a href="https://www.facebook.com/nastya.kolotnytska">
          <BsFacebook />
        </a>
      </div>
    </footer>
  );
};
