'use strict';

const Obj2Str = Object.prototype.toString;

function parseConstraint(constraint){
  let arr=[];
  const type = typeof constraint;
	//いったん配列化
  if (type === 'string') {
    arr = constraint.split(' ');
  } else if (type === 'number') {
    arr = [constraint];
  } else if(Obj2Str.call(constraint) === '[object Array]') {
    arr = constraint.slice();
  } else {
    throw new TypeError;
  }
	// 32ビット整数かで判定
  for(let i = 0; i < arr.length; ++i) {
    const val = +arr[i];
    arr[i] = val;
    if ((val | 0) !== val) {
      throw new RangeError('Only integers are accepted for constraints.');
    }
  }
	// 正負を無視して昇順に、そして0は最後になるよう並べ替え（NaNはもうない）
  arr.sort(function(a, b){
    if ((a === 0) && (b === 0)) return 0;
    if (a === 0) return 1;
    if (b === 0) return -1;
    return Math.abs(a) - Math.abs(b);
  });
	//矛盾を含んだ条件でないかチェック
  let maxVar = 0;
  for(let i = 0; i < arr.length; ++i) {
    if (maxVar < Math.abs(arr[i])) {
      maxVar = Math.abs(arr[i]);
    }
    if ((i < arr.length-1) && (arr[i] !== 0) && (arr[i] + arr[i+1] === 0)) {
      return {text: '', maxVar: 0};
    }
  }
	//末尾のゼロを1つに
  while(arr[arr.length - 1] === 0) arr.pop();
  arr.push(0);

  return {text: arr.join(' '), maxVar};
}


class SatConstraints{
  constructor(){
    this.clear();
  }

  clear(){
    this.textConstraints=[];
    this.maxVar = 0;
  }

  add(constraint){
    const parsed = parseConstraint(constraint);
    if (parsed.maxVar > 0) {
      this.textConstraints.push(parsed.text);
      if (this.maxVar < parsed.maxVar) {
        this.maxVar = parsed.maxVar;
      }
    }
    return this;
  }

  length(){
    return this.textConstraints.length;
  }

  merge(...others) {
    for(let i=0; i < others.length ; ++i) {
      for(let j = 0; j<others[i].textConstraints.length;++j){
        this.textConstraints.push(others[i].textConstraints[j]);
      }
      if (this.maxVar < others[i].maxVar) this.maxVar = others[i].maxVar;
    }
    return this;
  }

  toDIMACS(){
    return `p cnf ${this.maxVar} ${this.textConstraints.length}\n` +
		this.textConstraints.join('\n');
  }

  static merge(...constraints){
    const ret = new SatConstraints;
    ret.merge(...constraints);
    return ret;
  }

}


module.exports = SatConstraints;
