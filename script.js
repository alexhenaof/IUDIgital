// Lista de libros registrados
const bookList = [{ title: "El Gran Libro", author: "Autor A", pages: 300, code: "GL001", isbn: "978-1234567890", publisher: "Editorial X" },
{ title: "La Aventura", author: "Autor B", pages: 250, code: "LA002", isbn: "978-9876543210", publisher: "Editorial Y" },
{ title: "Historias Cortas", author: "Autor C", pages: 180, code: "HC003", isbn: "978-5555555555", publisher: "Editorial Z" },
{ title: "El Viaje", author: "Autor D", pages: 400, code: "EV004", isbn: "978-1112223333", publisher: "Editorial W" },
{ title: "Misterio en la Montaña", author: "Autor E", pages: 320, code: "MM005", isbn: "978-9998887777", publisher: "Editorial V" }];

// Lista de usuarios registrados con libros asignados (datos ficticios)
const userList = [{ name: "Juan Pérez", code: "JP001", phone: "123-456-7890", address: "Calle 123, Ciudad A", booksAssigned: [] },
{ name: "María González", code: "MG002", phone: "987-654-3210", address: "Avenida XYZ, Ciudad B", booksAssigned: [] },
{ name: "Carlos Rodríguez", code: "CR003", phone: "555-555-5555", address: "Calle ABC, Ciudad C", booksAssigned: [] },
{ name: "Luisa Martínez", code: "LM004", phone: "111-222-3333", address: "Avenida 456, Ciudad D", booksAssigned: [] },
{ name: "Pedro Sánchez", code: "PS005", phone: "999-888-7777", address: "Calle ZZZ, Ciudad E", booksAssigned: [] }
];

// Asignar un libro a cada usuario
userList[0].booksAssigned.push("El Gran Libro");
userList[1].booksAssigned.push("La Aventura");
userList[2].booksAssigned.push("Historias Cortas");
userList[3].booksAssigned.push("El Viaje");
userList[4].booksAssigned.push("Misterio en la Montaña");

// Función para mostrar libros en la lista
function displayBooks() {
    const bookListUl = document.getElementById("book-list-ul");
    bookListUl.innerHTML = "";

    bookList.forEach((book, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${book.title} - ${book.author}`;
        bookListUl.appendChild(listItem);
    });
}

// Función para mostrar usuarios en la lista
function displayUsers() {
    const userListUl = document.getElementById("user-list-ul");
    userListUl.innerHTML = "";

    userList.forEach((user, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${user.name} (Código: ${user.code})`;
        if (user.booksAssigned.length > 0) {
            listItem.innerHTML += `<br>Libros asignados: ${user.booksAssigned.join(", ")}`;
        }
        userListUl.appendChild(listItem);
    });
}

// Función para cargar usuarios en el select
function loadUsers() {
    const userSelect = document.getElementById("user-select");

    userList.forEach((user, index) => {
        const option = document.createElement("option");
        option.value = user.code;
        option.textContent = `${user.name} (Código: ${user.code})`;
        userSelect.appendChild(option);
    });
}

// Función para cargar libros en el select
function loadBooks() {
    const bookSelect = document.getElementById("book-select");

    bookList.forEach((book, index) => {
        const option = document.createElement("option");
        option.value = book.title;
        option.textContent = `${book.title} - ${book.author}`;
        bookSelect.appendChild(option);
    });
}

// Función para asignar un libro a un usuario
function assignBook() {
    const selectedUser = document.getElementById("user-select").value;
    const selectedBook = document.getElementById("book-select").value;
    const loanDate = document.getElementById("loan-date").value;
    const returnDate = document.getElementById("return-date").value;

    const user = userList.find((user) => user.code === selectedUser);

    if (user) {
        user.booksAssigned.push(selectedBook);

        // Mostrar un mensaje de éxito usando SweetAlert
        Swal.fire({
            icon: "success",
            title: "Libro asignado",
            text: `El libro "${selectedBook}" ha sido asignado a ${user.name}.`,
        });

        // Limpiar el formulario después de la asignación
        document.getElementById("assign-book-form").reset();
        displayUsers(); // Actualizar la lista de usuarios
    }
}

// Event listener para el botón de asignar libro
document.getElementById("assign-book-button").addEventListener("click", assignBook);

// Función para buscar libros por título o autor
/* function searchBook() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const bookListUl = document.getElementById("book-list-ul");
    bookListUl.innerHTML = "";

    bookList.forEach((book, index) => {
        if (book.title.toLowerCase().includes(searchInput) || book.author.toLowerCase().includes(searchInput)) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${book.title} - ${book.author}`;
            bookListUl.appendChild(listItem);
        }
    });
} */


