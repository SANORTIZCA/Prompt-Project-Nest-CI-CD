const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

const viewsDir = path.join(__dirname, 'views');
const distDir = path.join(__dirname, 'dist');

// Función para convertir un archivo HBS a HTML
const convertHbsToHtml = (hbsFilePath, outputFileName) => {
  const hbsContent = fs.readFileSync(hbsFilePath, 'utf-8');
  const template = hbs.compile(hbsContent);
  const htmlContent = template({});
  const htmlFilePath = path.join(distDir, outputFileName);
  fs.writeFileSync(htmlFilePath, htmlContent);
  console.log(`${hbsFilePath} convertido a ${htmlFilePath}`);
};

// Crear el directorio dist si no existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Convertir home.hbs a home.html
const homeHbsPath = path.join(viewsDir, 'home.hbs');
convertHbsToHtml(homeHbsPath, 'home.html');

// Convertir home.hbs a index.html para la raíz del sitio
convertHbsToHtml(homeHbsPath, 'index.html');

console.log('Todas las vistas han sido convertidas a HTML');
