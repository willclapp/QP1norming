function build_exposure_option(text, type) {
	var trial_option = $("<div>")
		.addClass("trial_option")

	var radio_button = $("<input />")
		.attr("type", "radio")
		.attr("name", "selection")
		.attr("value", type)
		.attr("id", "selection_" + type)

	var label = $("<label>")
		.text(text)
		.attr("for", "selection_" + type)

	trial_option
		.append(label)
		.append(radio_button)

	return trial_option
}

function build_target(text) {
	var trial_option = $("<div>")
		.addClass("trial_option")
		.addClass("target")

	var label = $("<label>")
		.text(text)

	trial_option
		.append(label)

	return trial_option
}


function build_trial_option(text, type) {
	var trial_option = $("<div>")
		.addClass("trial_option")

	var radio_button = $("<input />")
		.attr("type", "radio")
		.attr("name", "selection")
		.attr("value", type)
		.attr("id", "selection_" + type)

	var label = $("<label>")
		.text(text)
		.attr("for", "selection_" + type)

	trial_option
		.append(label)
		.append(radio_button)

	return trial_option
}

