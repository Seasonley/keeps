function * combinations (arr, n) {
    var chg, p = n - 1, m = arr.length, ids = Array.from(Array(n).keys());
    if (!(m >= n && n >= 2))throw Error('combinations(arr,n) need arr.length>=n>=2');
    for (;ids[0] !== m - n; p = chg ? n - 1 : p, chg = 0) {
      for (;ids[p] <= m - n + p;ids[p]++) yield arr.filter((v, i) => ids.includes(i));
      if (ids[--p] <= m - n + p) chg = ++ids[p];
      if (ids[p + 1] != ids[p] + 1) for (chg = 1, i = p + 1;i < n;i++) ids[i] = ids[i - 1] + 1;
    }
    yield arr.filter((v, i) => ids.includes(i));
  }