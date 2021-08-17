const { DB } = require("../../../database/db");

const updateLoginAt = async (userEmail) => {
  const loginAt = Math.floor(Date.now() / 1000);

  await DB().query(
    `UPDATE userDetails SET loginAt = ?,userStatus = ? WHERE userEmail = ?`,
    [loginAt, "login", userEmail]);

}

const checkUserExists = async (email) => {
  const userDetails = await DB().query(
    `SELECT * FROM userDetails WHERE userEmail  = ?`,
    [email]
  );

  return { userStatus: userDetails.length ? true : false }
}

const checkUserAndPasswordExists = async (email, password) => {

  const userAndPasswordDetails = await DB().query(
    `SELECT * FROM userDetails WHERE userEmail  = ? AND userPassword = ?`,
    [email, password]
  );
  if (userAndPasswordDetails.length) {
    await updateLoginAt(email);

    const userList = userAndPasswordDetails.map((user) => {
      const {
        userId,
        userEmail,
        loginAt
      } = user;

      return {
        userId,
        userEmail,
        loginAt
      }
    });
    return { user: true, password: true, userData: userList[0] }
  } else {
    const { userStatus } = await checkUserExists(email);
    return { user: userStatus, password: true, userData: {} }
  }
}

const logIn = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const signInResult = await checkUserAndPasswordExists(userEmail, userPassword);
    res.send(signInResult);

  } catch (error) {
    throw error;
  } finally {
    await DB().close();
  }
}

module.exports = { logIn }
