// Central GSAP setup — registers ScrollTrigger once and re-exports gsap.
// Always import gsap from here so the plugin is guaranteed to be registered.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
