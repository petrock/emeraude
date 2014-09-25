function changeVerse(verseNum) {
  var verseOne = _.filter(poem.text, function(text) {return text.verse === verseNum});
  console.log(verseOne);
  d3.select('.text').selectAll('div')
      .data(verseOne)
    .enter().append('div').attr('class', 'line')
      .text(function(d) {return d.text;});
}

changeVerse(2);
