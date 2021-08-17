const { DB } = require("../../../database/db");

const updateLogoutAt = async (userId) => {
  const logoutAt = Math.floor(Date.now() / 1000);

  const { affectedRows } = await DB().query(
    `UPDATE userDetails SET logoutAt = ?,userStatus = ? WHERE userId = ?`,
    [logoutAt, "logout", userId]);



  return {
    logoutStatus: affectedRows >= 1 ? true : false
  }
}


const logOut = async (req, res) => {
  try {
    const { userId } = req.body;
    const logOutResult = await updateLogoutAt(userId);
    res.send(logOutResult);

  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

module.exports = { logOut }
