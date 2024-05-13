function getMinMax(str) {
  let arr = str.split(" ");
  
  arr = arr.filter(elem => isFinite(elem))

  let max = Math.max(...arr);
  let min = Math.min(...arr);

  return {
      max,
      min,
  }
}