function changeVerse(verseNum) {
  var verse = _.filter(poem.text, function(text) {return text.verse === verseNum});
  var lines = d3.select('.text').selectAll('div')
      .data(verse)
    .enter().append('div').attr('class', 'line')
      .text(function(d) {return d.text;});
}

function repeatXTimes(callback, delay, repetitions) {
  var x = 0;
  var intervalId = window.setInterval(function() {
    callback();

    if (++x === 5) {
      window.clearInterval(intervalId);
    }
  }, delay);
}

changeVerse(1);

repeatXTimes(function () {
  console.log('mk');
}, 1000, 5);

