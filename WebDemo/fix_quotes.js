const fs = require('fs');
let data = fs.readFileSync('script.js', 'utf8');

// Replace literal backticks surrounded by double quotes with just double quotes
data = data.replace(/"`([^`]+)`"/g, '"$1"');

// And just in case there are double-backticks somehow
data = data.replace(/``([^`]+)``/g, '"$1"');

fs.writeFileSync('script.js', data);
