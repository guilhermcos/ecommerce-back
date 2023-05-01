export default function schemaValidate(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(422).send(err.message);
    }
  };
}
