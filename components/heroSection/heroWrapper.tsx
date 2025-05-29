import { HeroButton } from "./heroButton";
import { HeroMarquee } from "./heroMarquee";

export function HeroWrapper({ }) {
    return (
        <main className="section1__wrapper relative max-w-maxWidth grow">
            <div className="myImage"></div>
            <HeroButton />
            <h2 className="left mask pointer-events-none z-20 pt-20">
                <div className="free anime">
                    Software Development&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="animation__wrapper anime">
                    <span className="animate__this animate__this1 left-0">
                        Software <span className="yellow__it">Solutions</span>
                        <br />
                    </span>
                    <span className="animate__this animate__this2 left-0">
                        Built for <span className="yellow__it">Innovation</span>
                    </span>
                    <span>&nbsp;</span>
                </div>
            </h2>
            <HeroMarquee />
        </main>
    );
}