// Función para buscar libros por título o autor y mostrar el resultado en un popup
/* function searchBook() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();

  // Buscar el usuario que tiene el libro
  const userWithBook = userList.find((user) => {
      return user.booksAssigned.some((book) => book.toLowerCase().includes(searchInput));
  });

  if (userWithBook) {
      // Mostrar un popup con el resultado
      Swal.fire({
          icon: "info",
          title: "Resultado de la Búsqueda",
          html: `Usuario: ${userWithBook.name}<br>Libro Asignado: ${userWithBook.booksAssigned.join(", ")}`,
      });
  } else {
      // Mostrar un mensaje si no se encuentra el resultado
      Swal.fire({
          icon: "error",
          title: "No se encontraron resultados",
          text: "No se encontró ningún usuario con el libro buscado.",
      });
  }
} */


// Función para buscar libros por título o autor y mostrar el resultado en un popup
function searchBook() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();

  // Buscar el usuario que tiene el libro
  const userWithBook = userList.find((user) => {
      return (
          user.name.toLowerCase().includes(searchInput) || // Buscar por nombre de usuario
          user.code.toLowerCase().includes(searchInput) || // Buscar por código de usuario
          user.booksAssigned.some((book) => book.toLowerCase().includes(searchInput)) // Buscar en libros asignados
      );
  });

  if (userWithBook) {
      // Mostrar un popup con el resultado
      Swal.fire({
          icon: "info",
          title: "Resultado de la Búsqueda",
          html: `Usuario: ${userWithBook.name}<br>Código: ${userWithBook.code}<br>Libro Asignado: ${userWithBook.booksAssigned.join(", ")}`,
      });
  } else {
      // Mostrar un mensaje si no se encuentra el resultado
      Swal.fire({
          icon: "error",
          title: "No se encontraron resultados",
          text: "No se encontró ningún usuario con el nombre o código buscado o el libro no está asignado a ningún usuario.",
      });
  }
}

// Función para registrar un libro
function registerBook() {
  const bookTitle = document.getElementById("book-title").value;
  const bookAuthor = document.getElementById("book-author").value;

  if (bookTitle && bookAuthor) {
      bookList.push({ title: bookTitle, author: bookAuthor });
      displayBooks();

      // Mostrar un mensaje de éxito usando SweetAlert
      Swal.fire({
          icon: "success",
          title: "Libro registrado",
          text: "El libro ha sido registrado con éxito.",
      });

      // Limpiar el formulario después del registro
      document.getElementById("book-registration-form").reset();
  }
}

// Función para registrar un usuario
function registerUser() {
  const userName = document.getElementById("user-name").value;
  const userCode = document.getElementById("user-code").value;

  if (userName && userCode) {
      userList.push({ name: userName, code: userCode, booksAssigned: [] });
      displayUsers();

      // Mostrar un mensaje de éxito usando SweetAlert
      Swal.fire({
          icon: "success",
          title: "Usuario registrado",
          text: "El usuario ha sido registrado con éxito.",
      });

      // Limpiar el formulario después del registro
      document.getElementById("user-registration-form").reset();
  }
}



// Event listeners para los botones de registro y búsqueda
document.getElementById("register-book-button").addEventListener("click", registerBook);
document.getElementById("register-user-button").addEventListener("click", registerUser);
document.getElementById("search-button").addEventListener("click", searchBook);

// Mostrar libros y usuarios iniciales
displayBooks();
displayUsers();


// Función para actualizar la lista de usuarios en el select
function updateUsersList() {
  const userSelect = document.getElementById("user-select");
  userSelect.innerHTML = "";

  userList.forEach((user, index) => {
      const option = document.createElement("option");
      option.value = user.code;
      option.textContent = `${user.name} (Código: ${user.code})`;
      userSelect.appendChild(option);
  });
}

// Función para actualizar la lista de libros en el select
function updateBooksList() {
  const bookSelect = document.getElementById("book-select");
  bookSelect.innerHTML = "";

  bookList.forEach((book, index) => {
      const option = document.createElement("option");
      option.value = book.title;
      option.textContent = `${book.title} - ${book.author}`;
      bookSelect.appendChild(option);
  });
}

// Event listener para el botón de actualizar lista de libros y usuarios
document.getElementById("update-lists-button").addEventListener("click", () => {
  updateUsersList();
  updateBooksList();
});

updateUsersList();
updateBooksList();

