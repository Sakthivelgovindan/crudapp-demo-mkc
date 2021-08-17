const { DB } = require("./../../../database/db");

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const deleteDetails = await DB().query(
      `DELETE FROM productDetails WHERE productId = ?`, [productId]);


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

    res.send({ deleteStatus: deleteDetails.affectedRows ? true : false, productList });

  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

module.exports = { deleteProduct }
