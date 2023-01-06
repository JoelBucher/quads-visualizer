export function booleanCombinations(size){
    var output = []
    for (let i = 0; i < (1 << size); i++) {
        let boolArr = [];
        
        //Increasing or decreasing depending on which direction
        //you want your array to represent the binary number
        for (let j = size - 1; j >= 0; j--) {
            boolArr.push(Boolean(i & (1 << j)));
        }
        output.push(boolArr)
    }
    return output
}

// calculate all permutations of an array
export function permutator(inputArr) {
    var results = [];
  
    function permute(arr, memo) {
      var cur, memo = memo || [];
  
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
      return results;
    }
    return permute(inputArr);
}

export function symmetricPermutator(inputArr){
  const permutations = permutator(inputArr)

  var res = new Array()

  for(var i=0; i<permutations.length; i++){
    const elem = permutations[i];

    if(elem[0] < elem[elem.length-1]){
      res.push(elem)
    }
  }
  return res
}

// n choose k for arrays
export function choose(arr, k, prefix=[]) {
    if (k == 0){
        return [prefix]
    };
    return arr.flatMap((v, i) =>
        choose(arr.slice(i+1), k-1, [...prefix, v])
    );
}