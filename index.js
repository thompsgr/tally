function tally(name = 'Tally') {

  let tallies = {}, arePercentages = false;

  function up(item, amt = 1) {
    tallies[item] = (tallies.hasOwnProperty(item)) ? tallies[item] + amt :  amt ;
    return tallies[item];
  }

  function allNumeric(arr) {
    return arr.every(function(i) { return !isNaN(i) && Number.isInteger(Number.parseFloat(i)); });
  }

  function items() {
    let sorted = {};
    let itemKeys = Object.keys(tallies);
    if (allNumeric(itemKeys)) {
      itemKeys.sort(function(a,b) { return a - b; });
    }
    else {
      itemKeys.sort();
    }
    itemKeys.forEach(function(k) {
      sorted[k] = tallies[k];
    });
    return sorted;
  }

  function length() {
    return Object.keys(tallies).length;
  }

  function total() {
    return Object.values(tallies).reduce(function(a,b) { return a + b; }, 0);
  }

  function percent(den) {

    if (arePercentages) return me;

    arePercentages = true;
    if (typeof(den) === 'undefined') {
      name += ' (% of total)';
      den = total();
    }
    else {
      name += ' (fill rates)';
    }
    if (den > 0) {
      let keys = Object.keys(tallies);
      keys.forEach(function(k) {
        tallies[k] = parseFloat(tallies[k] * 100 / den);
      });
    }
    return me;

  }

  function map(cols) {
    let mapped = {}, k = '';
    let index_pad = (cols.length < 100) ? 2 : 3 ;
    cols.forEach(function(c,i) {
      k = `${i.toString().padStart(index_pad,'0')}-${c}`;
      mapped[k] = (tallies.hasOwnProperty(i)) ? tallies[i] : 0 ;
    });
    // do I need to do this?
    tallies = Object.assign({},mapped);
    return me;
  }

  function over(floor) {
    let passed = {};
    Object.keys(tallies).forEach(function(k) {
      if (tallies[k] > floor) {
        passed[k] = tallies[k];
      }
    });
    tallies = Object.assign({},passed);
    return me;
  }

  function longest(arr) {
    if (arr.length === 0) return 0;
    if (allNumeric(arr)) {
      return arr.reduce(function(a, b) { return a > b ? a : b }).toString().length;
    }
    else {
      return arr.reduce(function(a, b) { return a.length > b.length ? a : b }).length;
    }
  }

  function formatThousands(int) {
    return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatPercent(pct) {
    return pct.toFixed(2)+"%";
  }

  function log() {
    let s = `${name} \n`;
    let sorted = items();
    let keys = Object.keys(sorted);
    if (keys.length === 0) {
      s += '..none \n';
    }
    else {
      let label_length = longest(keys) + 3;
      let value_length = (arePercentages) ? 7 : formatThousands(longest(Object.values(sorted))) ;
      keys.forEach(function(k) {
        v = (arePercentages) ? formatPercent(sorted[k]) : formatThousands(sorted[k]) ;
        s += `${k.padEnd(label_length, '.')}: ${v.padStart(value_length,' ')} \n`;
       });
    }
    return s;
  }

  var me = {
    up: up,
    items: items,
    length: length,
    total: total,
    percent: percent,
    map: map,
    over: over,
    log: log
  }

  return me;
}

module.exports = tally;
