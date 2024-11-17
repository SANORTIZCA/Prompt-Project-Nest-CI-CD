const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

// Ruta al directorio de vistas
const viewsDir = path.join(__dirname, 'views');
// Ruta al directorio de salida
const distDir = path.join(__dirname, 'dist', 'views');

// Crear el directorio dist/views si no existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Función para convertir un archivo HBS a HTML
const convertHbsToHtml = (hbsFilePath) => {
  const fileName = path.basename(hbsFilePath, '.hbs');
  const htmlFilePath = path.join(distDir, `${fileName}.html`);

  // Leer el archivo HBS
  const hbsContent = fs.readFileSync(hbsFilePath, 'utf-8');
  // Compilar el contenido de Handlebars
  const template = hbs.handlebars.compile(hbsContent);
  // Generar el contenido HTML
  const htmlContent = template({});

  // Escribir el contenido HTML en el archivo de salida
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
