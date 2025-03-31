// Define the API endpoint
const API_URL = "https://bookstore-api-six.vercel.app/api/books";

// Wait for the DOM to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    fetchBooks(); // Load and display existing books

    // Handle form submission to add a new book
    document.getElementById("book-form").addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent page reload

        // Get user input values
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const publisher = document.getElementById("publisher").value;

        // Proceed only if all fields are filled
        if (title && author && publisher) {
            await addBook({ title, author, publisher }); // Add the new book
            document.getElementById("book-form").reset(); // Clear the form
        }
    });
});

// Fetch books from the API and display them in the table
async function fetchBooks() {
    const booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = "<tr><td colspan='4' class='text-center'>Loading...</td></tr>";

    try {
        const response = await fetch(API_URL); // Send GET request
        const books = await response.json();   // Parse JSON response

        booksContainer.innerHTML = ""; // Clear previous entries

        // Create and append a row for each book
        books.forEach((book) => {
            const row = document.createElement("tr");
            row.id = book.id;
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>
                    <button class="btn delete-btn" onclick="deleteBook('${book.id}')">
                        Delete
                    </button>
                </td>
            `;
            booksContainer.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        booksContainer.innerHTML = "<tr><td colspan='4' class='text-center'>Error loading books</td></tr>";
    }
}

// Send a POST request to add a new book
async function addBook(book) {
    try {
        const booksContainer = document.getElementById("books-container");

        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });

        // Create and append the new book row
        const row = document.createElement("tr");
        row.id = book.id;
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.publisher}</td>
            <td>
                <button class="btn delete-btn" onclick="deleteBook('${book.id}')">
                    Delete
                </button>
            </td>
        `;
        booksContainer.appendChild(row);
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

// Send a DELETE request to remove a book
async function deleteBook(bookId) {
    try {
        await fetch(`${API_URL}/${bookId}`, { method: "DELETE" }); // Delete from API
        document.getElementById(bookId).remove(); // Remove row from DOM
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

