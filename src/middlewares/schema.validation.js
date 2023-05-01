export function validateSchemaBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(422).send(errorMessage);
    }
    next();
  };
}

export function validateSchemaParams(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(422).send(errorMessage);
    }
    next();
  };
}

export function validateSchemaQuery(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(422).send(errorMessage);
    }
    next();
  };
}
