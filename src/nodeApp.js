const dateDiff = require('./index.js')

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
	console.log(dateDiff.calculate(d.toString()));
});

