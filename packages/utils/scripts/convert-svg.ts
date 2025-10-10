import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

// Read SVG files and convert to TypeScript constants
const svgDir = path.join(__dirname, '../src/flags');
const outputFile = path.join(__dirname, '../src/flags.ts');

const svgFiles = ['usd.svg', 'eur.svg'];
let output = '// Auto-generated from SVG files\n\n';

svgFiles.forEach(filename => {
  const svgPath = path.join(svgDir, filename);
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  const cleanSvg = svgContent.replace(/[\r\n]/g, ' ').replace(/\s+/g, ' ').trim();
  const constName = filename.replace('.svg', '').toUpperCase() + '_FLAG_SVG';
  output += `export const ${constName} = '${cleanSvg}';\n`;
});

fs.writeFileSync(outputFile, output);
console.log('Generated flags.ts from SVG files');
