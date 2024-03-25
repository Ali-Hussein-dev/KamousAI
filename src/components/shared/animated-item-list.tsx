import { motion,type MotionProps } from "framer-motion";

type AnimatedItemList = {
  children: React.ReactNode;
} & MotionProps & React.HTMLAttributes<HTMLDivElement>;
//======================================
export const AnimatedItemList: React.FC<AnimatedItemList> = ({
  children,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 1, height: "auto" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, scale: 0, transition: { duration: 0.4 } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
