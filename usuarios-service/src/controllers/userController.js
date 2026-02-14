const repo = require('../repositories/userRepository');

async function getAll(req, res) {
  try {
    const users = await repo.getAll();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

async function create(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password são obrigatórios' });

    const user = await repo.create(name, email, password);
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updated = await repo.update(id, name, email);
    if (!updated) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json({ message: 'Usuário atualizado', updated });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;

    const deleted = await repo.remove(id);
    if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.json({ message: 'Usuário removido', deleted });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro ao remover usuário' });
  }
}

module.exports = { getAll, create, update, remove };
