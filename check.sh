#!/bin/bash
FILES="src/App.tsx src/data.ts src/components/*.tsx"

echo "=== Sci-fi / Cyberpunk / Geometry / Energy keywords ==="
grep -inE "neon|crystal|lattice|manifold|attractor|glowing|core|energy|dystopian|futuristic" $FILES

echo "=== Hype / Consciousness / Vague superlatives ==="
grep -inE "elite|next-level|groundbreaking|feels|wants|suffers|inner life|magic" $FILES
