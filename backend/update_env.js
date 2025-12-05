
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const newValues = {
    EMAIL_SERVICE: 'gmail',
    EMAIL_USER: 'campusfoundrguktsklm@gmail.com',
    EMAIL_PASS: 'hbrbsmlbwgdgbebb'
  };

  // Split into lines
  let lines = envContent.split('\n');
  const updatedKeys = new Set();

  // Update existing lines
  lines = lines.map(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      if (newValues[key]) {
        updatedKeys.add(key);
        return `${key}=${newValues[key]}`;
      }
    }
    return line;
  });

  // Append missing keys
  Object.keys(newValues).forEach(key => {
    if (!updatedKeys.has(key)) {
      if (lines.length > 0 && lines[lines.length - 1] !== '') {
        lines.push('');
      }
      lines.push(`${key}=${newValues[key]}`);
    }
  });

  // Write back
  fs.writeFileSync(envPath, lines.join('\n'));
  console.log('Successfully updated .env file');

} catch (error) {
  console.error('Error updating .env:', error);
  process.exit(1);
}
