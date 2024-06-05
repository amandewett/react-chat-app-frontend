import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import ChatHeaderContainer from "./ChatHeaderContainer";

const ChatHeader = () => {
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    latest >= 200 ? setIsSticky(true) : setIsSticky(false);
  });

  return (
    <>
      <header className="h-16 bg-white drop-shadow-lg flex items-center justify-center relative z-10">
        <ChatHeaderContainer />
      </header>
      <motion.header
        className={`h-14 bg-white drop-shadow-lg flex items-center justify-center relative ${isSticky ? "sticky top-0" : "hidden"}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isSticky ? 1 : 0, y: isSticky ? 0 : -10 }}
        transition={{ type: "spring", stiffness: 50, duration: 1 }}
      >
        <ChatHeaderContainer />
      </motion.header>
    </>
  );
};
export default ChatHeader;
