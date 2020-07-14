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

