import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (value: string) => void;
}
export const EmojiPopover = ({
  children,
  onEmojiSelect,
  hint = "Emoji",
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onSelect = (value: EmojiClickData) => {
    onEmojiSelect(value.emoji);
    setPopoverOpen(false);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };
  return (
    <>
      <TooltipProvider>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <Tooltip
            open={tooltipOpen}
            onOpenChange={setTooltipOpen}
            delayDuration={50}
          >
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>{children}</TooltipTrigger>
            </PopoverTrigger>
            <TooltipContent className="bg-black text-white border border-white/5">
              <p className="text-xs font-medium">{hint}</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="p-0 w-full border-none shadow-none">
            <EmojiPicker onEmojiClick={onSelect} />
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    </>
  );
};
