const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

const viewsDir = path.join(__dirname, 'views');
const distDir = path.join(__dirname, 'dist');

// Función para convertir un archivo HBS a HTML
const convertHbsToHtml = (hbsFilePath) => {
  const hbsContent = fs.readFileSync(hbsFilePath, 'utf-8');
  const template = hbs.compile(hbsContent);
  const htmlContent = template({});
  const htmlFileName = path.basename(hbsFilePath, '.hbs') + '.html';
  const htmlFilePath = path.join(distDir, htmlFileName);
  fs.writeFileSync(htmlFilePath, htmlContent);
  console.log(`${hbsFilePath} convertido a ${htmlFilePath}`);
};

// Leer todos los archivos HBS en el directorio de vistas
fs.readdirSync(viewsDir).forEach((file) => {
  if (path.extname(file) === '.hbs') {
    const hbsFilePath = path.join(viewsDir, file);
    convertHbsToHtml(hbsFilePath);
  }
});

console.log('Todas las vistas han sido convertidas a HTML');
