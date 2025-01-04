import { useState, useEffect } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  published: string;
}

const BookPage = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // TODO: Fetch books from API
    const dummyBooks: Book[] = [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
      { id: 2, title: '1984', author: 'George Orwell', published: '1949' },
    ];
    setBooks(dummyBooks);
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookPage;
