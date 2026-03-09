import React from 'react'
import logo from '../../../assets/images/logo.webp'
import Image from 'next/image'
import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Footer = () => {
  return (
    <div>
      <footer className="mt-10">
        <div className="bg-slate-700  w-full py-8   px-auto  ">
          <div className="w-full p-4 grid grid-cols-3 container mx-auto">
            <div className="flex grow flex-col gap-4">
              <div className="pl-6">
                <Image src={logo} alt='logo image' width={100} height={100} />
              </div>
              <div>Copyright @ 2020 all rights reversed</div>
              <div className="pl-6 gap-3 flex">
                <a href="">
                  <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faLinkedinIn}></FontAwesomeIcon>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Company</h3>
                <a href="#" className="text-gray-300 hover:text-white">About Us</a>
                <a href="#" className="text-gray-300 hover:text-white">Careers</a>
                <a href="#" className="text-gray-300 hover:text-white">Blog</a>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Support</h3>
                <a href="#" className="text-gray-300 hover:text-white">Help Center</a>
                <a href="#" className="text-gray-300 hover:text-white">Contact Us</a>
                <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
              </div>
            </div>
            <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe to our Newsletter</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md bg-gray-700 border border-gray-600 text-white focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600">Subscribe</button>
          </div>
        </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer