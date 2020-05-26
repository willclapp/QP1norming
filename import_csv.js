const fs = require('fs')
const csv = require('csv-parser')
let trialResults = []

let assetPaths = []

const buildOutput = (exposure, trial, assets) => `
var trial_stimuli = ${JSON.stringify(trial, null, 2)}

var assetPaths = ${JSON.stringify(assets.flat(), null, 2)}`



// This is which stims.js file is getting written
const writeResults = (exposure, trial, assets) => {
	fs.writeFile('mp_norming/js/stims.js', buildOutput(trial, assets), err => {
		if (err) {
			console.error(err)
		}
		console.log("stims.js written")
	})
}

// Getting read for exposure and then for test
fs.createReadStream('mp_norming/trial_csv/mp_coda.csv')
	.pipe(csv())
	.on('end', () => {
		console.log('done reading exposure.csv')
		fs.createReadStream('mp_norming/trial_csv/mp_coda.csv')
			.pipe(csv())
			.on('data', data => {
				trialResults.push(data)
				assetPaths.push([
					'audio/' + data.stim_audio, 
				])
			})
			.on('end', () => {
				console.log('done reading test.csv')
				writeResults(trialResults, assetPaths)
			})
	})







