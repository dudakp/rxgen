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
        console.debug(`File not found! \n${err}`);
        return;
      }
      console.debug('The file was modified!');
    });
  },

  /**
   * saves to file (rewrites)
   * @param filename - path to file
   * @param templates - stings to appends
   */
  saveToFile: (filename, ...templates) => {
    fs.writeFileSync(
      filename,
      esformatter.format(templates.join(''), options),
      err => {
        if (err) {
          console.debug(`File not found! \n${err}`);
          return;
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
      console.warn(`${path} file not found, generating new file...`);
    }
    return toReturn;
  }
};
