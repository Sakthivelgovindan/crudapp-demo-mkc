const { DB } = require("./../../../database/db");

const updateProduct = async (req, res) => {
  try {

    const { productName, productPrice, productQuantity, updatedBy, productId } = req.body;
    const updatedAt = Math.floor(Date.now() / 1000);

    const productDetails = await DB().query(
      `UPDATE productDetails SET productName = ?,productPrice= ?,productQuantity = ?, updatedAt = ? ,updatedBy = ? WHERE productId = ?`,
      [productName, productPrice, productQuantity, updatedBy, updatedAt, productId]);


    res.send({ updateStatus: productDetails.affectedRows >= 1 ? true : false });

  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

module.exports = { updateProduct }
