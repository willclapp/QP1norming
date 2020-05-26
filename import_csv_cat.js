const fs = require('fs')
const csv = require('csv-parser')
let onsetResults = []
let codaResults = []
let assetPaths = []

const buildOutput = (onset, coda, assets) => `
var onset_trial_stimuli = ${JSON.stringify(onset, null, 2)}

var coda_trial_stimuli = ${JSON.stringify(coda, null, 2)}

var assetPaths = ${JSON.stringify(assets.flat(), null, 2)}`




// This is which stims.js file is getting written
const writeResults = (onset, coda, assets) => {
	fs.writeFile('cat_norming/js/stims.js', buildOutput(onset, coda, assets), err => {
		if (err) {
			console.error(err)
		}
		console.log("stims.js written")
	})
}

// Getting read for trial
fs.createReadStream('cat_norming/trial_csv/cat_onset.csv')
	.pipe(csv())
	.on('data', data => {
		onsetResults.push(data)
		// This is just for preloading!
		assetPaths.push([
			'audio/onset/' + data.path, 
		])
	})
	.on('end', () => {
		console.log('done reading cat_onset.csv')
		fs.createReadStream('cat_norming/trial_csv/cat_coda.csv')
			.pipe(csv())
			.on('data', data => {
				codaResults.push(data)
				assetPaths.push([
					'audio/coda/' + data.path, 
				])
			})
			.on('end', () => {
				console.log('done reading cat_coda.csv')
				writeResults(onsetResults, codaResults, assetPaths)
			})
	})







