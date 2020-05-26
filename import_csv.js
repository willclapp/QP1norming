const fs = require('fs')
const csv = require('csv-parser')
let trialResults = []

let assetPaths = []

const buildOutput = (trial, assets) => `
var trial_stimuli = ${JSON.stringify(trial, null, 2)}

var assetPaths = ${JSON.stringify(assets.flat(), null, 2)}`

// This is which stims.js file is getting written
const writeResults = (trial, assets) => {
	fs.writeFile('mp_norming/js/stims.js', buildOutput(trial, assets), err => {
		if (err) {
			console.error(err)
		}
		console.log("stims.js written")
	})
}

// Getting read for trial
fs.createReadStream('mp_norming/trial_csv/mp_coda.csv')
	.pipe(csv())
	.on('data', data => {
		trialResults.push(data)
		// This is just for preloading!
		assetPaths.push([
			'audio/' + data.path, 
		])
	})
	.on('end', () => {
		console.log('done reading mp_coda.csv')
		writeResults(trialResults, assetPaths)
	})







