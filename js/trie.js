Trie = {
    init() {return this.root = [], this.$ = Symbol('$'), this;},
    insert(word, node = this.root) {
      for (var c of word) node = !(c in node) ? node[c] = {} : node[c];
      node[this.$] = true;
    },
    search(word, exact = false , node = this.root) {
      for (var c of word) if (c in node) node = node[c]; else return false;
      return !!node[this.$] || !exact;
    }
  };
  
  trie = Trie.init();
  trie.insert('abc');
  trie.insert('abba');
  a = trie.search('ab');        // true
  b = trie.search('abc', true); // true
  c = trie.search('ab', true);  // false
  console.log(a, b, c);