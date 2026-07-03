const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

const valenProject = `
  { id: "valen", wing: "CROWN WORKS", num: "INCIDENT-00", title: "VΛLEN", subtitle: "Archive Curator", desc: "The intelligent curator of The Archive. Designed to guide visitors, interpret artifacts, and maintain professional composure in the face of developmental chaos. An experiment in synthetic presence and persona anchoring.", tags: ["Synthetic Persona", "Curator", "Gemini API"], color: "#d946ef", emoji: "👁️" },`;

const velvetProject = `
  { id: "dark-velvet", wing: "CROWN WORKS", num: "INCIDENT-04b", title: "Dark Velvet Topology", subtitle: "Cognitive Observatory", desc: "A generative experience exploring how conceptual attractors reorganize simulated semantic space into traces of identity, persistence, and emergence.", tags: ["Generative", "Topology", "Cognitive Cartography"], color: "#ff006e", emoji: "🖤", link: "https://dark-velvet-topology-683386495643.us-east1.run.app" },`;

// Check if valen exists, if not insert after the array start
if (!data.includes('id: "valen"')) {
  data = data.replace('export const PROJECTS: Project[] = [', 'export const PROJECTS: Project[] = [' + valenProject);
}

if (!data.includes('id: "dark-velvet"')) {
  data = data.replace('export const PROJECTS: Project[] = [', 'export const PROJECTS: Project[] = [' + velvetProject);
}

fs.writeFileSync('src/data.ts', data);
