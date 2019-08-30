const fs = require("fs");
const esformatter = require("esformatter");

const options = {
  indent: {
    value: "  "
  },
  lineBreak: {
    before: {
      // at least one line break before BlockStatement
      BlockStatement: ">=1",
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
  appendToFile: (filename, ...templates) => {
    fs.appendFile(filename, templates.join(""), err => {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  },

  saveToFile: (filename, ...templates) => {
    fs.writeFile(
      filename,
      esformatter.format(templates.join(""), options),
      err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );
  },
  openFile: (path) => {
    return fs.readFileSync(path).toString();
  }
};
