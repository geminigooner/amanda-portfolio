const fs = require('fs');
let content = fs.readFileSync('src/components/AICuratorChat.tsx', 'utf8');

const target = "export function AICuratorChat({ activeSection = '', onOpenContainmentWing }: { activeSection?: string, onOpenContainmentWing?: () => void }) {";
const replacement = "export function AICuratorChat({ activeSection = '', onOpenContainmentWing, onOpenConvergence }: { activeSection?: string, onOpenContainmentWing?: () => void, onOpenConvergence?: () => void }) {";
content = content.replace(target, replacement);

fs.writeFileSync('src/components/AICuratorChat.tsx', content);
