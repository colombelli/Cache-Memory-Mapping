



// Function that converts a decimal number to a binary string
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}


// Function that calculates the mapping
function calculateMapping(cacheSize, blockSize, address) {

  // Calculates number of the blocks
  var numBlocks = cacheSize / blockSize;
  var numBlocksHTML = document.getElementById('numBlocks');
  numBlocksHTML.innerHTML = "Número de blocos da cache: " + numBlocks;  // shows result on numBlocks paragraph


  // Calculates block address
  var blockAddressHTML = document.getElementById('directMapping');

  var bitsBlock = Math.log2(numBlocks); // Calculates how many bits will give the block
  var bitsWord = Math.log2(blockSize); // Calculates how many bits will give the word
  var binaryAddress = dec2bin(address); // Converts the integer of the addres to a binary string
  var bitsTag = binaryAddress.length - (bitsWord + bitsBlock); // Calculates how many bits will give the tag

  // catches the substring corresponding to what matters
  //var wordBinaryString = binaryAddress.substr(bitsTag+bitsBlock);
  var blockBinaryString = binaryAddress.substr(bitsTag, bitsBlock);

  // final block
  var finalBlockValue = parseInt(blockBinaryString, 2);

  blockAddressHTML.innerHTML = "Endereço por mapeamento direto - bloco: " + finalBlockValue;

  


  return false;
}



// Function that gets the input values to start calculating
function getValues() {

  var cacheSizeString = document.getElementById('cacheSize');
  if (cacheSizeString.value) // check if there is, indeed, a input value
    var cacheSize = parseInt(cacheSizeString.value); // numeric int value of cache size input
  else {
    alert('Você precisa passar um valor para o tamanho da memória cache!');
    return false;
  }


  var blockSizeString = document.getElementById('blockSize');
  if (blockSizeString.value) // check if there is, indeed, a input value
    var blockSize = parseInt(blockSizeString.value); // numeric int value of block size input
  else {
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
  return calculateMapping(cacheSize, blockSize, address);
}
