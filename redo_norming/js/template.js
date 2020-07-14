function make_slides(f) {
  preload(assetPaths, { after: function() {console.log(`all ${assetPaths.length} assets preloaded`)}})
  var   slides = {};

  slides.i0 = slide({
    name : "i0",
    start: function() {
      exp.startT = Date.now();
    }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });


  slides.word = slide({
    name: "word",
    present: exp.word_trial_stims,
    present_handle: function(stim) {
      $(".err").hide();
      this.stim = stim;
      $(".trial_button")
        .attr("disabled", true)
      var audio = $("<audio />")
        .attr("src", "audio/word/" + stim.path)
        .attr("autoplay", true)
        .on("ended", function() {
          $(".display_condition_word").children().remove()
          $(".trial_button")
            .attr("disabled", false)
        })

      var voiced_option = build_trial_option(stim.voiced, "voiced")
      var voiceless_option = build_trial_option(stim.voiceless, "voiceless")
      var options = _.shuffle([voiced_option, voiceless_option])

      $(".display_condition_word")
      .append(audio)

      $(".word_options_container")
      .append(options[0])
      .append(options[1])
    },
    button : function() {
      // TODO capture val of image radio button
      this.response = $('input[name="selection"]:checked').val();
      if (this.response == undefined) {
        $(".err").show();
      } else {
        // play continuation audio
        // cleanup
        $(".word_options_container").children().remove()
        this.log_responses();
        _stream.apply(this);
      }
    },
    log_responses : function() {
      exp.data_trials.push(Object.assign({
        "slide_order": exp.phase-3,
        "participant_id" : exp.uuid,
        "response" : this.response
      }, this.stim));
    }
  })

  slides.second_instructions = slide({
    name: "second_instructions",
    button: function() {
      exp.go()
    }
  })

  slides.nonword = slide({
    name: "nonword",
    present: exp.nonword_trial_stims,
    present_handle: function(stim) {
      $(".err").hide();
      this.stim = stim;
      $(".trial_button")
      .attr("disabled", true)
      var audio = $("<audio />")
      .attr("src", "audio/nonword/" + stim.path)
      .attr("autoplay", true)
      .on("ended", function() {
        $(".display_condition_nonword").children().remove()
        $(".trial_button")
        .attr("disabled", false)
      })

      var voiced_option = build_trial_option(stim.voiced, "voiced")
      var voiceless_option = build_trial_option(stim.voiceless, "voiceless")
      var options = _.shuffle([voiced_option, voiceless_option])

      $(".display_condition_nonword")
      .append(audio)

      $(".nonword_options_container")
      .append(options[0])
      .append(options[1])
    },
    button : function() {
      // TODO capture val of image radio button
      this.response = $('input[name="selection"]:checked').val();
      if (this.response == undefined) {
        $(".err").show();
      } else {
        // play continuation audio
        // cleanup
        $(".nonword_options_container").children().remove()
        this.log_responses();
        _stream.apply(this);
      }
    },
    log_responses : function() {
      exp.data_trials.push(Object.assign({
        "slide_order": exp.phase-3,
        "participant_id" : exp.uuid,
        "response" : this.response
      }, this.stim));
    }
  })

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
        "trials" : exp.data_trials,
        "catch_trials" : exp.catch_trials,
        "system" : exp.system,
        "condition" : exp.condition,
        "subject_information" : exp.subj_data,
        "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];


  exp.uuid = uuidv4()
  // variables imported from stims.js
  exp.word_trial_stims = _.shuffle(word_trial_stimuli)
  exp.nonword_trial_stims = _.shuffle(nonword_trial_stimuli)
  exp.system = {
    Browser : BrowserDetect.browser,
    OS : BrowserDetect.OS,
    screenH: screen.height,
    screenUH: exp.height,
    screenW: screen.width,
    screenUW: exp.width
  };
  //blocks of the experiment:
  exp.structure=["i0", "instructions", "word", "second_instructions", "nonword", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}







