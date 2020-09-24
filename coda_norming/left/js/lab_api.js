function submitResults(runID, data, callback) {
    $.post(`https://will-ling-lab.herokuapp.com/runs/${runID}/results`, {data: data})
    .fail(function(data) {
        callback(data)
    })
    .done(function(data) {
        callback(null, data)
    })
}