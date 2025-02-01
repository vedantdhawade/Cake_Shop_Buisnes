import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWTKEY, {
    expiresIn: "5h",
  });

  return token;
};

export default generatedAccessToken;
