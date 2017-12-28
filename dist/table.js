const path = require('path');
const child_process = require('child_process');

let command = path.join(__dirname, '..', 'node_modules', '.bin', 'html-pdf') + ' table.html table.pdf';

console.log( command )

console.log( child_process.execSync( command ) )
