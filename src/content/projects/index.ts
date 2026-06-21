import { Project } from "@/types/content";
import { marketplaceProject } from "./marketplace";
import { cyberThreatProject } from "./cyber-threat";
import { hateSpeechProject } from "./hate-speech";
import { weatherProject } from "./weather";
import { imageEditorProject } from "./image-editor";
import { portfolioProject } from "./portfolio";

export const featuredProjects: Project[] = [
  marketplaceProject,
  cyberThreatProject,
  hateSpeechProject,
  weatherProject,
  imageEditorProject,
  portfolioProject,
];
export { marketplaceProject, cyberThreatProject, hateSpeechProject, weatherProject, imageEditorProject, portfolioProject };
