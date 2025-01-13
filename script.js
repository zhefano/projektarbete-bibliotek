/**
 * DEMODAG - PRESENTATIONER
 *
 * Leo: displayAllBooks, overlay (båda add- & show),
 * Noel: sorteringskoden
 * William: formuläret
 */

const bookSection = document.querySelector("#books");

document.getElementById("addBook").addEventListener("submit", function (event) {
  //Hämtar formuläret och lägger till eventlyssnare

  const form = event.target; //refererar till formuläret som utlöst händelsen
  const formData = new FormData(form); //inbyggt objekt som skapar nyckel-värde par av formulärets input.
  const jsonObject = {}; //skapar en tom variabel för json objectet

  formData.forEach((value, key) => {
    //itererar över varje par i formData
    jsonObject[key] = value; //för varje par läggs det in i jsonObject
  });

  const jsonString = JSON.stringify(jsonObject); //gör om jsonObject till en JSON string

  fetch("http://localhost:3000/books", {
    //går till objektet books i json-filen
    method: "POST", //ska lägga till
    body: jsonString, //vart och vad
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Boken har laggts till!");
    })
    .catch((error) => {
      alert("Det gick inte att lägga till boken!", error);
    });
});

function sort(type) {
  document.querySelectorAll(".sortBtn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeButton = document.getElementById(
    "sortBy" + type.charAt(0).toUpperCase() + type.slice(1) + "Btn"
  );
  activeButton.classList.add("active");

  if (type === "year") {
    this.books.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  } else {
    this.books.sort((a, b) => {
      let first = a[type].toLowerCase();
      let second = b[type].toLowerCase();
      return first.localeCompare(second);
    });
  }
  displayAllBooks(this.books);
  addOverlay();
  addDeleteToAllButtons();

  console.log("sort");
}

function displayAllBooks(books) {
  let displayAllBooks = "";
  books.map((book) => {
    displayAllBooks += `<article class="bookCard">
    <div class="bookImage" data-id=${book.id}>
      <img src=${book.image} alt=""  />
    </div>
    <div class="bookContent">
      <div class="bookHeading">
        <h3>${book.title}</h3>
        <h4>${book.author}, ${book.year}</h4>
        <h4>${book.genre}</h4>
      </div>
      <div class="bookInfoDesktop">
        <span> ${book.description} </span> 
      </div>
      <button class="bookBtn" id="${book.id}">
        <img src="icons/binIcon.png" alt="Papperskorg" />
      </button>
    </div>
    </article>`;
  });
  bookSection.innerHTML = displayAllBooks;
}

//Funktion som tar in knappen som tryckts som argument och sedan tar bort
//innehållet av json objektet med samma id som knappen
function deleteBook(btn) {
  console.log("klick", btn.id);

  if (confirm("Är du säker på att du vill ta bort boken?")) {
    fetch(`http://localhost:3000/books/${btn.id}`, {
      method: "DELETE",
    });
  }
}

function addDeleteToAllButtons() {
  //Hämtar in alla knappar med klassen "bookBtn"
  const allBtns = document.querySelectorAll(".bookBtn");

  //Loopa igenom knapparna och ge dom eventlisteners för knapp tryck
  allBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteBook(btn);
    });
  });
}

function addOverlay() {
  const allBooks = document.querySelectorAll(".bookImage");
  const overlay = document.querySelector("#overlay");

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  allBooks.forEach((bookElement) => {
    bookElement.addEventListener("click", () => {
      showOverlay(bookElement);
    });
  });
}



function showOverlay(bookElement) {
  const bookId = bookElement.dataset.id;
  console.log("click", bookId);
  let displayBookOverlay = "";

  fetch(`http://localhost:3000/books/${bookId}`)
    .then((res) => res.json())
    .then((book) => {
      overlay.style.display = "flex";

      displayBookOverlay += `<article class="bookOverlay">
        
          <img src= ${book.image} alt="" class="overlayBookImage"/>
        
        <div class="overlayContent">
          <div class="overlayHeading">
            <h3>${book.title}</h3>
            <h4>${book.author}, ${book.year}</h4>
            <h4>${book.genre}</h4>
          </div>
          <div class="overlayInfo">
            <p>${book.description}</p>
          </div>
        </div>
      </article>`;
      overlay.innerHTML = displayBookOverlay;
    })
    .catch((error) => {
      console.log("Error fetching book data for overlay:", error);
    });
}

/* Metod för att fetcha json-data */
function getJson() {
  return fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      this.books = data;
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function start() {
  getJson()
    .then((data) => {
      displayAllBooks(data);
      addOverlay();
      addDeleteToAllButtons();
    })
    .catch((error) => {
      console.log("Fel vid startup:", error);
    });
}

start();
