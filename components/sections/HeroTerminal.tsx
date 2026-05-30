"use client";

import { Terminal } from "@/components/aceternity/terminal";
import type { HeroTerminalContent } from "@/types/content.types";

interface HeroTerminalProps {
  content: HeroTerminalContent;
}

export function HeroTerminal({ content }: HeroTerminalProps): React.ReactElement {
  return (
    <Terminal
      commands={content.commands}
      outputs={content.outputs}
      username={content.username}
      shell={content.shell}
      typingSpeed={content.typingSpeed}
      delayBetweenCommands={content.delayBetweenCommands}
      initialDelay={content.initialDelay}
      enableSound={content.enableSound}
      className="lg:pt-2"
    />
  );
}
