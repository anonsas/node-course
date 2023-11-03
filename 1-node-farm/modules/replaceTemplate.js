const slugify = require('slugify');

const replaceTemplate = (template, product) => {
  let output = template.replaceAll('{%IMAGE%}', product.image);
  output = output.replace('{%PRODUCTNAME%}', product.productName);
  output = output.replace('{%QUANTITY%}', product.quantity);
  output = output.replace('{%FROM%}', product.from);
  output = output.replace('{%NUTRIENTS%}', product.nutrients);
  output = output.replaceAll('{%PRICE%}', product.price);
  output = output.replace('{%DESCRIPTION%}', product.description);
  output = output.replace('{%ID%}', slugify(product.productName, { lower: true }));

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};

module.exports = { replaceTemplate };
