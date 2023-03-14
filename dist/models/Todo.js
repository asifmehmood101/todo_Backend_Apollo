import { Schema, model } from 'mongoose';
const TodoSchema = new Schema({
    id: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
});
const Todos = model('todos', TodoSchema);
export default Todos;
