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
    callback(x);

    if (++x === repetitions) {
      window.clearInterval(intervalId);
    }
  }, delay);
}

changeVerse(1);

repeatXTimes(function (x) {
  d3.select('div.face')
    .transition()
    .duration(200)
    .each(moveFace);

  function moveFace() {
    var face = d3.select(this);
    var pos = face.style('background-position').split(" ");
    var posX = parseInt(pos[0].replace(/px/i, ''));
    var origX = posX;
    console.log(x + ' - ' + origX);
    var posY = pos[1];
    if (x === 6) { 
      posX = origX
    } else if (x % 2 === 0) {
      posX = origX + 25
    } else {
      posX = origX - 25
    }
    face.transition().duration(20)
      .style('background-position', posX + 'px ' + posY)
  }
}, 70, 7);

repeatXTimes(function () {
}, 1000, 3);

