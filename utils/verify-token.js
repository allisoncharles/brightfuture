import jwt from "jsonwebtoken";

function verifyToken(headers) {
  // console.log(headers);
  const token = headers.authorization.split(/\s/)[1];
  if (!token) {
    return { authUser: null };
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  return { authUser: decodedToken };
}

export default verifyToken;
