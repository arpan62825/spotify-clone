import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 sm:px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl sm:max-w-2xl"
      >
        <Card className="bg-[#181818] border border-white/5 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Icon */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5"
            >
              <AlertTriangle className="h-7 w-7 sm:h-8 sm:w-8 text-green-500" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white"
            >
              Page not found
            </motion.h1>

            {/* Copy */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-white/60 max-w-md"
            >
              The page you’re trying to reach doesn’t exist or has been moved.
              No disruption — we’ll reroute you smoothly.
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-2"
            >
              <Button
                onClick={() => navigate("/")}
                className="bg-green-500 hover:bg-green-600 text-black font-medium rounded-full px-6 w-full sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="text-white/70 hover:text-white w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </motion.div>

            {/* Auth Context */}
            <motion.div
              variants={itemVariants}
              className="pt-6 mt-4 border-t border-white/5 w-full"
            >
              <SignedIn>
                <p className="text-xs text-white/40 flex items-center justify-center gap-2">
                  <Music className="h-4 w-4" />
                  You’re signed in. Your library is intact.
                </p>
              </SignedIn>

              <SignedOut>
                <p className="text-xs text-white/40">
                  You’re browsing as a guest. Sign in for full access.
                </p>
              </SignedOut>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
