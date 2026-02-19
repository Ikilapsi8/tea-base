// download-tea-references.js
// Скрипт для автоматичного завантаження всіх 56 референсних фото

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Імпортуємо список URL
import teaPhotoUrls from './tea-photo-urls.js';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Створюємо папку для референсів
const REFS_DIR = path.join(__dirname, 'references');
if (!fs.existsSync(REFS_DIR)) {
  fs.mkdirSync(REFS_DIR, { recursive: true });
}

// Функція для завантаження зображення
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    if (!url || url === '') {
      reject(new Error('Empty URL'));
      return;
    }

    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    const file = fs.createWriteStream(filepath);
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Обробка редиректів
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });

    request.on('error', (err) => {
      file.close();
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

// Функція для затримки
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Головна функція
async function main() {
  console.log('🍵 Tea Base - Reference Photos Downloader\n');
  console.log('=' .repeat(60));
  console.log('📁 Папка для збереження: ./references/');
  console.log('📊 Всього чаїв: 28');
  console.log('📷 Всього фото: 56 (28 × 2)');
  console.log('=' .repeat(60));
  console.log('');

  let totalTeas = 0;
  let completedTeas = 0;
  let emptyUrls = 0;
  let successPhotos = 0;
  let failedPhotos = 0;

  // Підраховуємо чаї з URL
  for (const tea of teaPhotoUrls) {
    totalTeas++;
    if (tea.photos.dry || tea.photos.steeped) {
      completedTeas++;
    }
  }

  console.log(`📋 Статус заповнення: ${completedTeas}/${totalTeas} чаїв`);
  
  if (completedTeas === 0) {
    console.log('\n❌ Жоден чай не має URL фото!');
    console.log('\n📝 Інструкція:');
    console.log('   1. Відкрий файл tea-photo-urls.js');
    console.log('   2. Для кожного чаю відкрий productPage');
    console.log('   3. Правою кнопкою на фото → "Copy image address"');
    console.log('   4. Вставити URL у photos.dry та photos.steeped');
    console.log('   5. Збережи файл');
    console.log('   6. Запусти цей скрипт знову\n');
    return;
  }

  console.log(`\n⬇️  Починаємо завантаження...\n`);

  // Завантажуємо фото
  for (const tea of teaPhotoUrls) {
    console.log(`\n[${tea.id}/28] ${tea.name}`);
    
    // Dry leaves
    if (tea.photos.dry && tea.photos.dry !== '') {
      const dryPath = path.join(REFS_DIR, `${tea.filename}-dry-ref.jpg`);
      try {
        process.stdout.write(`   📥 Dry leaves... `);
        await downloadImage(tea.photos.dry, dryPath);
        console.log(`✅ Saved`);
        successPhotos++;
      } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        failedPhotos++;
      }
      await delay(1000); // 1 sec delay
    } else {
      console.log(`   ⚠️  Dry leaves - URL порожній`);
      emptyUrls++;
    }

    // Steeped tea
    if (tea.photos.steeped && tea.photos.steeped !== '') {
      const steepedPath = path.join(REFS_DIR, `${tea.filename}-steeped-ref.jpg`);
      try {
        process.stdout.write(`   📥 Steeped tea... `);
        await downloadImage(tea.photos.steeped, steepedPath);
        console.log(`✅ Saved`);
        successPhotos++;
      } catch (error) {
        console.log(`❌ Failed: ${error.message}`);
        failedPhotos++;
      }
      await delay(1000); // 1 sec delay
    } else {
      console.log(`   ⚠️  Steeped tea - URL порожній`);
      emptyUrls++;
    }
  }

  // Підсумки
  console.log('\n' + '='.repeat(60));
  console.log('✅ ЗАВЕРШЕНО!\n');
  console.log(`📊 Статистика:`);
  console.log(`   Успішно завантажено: ${successPhotos} фото`);
  console.log(`   Помилок: ${failedPhotos} фото`);
  console.log(`   Порожніх URL: ${emptyUrls} фото`);
  console.log(`   Всього оброблено: ${successPhotos + failedPhotos + emptyUrls}/56`);
  console.log(`\n📁 Збережено в: ${REFS_DIR}`);
  
  if (emptyUrls > 0) {
    console.log(`\n⚠️  Залишилось заповнити: ${emptyUrls} URL`);
    console.log(`   Відкрий tea-photo-urls.js та додай відсутні посилання`);
  }
  
  if (failedPhotos > 0) {
    console.log(`\n⚠️  Деякі фото не завантажились - перевір URL та спробуй знову`);
  }
  
  console.log('='.repeat(60) + '\n');
}

// Запускаємо
main().catch(err => {
  console.error('\n❌ Критична помилка:', err);
  process.exit(1);
});

/*
ІНСТРУКЦІЯ ПО ВИКОРИСТАННЮ:

1. Заповни tea-photo-urls.js:
   - Відкрий кожну сторінку продукту
   - Правою кнопкою на фото → "Copy image address"
   - Вставити URL у photos.dry та photos.steeped

2. Запусти цей скрипт:
   node download_references_script.js

3. Чекай завершення (може зайняти 1-2 хвилини)

4. Перевір папку ./references/:
   - long-jing-dry-ref.jpg
   - long-jing-steeped-ref.jpg
   - ... і так далі

5. Використай ці референси в ChatGPT для генерації своїх версій

ПОРАДИ:
- Скрипт автоматично пропускає порожні URL
- Затримка 1 сек між запитами (щоб не перевантажити сервери)
- Якщо щось не завантажилось - перевір URL та запусти знову
- Файли перезаписуються якщо вже існують
*/