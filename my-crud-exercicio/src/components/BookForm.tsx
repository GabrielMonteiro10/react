import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, getBookById, updateBook } from '../services/api';
interface Book {
 name: string;
 description: string;
 price: number;
 quantity: number;
}
function BookForm() {
 const { id } = useParams<{ id: string }>();
 const navigate = useNavigate();
 const [book, setBook] = useState<Book>({
 name: '',
 description: '',
 price: 0,
 quantity: 0,
 });
 useEffect(() => {
 if (id) {
 loadBook();
 }
 }, [id]);
 const loadBook = async () => {
 try {
 const response = await getBookById(id as string);
 setBook(response.data);
 } catch (error) {
 console.error("Error loading book data", error);
 }
 };
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 setBook({
 ...book,
 [e.target.name]: e.target.value,
 });
 };
 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 try {
 if (id) {
 await updateBook(id, book);
 } else {
 await createBook(book);
 }
 navigate('/');
 } catch (error) {
 console.error("Error saving book", error);
 }
 };
 return (
 <form onSubmit={handleSubmit}>
 <div>
 <label>Name</label>
 <input
 type="text"
 name="name"
 value={book.name}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Description</label>
 <input
 type="text"
 name="description"
 value={book.description}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Price</label>
 <input
 type="number"
 name="price"
 value={book.price}
 onChange={handleChange}
 />
 </div>
 <div>
 <label>Quantity</label>
 <input
 type="number"
 name="quantity"
 value={book.quantity}
 onChange={handleChange}
 />
 </div>
 <button type="submit">Save</button>
 </form>
 );
}
export default BookForm;