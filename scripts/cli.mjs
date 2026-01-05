
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log('--- Portfolio CLI ---');
    console.log('Configure essential settings only.\n');

    const dataPath = path.join(__dirname, '../data.json');
    const configPath = path.join(__dirname, '../next.config.mjs');

    // Read data.json
    let data = {};
    try {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading data.json:', error);
        process.exit(1);
    }

    // Read next.config.mjs
    let configContent = '';
    try {
        configContent = fs.readFileSync(configPath, 'utf8');
    } catch (error) {
        console.error('Error reading next.config.mjs:', error);
        process.exit(1);
    }

    // --- Static Output ---
    const currentOutput = configContent.includes("output: 'export'") ? 'Static (export)' : 'Standalone (SSR/Docker)';
    console.log(`Current Output Mode: ${currentOutput}`);
    const outputInput = await question('Enable Static Output (export)? (y/N): ');

    if (outputInput.toLowerCase() === 'y') {
        if (configContent.includes("output: 'standalone'")) {
            configContent = configContent.replace("output: 'standalone'", "output: 'export'");
        } else if (!configContent.includes("output: 'export'")) {
            configContent = configContent.replace('const nextConfig = {', "const nextConfig = {\n    output: 'export',");
        }
    } else if (outputInput.toLowerCase() === 'n') {
        if (configContent.includes("output: 'export'")) {
            configContent = configContent.replace("output: 'export'", "output: 'standalone'");
        } else if (!configContent.includes("output: 'standalone'")) {
            configContent = configContent.replace('const nextConfig = {', "const nextConfig = {\n    output: 'standalone',");
        }
    }

    // --- GitHub Username ---
    const username = await question(`GitHub Username (${data.githubUsername}): `);
    if (username.trim()) data.githubUsername = username.trim();

    // --- Save ---
    console.log('\nSaving changes...');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), 'utf8');
    fs.writeFileSync(configPath, configContent, 'utf8');

    console.log('Done! Other settings (logo, hero, ventures, theme) are configured via the Setup Wizard or directly in data.json.');
    rl.close();
}

main();
