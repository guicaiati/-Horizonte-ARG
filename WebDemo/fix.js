const fs = require('fs');
let data = fs.readFileSync('script.js', 'utf8');

// The faulty string is: 'something 'Press Start 2P', 'Pixelion', 'Monopix', monospace'
// Where something is like bold 23px 
data = data.replace(/'([^']*)'Press Start 2P', 'Pixelion', 'Monopix', monospace'/g, "\"`$1'Press Start 2P', 'Pixelion', 'Monopix', monospace`\"");
// Actually let's just use backticks for the whole string:
data = data.replace(/'([^']*)'Press Start 2P', 'Pixelion', 'Monopix', monospace'/g, "`$1'Press Start 2P', 'Pixelion', 'Monopix', monospace`");
fs.writeFileSync('script.js', data);
