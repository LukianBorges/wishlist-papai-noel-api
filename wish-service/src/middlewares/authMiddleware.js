const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato do token inválido (use: Bearer TOKEN)' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET não configurado no serviço' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (!decoded?.user_id) {
      return res.status(401).json({ error: 'Token inválido (sem user_id)' });
    }

    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;
