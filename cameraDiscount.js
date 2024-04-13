const fs = require('node:fs');
const path = require('node:path');

const algoliasearch = require('algoliasearch');
require('dotenv').config();

const pushModifiedProductList = async () => {
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/products.json'), 'utf8')
  );

  const updatedProductList = products.map((product) => {
    if (product.hierarchicalCategories.lvl0.toLowerCase().includes('cameras')) {
      return {
        ...product,
        price: Math.floor((product.price / 100) * 80),
        discount: 20,
      };
    }
    return product;
  });

  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );

  const index = client.initIndex(process.env.ALGOLIA_INDEX);

  await index.saveObjects(updatedProductList).wait();
};

(async () => {
  try {
    await pushModifiedProductList();
  } catch (error) {
    console.error(error);
  }
})();
