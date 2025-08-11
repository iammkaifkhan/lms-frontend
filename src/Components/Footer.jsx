import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <>
      <footer className="relative left-0 bottom-0 py-5 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20 ">

        <section className="text-lg">
          © {year} Kaif Khan. All rights reserved.

        </section>

        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https://www.facebook.com/iammkaifkhan/" target="_blank" rel="noopener noreferrer">
            <BsFacebook />
          </a>
          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https://www.instagram.com/iammkaifkhan/" target="_blank" rel="noopener noreferrer">
            <BsInstagram />
          </a>
          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https://www.linkedin.com/in/iammkaifkhan/" target="_blank" rel="noopener noreferrer">
            <BsLinkedin />
          </a>
          <a className="hover:text-yellow-500 transition-all ease-in-out duration-300"
            href="https://www.x.com/iammkaifkhan/" target="_blank" rel="noopener noreferrer">
            <BsTwitter />
          </a>


        </section>

      </footer>
    </>
  )
}

export default Footer
