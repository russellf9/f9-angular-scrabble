describe("wordFinder", function() {

  it("should have a method called findWords", function() {
    var w = makeWordFinder(["A"],["A"]);
    expect(w.findWords).toEqual(jasmine.any(Function));
  });

  it("should find words in a simple list", function() {
    var wordList = ["EAT", "AT", "ATE", "TEA", "TEE", "TA"];
    var hand = ["E", "A", "T"];

    var w = makeWordFinder(hand, wordList);

    expect(w.findWords().length).toEqual(5); // Should find all but 'tee'
  });

  it("should find words in the whole dictionary", function() {
    var wordList = corpus;
    var hand = ["E", "A", "N", "O", "T", "R", "S"];

    var w = makeWordFinder(hand, wordList);
    var words = w.findWords();
    console.log(words);
    expect(words.length).toBeGreaterThan(0);
  });

});