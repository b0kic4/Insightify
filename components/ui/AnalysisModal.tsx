"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import LinearWithValueLabel from "./LinearProgress";

export default function AnalysisModal({ messages, progress }: any) {
  const [open, setOpen] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const completedMessage = messages.find(
      (message: any) =>
        message.type === "status" && message.content === "Analysis completed",
    );
    if (completedMessage) {
      setOpen(false);
    } else {
      setCurrentMessageIndex(messages.length - 1);
    }
  }, [messages]);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogOverlay className="fixed inset-0 bg-black opacity-30" />
      <DialogContent className="sm:max-w-[425px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="relative h-[200px] overflow-hidden flex flex-col items-center justify-center space-y-4">
          <AnimatePresence>
            {messages.map((message: any, index: any) =>
              index === currentMessageIndex ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center"
                >
                  {message.type === "status" && (
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {message.content}
                    </p>
                  )}
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </div>
        {progress > 0 && (
          <div className="flex items-center justify-center mt-4">
            <LinearWithValueLabel progress={progress} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
