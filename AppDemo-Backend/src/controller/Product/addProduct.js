const { DB } = require("./../../../database/db");

const generateProductId = async () => {
  try {
    const data = await DB().query('SELECT * FROM productDetails');
    return `product_${data.length + 1}`;
  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

const addProduct = async (req, res) => {
  try {
    const { productName, productQuantity, productPrice, addedBy } = req.body;

    const addedAt = Math.floor(Date.now() / 1000);
    const productId = await generateProductId();

    // const product = {
    //   productId: productId,
    //   productName: productName,
    //   productQuantity: productQuantity,
    //   productPrice: productPrice,
    //   addedAt: addedAt,
    //   addedBy: addedBy,
    //   updatedAt: 0,
    //   updatedBy: "-"
    // };

    // const { affectedRows } = await DB().query('INSERT INTO productDetails SET ?', product);

    const { affectedRows } = await DB().query(
      `INSERT INTO productDetails (productId,productName,productQuantity,productPrice,addedBy,addedAt,updatedBy,updatedAt) values (?,?,?,?,?,?,?,?)`,
      [productId, productName, productQuantity, productPrice, addedBy, addedAt, 0, '-']
    );

    const productDetails = await DB().query('SELECT * FROM productDetails');

    const productList = productDetails.map((product) => {
      const {
        productId,
        productName,
        productQuantity,
        productPrice
      } = product;

      return {
        productId, productName, productQuantity, productPrice
      }
    }).reverse();

    res.send({ addStatus: affectedRows >= 1 ? true : false, productList });

  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

module.exports = { addProduct }
