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

    if (++x === repetitions) {
      window.clearInterval(intervalId);
    }
  }, delay);
}

changeVerse(1);

repeatXTimes(function () {
  d3.select('div.face')
    .transition()
    .duration(200)
    .each(faceMove);

  function faceMove() {
    var face = d3.select(this);
    var pos = face.style('background-position').split(" ");
    var pos = _.transform(pos, function(result, posStr) {
      if (posStr === '-20px') {
        return result.push(posStr);
      }
    });
    console.log(pos);
    face.transition().duration(200)
      .style('background-position', '5px 20px')
  }
}, 1000, 7);

repeatXTimes(function () {
  console.log('other');
}, 1000, 3);
