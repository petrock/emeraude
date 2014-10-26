// get original position of face backgound image
// this should auto-inspect and build a position object
var faceBackgroundPos = d3.select('.face').style('background-position').split(" ");
var faceBackgroundX = parseInt(faceBackgroundPos[0].replace(/px/i, ''));
var faceBackgroundY = parseInt(faceBackgroundPos[1].replace(/px/i, ''));

function changeVerse(verseNum) {
  var verse = _.filter(poem.text, function(text) {return text.verse === verseNum});

  var lines = d3.select('.text').selectAll('div')
    .data(verse, function(d) {
      
  console.log(d);
      return d;});

  lines.enter().append('div').attr('class', 'line')
    .text(function(d) {return d.text;});

  lines.exit().remove();
}

function highlightText() {
  var currentLines = d3.selectAll('div.line')
    .transition()
    .delay(function(d, i) { return i * 10 })
    .each(fadeIn);

  function fadeIn() {
    var line = d3.select(this);
    var previousLine = d3.select(this.previousSibling);


    line.transition()
      .duration(1000)
      .style('opacity', 1.0)
      .style('color', 'green')
      .each('end', fadeOut);

    function fadeOut() {
      previousLine.transition()
        .duration(2000)
        .style('opacity', 0.5);

    var verseLength = currentLines[0].length;

    if (line.data()[0].line === verseLength) {
      var currentVerse = line.data()[0].verse;
      changeVerse(currentVerse + 1);
    }
    checkVerse(line);
    }

  }
}

function checkVerse(line) {
  var currentLine = d3.select(line.data());
  // console.log(currentLine[0][0][0].verse);
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
