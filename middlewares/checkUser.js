export default async function checkUser(req, res, next) {
  const { hf_token } = req.cookies;
  if (!hf_token) {
    return res.status(401).send({
      ok: false,
      message: "Unauthorized",
    });
  }
  next();
}
