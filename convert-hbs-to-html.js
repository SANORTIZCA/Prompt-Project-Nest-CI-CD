const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

// Ruta al archivo home.hbs
const hbsFilePath = path.join(__dirname, 'views', 'home.hbs');
// Ruta al archivo index.html de salida
const htmlFilePath = path.join(__dirname, 'dist', 'index.html');

// Leer el archivo home.hbs
const hbsContent = fs.readFileSync(hbsFilePath, 'utf-8');
// Compilar el contenido de Handlebars
const template = handlebars.compile(hbsContent);
// Generar el contenido HTML
const htmlContent = template({});

// Crear el directorio dist si no existe
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

// Escribir el contenido HTML en index.html
fs.writeFileSync(htmlFilePath, htmlContent);

console.log('home.hbs convertido a index.html');
