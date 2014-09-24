function showText() {
  var verseOne = _.filter(poem.text, function(text) {return text.verse === 1});
  console.log(verseOne);
  d3.select('.text').selectAll('div')
      .data(verseOne)
    .enter().append('div').attr('class', 'line')
      .text(function(d) {return d.text;});
}

showText();
