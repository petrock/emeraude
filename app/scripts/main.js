// get original position of face backgound image
// this should auto-inspect and build a position object
var faceBackgroundPos = d3.select('.face').style('background-position').split(" ");
var faceBackgroundX = parseInt(faceBackgroundPos[0].replace(/px/i, ''));
var faceBackgroundY = parseInt(faceBackgroundPos[1].replace(/px/i, ''));

function changeVerse(verseNum) {
  var verse = _.filter(poem.text, function(text) {return text.verse === verseNum});
  var lines = d3.select('.text').selectAll('div')
    .data(verse)
    .enter().append('div').attr('class', 'line')
    .text(function(d) {return d.text;});
}

function highlightText() {
  var currentLines = d3.selectAll('div.line')
    .transition()
    .delay(function(d, i) { return i * 1000 })
    .each(fadeIn);

  function fadeIn() {
    var line = d3.select(this);
    var previousLine = d3.select(this.previousSibling)
      .transition()
      .duration(line.length * 1000)
      .style('opacity', 0.5);

    (function repeat() {
      line = line.transition().duration(line.length * 1000)
        .style('opacity', 1.0)
        .each('end', repeat);
    })();
  }
}

function repeatXTimes(callback, repetitions) {
  var x = 0;
  var intervalId = window.setInterval(function() {
    callback(x);

    if (++x === repetitions) {
      window.clearInterval(intervalId);
    }
  });
}

repeatXTimes(function (x) {
  var xDistance = 25;

  d3.select('div.face')
    .transition()
    .duration(10)
    .delay(50)
    .each(moveFace);

  function moveFace() {
    var face = d3.select(this);
    if (x === 6) { 
      posX = faceBackgroundX
    } else if (x % 2 === 0) {
      posX = faceBackgroundX + xDistance;
    } else {
      posX = faceBackgroundX - xDistance;
    }
    face.transition()
      .style('background-position', posX + 'px ' + faceBackgroundY + 'px')
  }
}, 7);

repeatXTimes(function () {
}, 3);

changeVerse(1);
highlightText();
