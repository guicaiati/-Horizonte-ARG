const fs = require('fs');
let data = fs.readFileSync('script.js', 'utf8');
data = data.replace(/Courier New/g, "'Press Start 2P', 'Pixelion', 'Monopix', monospace");
// We should also adjust font sizes because Press Start 2P is huge compared to Courier New.
// A common ratio is multiplying font sizes by 0.6. We can do a regex replace for sizes:
data = data.replace(/(\d+)px/g, (match, size) => {
    let newSize = Math.max(10, Math.floor(parseInt(size) * 0.65));
    return newSize + 'px';
});
fs.writeFileSync('script.js', data);
