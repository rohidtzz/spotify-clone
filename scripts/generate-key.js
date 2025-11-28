#!/usr/bin/env node

/**
 * Generate random salt untuk Subsonic API authentication
 * Usage: npm run key:generate
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate random salt (16 characters)
const generateSalt = (length = 16) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

// Generate MD5 token for testing
const generateToken = (password, salt) => {
  return crypto.createHash('md5').update(password + salt).digest('hex');
};

const salt = generateSalt();

console.log('\n🔐 Subsonic API Salt Generator\n');
console.log('================================\n');
console.log(`Generated Salt: ${salt}\n`);

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (fs.existsSync(envPath)) {
  // Read current .env
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace or add VITE_API_SALT
  if (envContent.includes('VITE_API_SALT=')) {
    envContent = envContent.replace(/VITE_API_SALT=.*/g, `VITE_API_SALT=${salt}`);
    console.log('✅ Updated VITE_API_SALT in .env\n');
  } else {
    envContent += `\nVITE_API_SALT=${salt}\n`;
    console.log('✅ Added VITE_API_SALT to .env\n');
  }
  
  fs.writeFileSync(envPath, envContent);
} else {
  // Copy from .env.example if exists
  if (fs.existsSync(envExamplePath)) {
    let envContent = fs.readFileSync(envExamplePath, 'utf8');
    envContent = envContent.replace(/VITE_API_SALT=.*/g, `VITE_API_SALT=${salt}`);
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env from .env.example with new salt\n');
  } else {
    console.log('⚠️  No .env file found. Please create one manually.\n');
    console.log('Add this to your .env file:');
    console.log(`VITE_API_SALT=${salt}\n`);
  }
}

console.log('📝 Usage in Subsonic API:');
console.log('   Token = MD5(password + salt)');
console.log('   Request: ?u=username&t=token&s=salt&v=1.16.1&c=client\n');

// Example token generation
console.log('💡 Example (if password is "mypassword"):');
const exampleToken = generateToken('mypassword', salt);
console.log(`   Salt: ${salt}`);
console.log(`   Token: ${exampleToken}\n`);

console.log('🔒 Remember: Never commit your .env file with real credentials!\n');
