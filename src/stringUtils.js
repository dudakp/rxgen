module.exports = {
  toCamel: s => {
    return s.replace(/([-_]\w)/g, g => g[1].toUpperCase());
    // return s.replace(/([-_][a-z])/g, $1 => {
    //   return $1
    //     .toUpperCase()
    //     .replace('-', '')
    //     .replace('_', '');
    // });
  },

  toSnake: str => {
    if (!str) return '';
    return String(str)
      .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
      .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '_' + b.toLowerCase())
      .replace(/[^A-Za-z0-9]+|_+/g, '_')
      .toUpperCase();
  }
};
