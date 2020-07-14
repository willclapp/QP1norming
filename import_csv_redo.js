const fs = require('fs')
const csv = require('csv-parser')
let possible_nonwordResults = []
let mpResults = []
let assetPaths = []

const buildOutput = (possible_nonword, mp, assets) => `
var possible_nonword_trial_stimuli = ${JSON.stringify(possible_nonword, null, 2)}

var mp_trial_stimuli = ${JSON.stringify(mp, null, 2)}

var assetPaths = ${JSON.stringify(assets.flat(), null, 2)}`




// This is which stims.js file is getting written
const writeResults = (possible_nonword, mp, assets) => {
	fs.writeFile('redo_norming/js/stims.js', buildOutput(possible_nonword, mp, assets), err => {
		if (err) {
			console.error(err)
		}
		console.log("stims.js written")
	})
}

// Getting read for trial
fs.createReadStream('redo_norming/trial_csv/possible_nonword.csv')
	.pipe(csv())
	.on('data', data => {
		possible_nonwordResults.push(data)
		// This is just for preloading!
		assetPaths.push([
			'audio/possible_nonword/' + data.path, 
		])
	})
	.on('end', () => {
		console.log('done reading possible_nonword.csv')
		fs.createReadStream('redo_norming/trial_csv/mp.csv')
			.pipe(csv())
			.on('data', data => {
				mpResults.push(data)
				assetPaths.push([
					'audio/mp/' + data.path, 
				])
			})
			.on('end', () => {
				console.log('done reading mp.csv')
				writeResults(possible_nonwordResults, mpResults, assetPaths)
			})
	})







