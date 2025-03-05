
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.render('todos', { todos });
};

exports.createTodo = async (req, res) => {
  await Todo.create({ title: req.body.title });
  res.redirect('/todos');
};

exports.updateTodo = async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect('/todos');
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todos');
};

console.log("todos controller loaded");
