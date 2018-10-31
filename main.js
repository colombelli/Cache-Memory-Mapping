// Function that converts a decimal number to a binary string
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

// Function that converts a binary string to a decimal number
function bin2dec(bin) {
  return parseInt(bin, 2);
}

// constructor for cache object
function Cache(cacheSize) {
  this.size = cacheSize; // numeric int indicating the size of the cache memory
  this.measure = document.getElementById('cacheSizeMeasure').value; // string indicating if the size is in bytes, kb or mb
  this.sizeInBytes = // the cache size converted to a integer byte value (in base-2)
    function() {
      if (this.measure == "cacheBytes")
        return cacheSize;
      else if (this.measure == "cacheKbytes")
        return this.size * 1024;
      else
        return this.size * 1048576;
    }
  //this.binStr = dec2bin(this.sizeInBytes());
}


// constructor for block object
function Block(blockSize) {
  this.size = blockSize; // numeric int indicating the size of the cache memory
  this.measure = document.getElementById('blockSizeMeasure').value; // string indicating if the size is in bytes, kb or mb
  this.sizeInBytes = // the cache size converted to a integer byte value (in base-2)
    function() {
      if (this.measure == "blockBytes")
        return cacheSize;
      else
        return this.size * 1024;
    }
  //this.binStr = dec2bin(this.sizeInBytes());
}



// Function that calculates the mapping
function calculateMapping(cache, block, address) {

  // Calculates number of the blocks
  var numBlocks = cache.sizeInBytes / block.sizeInBytes;
  var numBlocksHTML = document.getElementById('numBlocks');
  numBlocksHTML.innerHTML = "Número de blocos da cache: " + numBlocks; // shows result on numBlocks paragraph

  var binAddress = dec2bin(address);  // Converts the integer of the addres to a binary string
  var bitsBlock = Math.log2(numBlocks); // Calculates how many bits will give the block
  var bitsWord = Math.log2(block.sizeInBytes); // Calculates how many bits will give the word
  var bitsTag = binAddress.length - (bitsWord + bitsBlock); // Calculates how many bits will give the tag


  // Calculates block address

  var blockAddressHTML = document.getElementById('directMapping');

  // catches the substring corresponding to what matters
  var wordBinaryString = binAddress.substr(bitsTag+bitsBlock); // withouth comma: from that till the end
  var blockBinaryString = binAddress.substr(bitsTag, bitsBlock);
  // for the tag, we first need to check if it is 0
  var tagBinaryString = 0;
  if (bitsTag != 0)
    var tagBinaryString = binAddress.substr(0, bitsBlock);

  // final block - transforming the binary string back to numeric integer
  var finalValues = {
    word: function(){
      return parseInt(wordBinaryString, 2)},
    block: function(){
      return parseInt(blockBinaryString, 2)},
    tag: function(){
      return parseInt(tagBinaryString, 2)},
    //stringToConcatenate: this.block() + " | palavra " + this.word() + " | tag " + this.tag()
  }
   console.log(finalValues.block());
  //blockAddressHTML.innerHTML = "Endereço por mapeamento direto: bloco " + finalValues.stringToConcatenate;




  return false;
}



// Function that gets the input values to start calculating
function getValues() {

  var cacheSizeString = document.getElementById('cacheSize');
  if (cacheSizeString.value) { // check if there is, indeed, a input value
    var cacheSize = parseInt(cacheSizeString.value); // numeric int value of cache size input
    var cache = new Cache(cacheSize);
  } else {
    alert('Você precisa passar um valor para o tamanho da memória cache!');
    return false;
  }


  var blockSizeString = document.getElementById('blockSize');
  if (blockSizeString.value) { // check if there is, indeed, a input value
    var blockSize = parseInt(blockSizeString.value); // numeric int value of block size input
    var block = new Block(blockSize);
  } else {
    alert('Você precisa passar um valor para o tamanho dos blocos!');
    return false;
  }


  var addressString = document.getElementById('address');
  if (addressString.value) // check if there is, indeed, a input value
    var address = parseInt(addressString.value); // numeric int value of address input
  else {
    alert('Você precisa passar um valor para o endereço a ser mapeado!');
    return false;
  }

  // After get the values properly, it calls the function that actually calculates and maps everything
  return calculateMapping(cache, block, address);
}
