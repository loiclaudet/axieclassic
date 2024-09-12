import { IoChatbubblesOutline as ChatIcon } from "react-icons/io5";

export const Popover = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <button
        // @ts-expect-error new popover API
        popovertarget="status"
        popovertargetaction="toggle"
        className="bg-gradient-to-bl from-[hsl(227,12%,20%)] to-neutral-aside-dark shadow-[inset_1px_-1px_1px_0px_hsl(225,5%,31%)]"
      >
        <ChatIcon className="h-6 w-6 text-neutral-100" />
      </button>
      <div
        // @ts-expect-error new popover API
        popover="auto"
        id="status"
      >
        <div className="filtered">
          <div className="content bg-neutral-aside-dark"></div>
          <div className="blob bg-gradient-to-tr from-[hsl(227,12%,20%)] to-neutral-aside-dark"></div>
        </div>
        <div className="unfiltered">
          <div className="content bg-gradient-to-tr from-[hsl(227,12%,20%)] to-neutral-aside-dark shadow-[inset_-1px_1px_1px_0px_hsl(225,5%,31%)]">
            {children}
          </div>
          <button
            // @ts-expect-error new popover API
            popovertarget="status"
            popovertargetaction="toggle"
            className="blob bg-gradient-to-bl from-[hsl(227,12%,20%)] to-neutral-aside-dark shadow-[inset_1px_-1px_1px_0px_hsl(225,5%,31%)]"
          >
            <ChatIcon className="h-6 w-6 text-neutral-100" />
          </button>
        </div>
      </div>
      <svg
        id="filter"
        width="0"
        height="0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              id="blur"
              result="blurred"
              in="SourceGraphic"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              id="adjust"
              result="adjusted"
              in="blurred"
              values="
       1 0 0 0 0
       0 1 0 0 0
       0 0 1 0 0
       0 0 0 24 -10
    "
              type="matrix"
            ></feColorMatrix>
            <feComposite
              id="combine"
              result="combined"
              in="adjusted"
              operator="atop"
            ></feComposite>
          </filter>
        </defs>
      </svg>
    </>
  );
};
