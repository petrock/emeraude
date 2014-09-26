function changeVerse(verseNum) {
  var verse = _.filter(poem.text, function(text) {return text.verse === verseNum});
  console.log(verse);
  d3.select('.text').selectAll('div')
      .data(verse)
    .enter().append('div').attr('class', 'line')
      .text(function(d) {return d.text;});
}

changeVerse(1);

