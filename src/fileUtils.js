const fs = require('fs');
const esformatter = require('esformatter');

const options = {
  indent: {
    value: '  '
  },
  lineBreak: {
    before: {
      // at least one line break before BlockStatement
      BlockStatement: '>=1',
      // only one line break before DoWhileStatementOpeningBrace
      DoWhileStatementOpeningBrace: 1
      // ...
    }
  },
  whiteSpace: {
    // ...
  }
};

module.exports = {
  /**
   *  appeds text to EOF
   * @param filename - path to file
   * @param templates - stings to append
   */
  appendToFile: (filename, ...templates) => {
    fs.appendFile(filename, templates.join(''), err => {
      if (err) {
        return console.debug(err);
      }
      console.debug('The file was saved!');
    });
  },

  /**
   * saves to file (rewrites)
   * @param filename - path to file
   * @param templates - stings to appends
   */
  saveToFile: (filename, ...templates) => {
    fs.writeFile(
      filename,
      esformatter.format(templates.join(''), options),
      err => {
        if (err) {
          return console.debug(err);
        }
        console.debug('The file was saved!');
      }
    );
  },

  /**
   * reads file and returns content as string
   * @param path - path to file
   * @returns {string} - string from file
   */
  openFileToString: path => {
    let toReturn;
    try {
      toReturn = fs.readFileSync(path).toString();
    } catch (e) {
      console.warn(`${path} file not found, creating new...`, e);
    }
    console.debug(`File ${path}  found. Adding to file...`);
    return toReturn;
  }
};
