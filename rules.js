/* Bazinco scoring rules, shared by index.html (phone game) and table.html (Table Mode).
   Change a rule here and it changes in both games. */
(function(root){
  var BAZ_PTS=25, UPPER_BONUS_AT=63, UPPER_BONUS=35;
  function calcScore(id,d){
    d=d.map(Number);
    var cnt=[0,0,0,0,0,0,0];d.forEach(function(v){cnt[v]++;});
    var sum=d.reduce(function(a,b){return a+b;},0);
    switch(id){
      case 'ones':return cnt[1];case 'twos':return cnt[2]*2;case 'threes':return cnt[3]*3;
      case 'fours':return cnt[4]*4;case 'fives':return cnt[5]*5;case 'sixes':return cnt[6]*6;
      case 'threeKind':return cnt.some(function(c){return c>=3;})?sum:0;
      case 'fourKind':return cnt.some(function(c){return c>=4;})?sum:0;
      case 'fullHouse':return(cnt.some(function(c){return c===3;})&&cnt.some(function(c){return c===2;}))?25:0;
      case 'smStraight':{var u=Array.from(new Set(d)).sort(function(a,b){return a-b;}).join('');return(u.indexOf('1234')>=0||u.indexOf('2345')>=0||u.indexOf('3456')>=0)?30:0;}
      case 'lgStraight':{var w=Array.from(new Set(d)).sort(function(a,b){return a-b;}).join('');return(w==='12345'||w==='23456')?40:0;}
      case 'chance':return sum;
      default:return 0;
    }
  }
  function isBazinco(d,n){n=n||5;d=d.map(Number);return d.length===n&&d.every(function(v){return v>0&&v===d[0];});}
  function upperBonus(upperSum){return upperSum>=UPPER_BONUS_AT?UPPER_BONUS:0;}
  root.BazRules={calcScore:calcScore,isBazinco:isBazinco,upperBonus:upperBonus,BAZ_PTS:BAZ_PTS,UPPER_BONUS_AT:UPPER_BONUS_AT,UPPER_BONUS:UPPER_BONUS};
})(typeof window!=='undefined'?window:globalThis);
