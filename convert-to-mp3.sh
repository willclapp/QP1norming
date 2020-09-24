#!/bin/sh

arr=("./coda_norming/audio/coda/*")

for d in "${arr[@]}"; do
	echo "converting audio in ${d}"

	for i in $d; do
		sox "$i" "${i%.wav}.mp3"
		echo "created ${i%.wav}.mp3"
		rm $i
	done
	# rm "${d}.wav"
	# echo "removed ${d}.wav"
done