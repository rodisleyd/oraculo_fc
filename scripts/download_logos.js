
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEAMS = [
  { id: 'fla', url: 'https://crests.football-data.org/1783.png' },
  { id: 'pal', url: 'https://crests.football-data.org/1769.png' },
  { id: 'bot', url: 'https://crests.football-data.org/1770.png' },
  { id: 'for', url: 'https://crests.football-data.org/3984.png' },
  { id: 'int', url: 'https://crests.football-data.org/1768.png' },
  { id: 'spfc', url: 'https://crests.football-data.org/1776.png' },
  { id: 'cor', url: 'https://crests.football-data.org/1779.png' },
  { id: 'bah', url: 'https://crests.football-data.org/1777.png' },
  { id: 'cru', url: 'https://crests.football-data.org/1771.png' },
  { id: 'vas', url: 'https://crests.football-data.org/1780.png' },
  { id: 'vit', url: 'https://crests.football-data.org/1782.png' },
  { id: 'cam', url: 'https://crests.football-data.org/1766.png' },
  { id: 'flu', url: 'https://crests.football-data.org/1765.png' },
  { id: 'gre', url: 'https://crests.football-data.org/1767.png' },
  { id: 'red', url: 'https://crests.football-data.org/4286.png' },
  { id: 'juv', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Juventude_Crest.svg/200px-Juventude_Crest.svg.png' },
  { id: 'san', url: 'https://crests.football-data.org/6685.png' },
  { id: 'mir', url: 'https://crests.football-data.org/6019.png' },
  { id: 'spt', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Sport_Club_do_Recife.svg/200px-Sport_Club_do_Recife.svg.png' },
  { id: 'cea', url: 'https://crests.football-data.org/1054.png' }
];

const TARGET_DIR = path.resolve(__dirname, '../public/teams');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        // Handle basic redirects just in case
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const run = async () => {
  console.log('Downloading logos...');
  for (const team of TEAMS) {
    const filename = `${team.id}.png`;
    const filepath = path.join(TARGET_DIR, filename);
    try {
      await downloadImage(team.url, filepath);
      console.log(`✅ Downloaded: ${team.name || team.id}`);
    } catch (e) {
      console.error(`❌ Failed: ${team.id} - ${e.message}`);
    }
  }
  console.log('Done.');
};

run();
