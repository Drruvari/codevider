import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);

const myEase1: typeof CustomEase = CustomEase.create("custom", "0.76, 0, 0.24, 1");
const myEase2: typeof CustomEase = CustomEase.create("custom", "0.40, 0, 0.24, 1");

export { myEase1, myEase2 };
