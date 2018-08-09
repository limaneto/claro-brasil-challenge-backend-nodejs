const get = (p, o) => p.split('.').reduce((xs, x) => ((xs && xs[x]) ? xs[x] : null), o);

export { get };
