"use client";

;(function forceNonPassive() {
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) {
    if (type === "touchmove" || type === "wheel") {
      // If they didn’t explicitly set passive:false, override it:
      if (!options || typeof options === "boolean") {
        options = { passive: false, capture: !!options };
      } else {
        options = { ...options, passive: false };
      }
    }
    return orig.call(this, type, listener, options);
  };
})();

import ReactFullpage from "@fullpage/react-fullpage";
import { gsap } from "gsap";
import React from "react";

import { CustomEase } from "gsap/CustomEase";

const opts = {
    autoScrolling: true,
    scrollOverflow: false,
    scrollHorizontally: false,
    fixedElements: ".background",
    navigation: false,
    navigationPosition: "left",
    scrollingSpeed: 1300,
    easingcss3: "cubic-bezier(.70,0,.30,1)",
    anchors: ["first", "second", "third", "fourth", "fifth", "sixth"],
    licenseKey: "gplv3-license",
    credits: {
        enabled: false,
    },
};

const FullpageProviderWork = ({ children }: { children: React.ReactNode }) => {
    const onLeave = function (index: any, nextIndex: any, direction: any) {
        // console.log(nextIndex.index);

        if (direction == "down") {
            gsap
                .timeline()
                .from(`.s${nextIndex.index} .anime`, {
                    duration: 0.3,
                })
                .fromTo(
                    `.s${nextIndex.index} .anime`,
                    {
                        y: "30vh",
                    },
                    {
                        y: "0vh",
                        duration: 1.1,
                        stagger: 0.03,
                        ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
                    },
                );
        } else {
            gsap
                .timeline()
                .from(`.s${nextIndex.index} .anime`, {
                    duration: 0.3,
                })
                .fromTo(
                    `.s${nextIndex.index} .anime`,
                    {
                        y: "-30vh",
                    },
                    {
                        y: "0vh",
                        duration: 1.1,
                        stagger: -0.03,
                        ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
                    },
                );
        }

        var flex = screen.width > 540 ? 17 : 5;
        if (direction == "down") {
            console.log();

            gsap
                .timeline()
                .from(`.s${nextIndex.index} .rounded__div__down`, {
                    duration: 0.1,
                })
                .fromTo(
                    `.s${nextIndex.index} .rounded__div__down`,
                    {
                        height: `${flex}vh`,
                    },
                    {
                        height: "0vh",
                        duration: 1.2,
                        ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
                    },
                );
        } else {
            gsap
                .timeline()
                .from(`.s${nextIndex.index} .rounded__div__up`, {
                    duration: 0.1,
                })
                .fromTo(
                    `.s${nextIndex.index} .rounded__div__up`,
                    {
                        height: `${flex}vh`,
                    },
                    {
                        height: "0vh",
                        duration: 1.2,
                        ease: CustomEase.create("custom", "M0,0 C0.52,0.01 0.16,1 1,1 "),
                    },
                );
        }
    };

    return (
        <ReactFullpage
            {...opts}
            onLeave={onLeave}
            render={() => {
                return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
            }}
        />
    );
};

export default FullpageProviderWork;
