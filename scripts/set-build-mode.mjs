
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '../next.config.mjs');
const mode = process.argv[2]; // 'static' or 'dynamic'

if (!mode || (mode !== 'static' && mode !== 'dynamic')) {
    console.error('Usage: node set-build-mode.mjs <static|dynamic>');
    process.exit(1);
}

let configContent = fs.readFileSync(configPath, 'utf8');

if (mode === 'static') {
    if (configContent.includes("output: 'standalone'")) {
        configContent = configContent.replace("output: 'standalone'", "output: 'export'");
    }
    console.log('Build mode set to: Static (export)');
} else {
    if (configContent.includes("output: 'export'")) {
        configContent = configContent.replace("output: 'export'", "output: 'standalone'");
    }
    console.log('Build mode set to: Dynamic (standalone)');
}

fs.writeFileSync(configPath, configContent, 'utf8');
