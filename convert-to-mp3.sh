#!/bin/sh

arr=("mp_norming/audio/*")

# arr=("experiment_no_shift/audio/context/*")

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