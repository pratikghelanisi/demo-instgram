const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const Sanitize = (params) => {
  return DOMPurify.sanitize(params);
};
module.exports = Sanitize;
