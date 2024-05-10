const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModule = require("../module/users/user.module");

const adminAuthorization = async (req, res, next) => {
  return await getAuthorization("ADMIN", req, res, next);
};

const userAuthorization = async (req, res, next) => {
  return await getAuthorization("USER", req, res, next);
};

const getAuthorization = async (role, req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    return res.status(401).json({ error: "Authorization token not found" });
  }

  const [authType, authToken] = auth.split(" ");

  if (authType !== "Bearer") {
    return res.status(401).json({ error: "Authorization type is not valid" });
  }
  try {
    const verifiedTokenData = await verifyToken(authToken);
    const user = await userModule.findOne({ _id: verifiedTokenData.id });
    if (!user.active) {
      return res.status(401).json({ error: "User bolocked by Admin" });
    }
    //Check role
    if (user.role !== role) {
      return res.status(403).json({
        status: 403,
        message: "You are not allowed to use this service",
      });
    }
    req.user = {
      id: user._id,
      role: user.role,
      active: user.active,
      user_name: user.user_name,
    };
    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ error: "Authorization expired. Login again..." });
  }
};

const authentificate = async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(500).send({
      status: "ERROR",
      message: "userName or password is NOT FOUND",
    });
  }
  const user = await userModule.findOne({ userName });
  // check whether user exists or not
  if (!user) {
    return res
      .status(404)
      .json({ error: "User is not found: Invalid username" });
  }
  // check user's status
  if (user.blocked) {
    return res
      .status(403)
      .json({ error: "This account has been blocked by admin" });
  }
  //check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }
  const token = generateToken(user._id);
  req.token = token;

  next();
};

const generateToken = async (id) => {
  return await jwt.sign({ id }, "secret", { expiresIn: "1h" });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, "secret");
};

module.exports = {
  authentificate,
  userAuthorization,
  adminAuthorization,
  generateToken,
};
