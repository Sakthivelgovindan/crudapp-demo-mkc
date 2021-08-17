const { DB } = require("./../../../database/db");

const getProduct = async (req, res) => {
  try {

    const { productId } = req.params;
    let productDetails;

    if (productId) {
      productDetails = await DB().query(
        `SELECT * FROM productDetails WHERE productId  = ?`,
        [productId]
      );
    } else {
      productDetails = await DB().query('SELECT * FROM productDetails');
    }

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
    res.send({ getStatus: productList.length ? true : false, productList });

  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

module.exports = { getProduct }
