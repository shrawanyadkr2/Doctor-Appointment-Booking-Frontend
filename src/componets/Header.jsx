import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserMd,
  FaCalendarCheck,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { patient, logout } = useContext(AuthContext);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { to: "/", text: "Home", icon: <FaHome /> },
    { to: "/doctors", text: "Doctors", icon: <FaUserMd /> },
    { to: "/patient", text: "Appointments", icon: <FaCalendarCheck /> },
    { to: "/about", text: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <motion.section
      className="shadow-lg sticky top-0 z-50 bg-gradient-to-r from-emerald-50 to-sky-50 text-emerald-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="flex items-center"
            >
              <motion.div className="flex items-center">
               <h2 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
                  DOCBOOK
                </span>
              </h2>
                <motion.div
                  className="ml-2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FaUserMd className="text-2xl text-transparent bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500 bg-clip-text" />
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden  md:flex space-x-6 text-[17px] items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.to}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.to}
                  className="hover:text-sky-600 font-medium flex items-center gap-2 transition-colors"
                >
                  {item.icon}
                  {item.text}
                </Link>
              </motion.div>
            ))}
            {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
                  : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
              } transition-colors`}
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button> */}
            {patient ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full transition flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <FaSignOutAlt />
                Logout
              </motion.button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/join"
                  className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-2 rounded-full transition flex items-center gap-2 shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-sky-600"
                >
                  <FaSignInAlt />
                  Join Now
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div className="md:hidden" whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-600 focus:outline-none p-2 rounded-lg hover:bg-gradient-to-r hover:from-emerald-100 hover:to-sky-100 transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-emerald-50/80 to-sky-50/80 backdrop-blur-sm shadow-inner overflow-hidden"
          >
            <div className="flex flex-col w-full justify-center items-center px-4 text-lg font-medium py-3 space-y-3">
              {menuItems.map((item) => (
                <motion.div
                  key={item.to}
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.to}
                    className="text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-100/50 hover:to-sky-100/50 w-full p-3 rounded-lg flex items-center gap-3 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.text}
                  </Link>
                </motion.div>
              ))}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleDarkMode}
                className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? 'bg-gray-700 text-yellow-300'
                    : 'bg-sky-100 text-sky-700'
                } transition-colors`}
              >
                {isDarkMode ? (
                  <>
                    <FaSun size={20} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon size={20} />
                    <span>Dark Mode</span>
                  </>
                )}
              </motion.button> */}
              {patient ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 w-full text-white p-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                >
                  <FaSignOutAlt />
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Link
                    to="/join"
                    className="bg-gradient-to-r from-sky-500 to-sky-600 w-full text-white p-3 rounded-lg flex items-center justify-center gap-2 shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaSignInAlt />
                    Join Now
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Navbar;
