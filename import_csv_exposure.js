const fs = require('fs')
const csv = require('csv-parser')
let wordResults = []
let nonwordResults = []
let assetPaths = []

const buildOutput = (word, nonword, assets) => `
var word_trial_stimuli = ${JSON.stringify(word, null, 2)}

var nonword_trial_stimuli = ${JSON.stringify(nonword, null, 2)}

var assetPaths = ${JSON.stringify(assets.flat(), null, 2)}`




// This is which stims.js file is getting written
const writeResults = (word, nonword, assets) => {
	fs.writeFile('exposure_norming/js/stims.js', buildOutput(word, nonword, assets), err => {
		if (err) {
			console.error(err)
		}
		console.log("stims.js written")
	})
}

// Getting read for trial
fs.createReadStream('exposure_norming/trial_csv/exposure_word.csv')
	.pipe(csv())
	.on('data', data => {
		wordResults.push(data)
		// This is just for preloading!
		assetPaths.push([
			'audio/word/' + data.path, 
		])
	})
	.on('end', () => {
		console.log('done reading exposure_word.csv')
		fs.createReadStream('exposure_norming/trial_csv/exposure_nonword.csv')
			.pipe(csv())
			.on('data', data => {
				nonwordResults.push(data)
				assetPaths.push([
					'audio/nonword/' + data.path, 
				])
			})
			.on('end', () => {
				console.log('done reading exposure_nonword.csv')
				writeResults(wordResults, nonwordResults, assetPaths)
			})
	})







