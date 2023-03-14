import { Schema, model } from 'mongoose';

interface ITodo {
  id?: String;
  title: String;
  description: String;
}

const TodoSchema = new Schema<ITodo>({
  id: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Todos = model<ITodo>('todos', TodoSchema);

export default Todos;
