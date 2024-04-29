console.log("ciao");



const url = "https://striveschool-api.herokuapp.com/books"

// creo variabile vuota
let sommaCarrello = 0; 

function loadbooks() {
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta');
        }
        return response.json();
    })
    .then((books) =>{
        console.log(books);
        let elencoLibri = document.getElementById("elencolibri");
        books.forEach(book => {
            elencoLibri.innerHTML+= `
            <div class="col">
                    <div class="card gap-2 pb-2" style="width: 18rem;">
                        <img src="${book.img}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title paragrafo-troncato">${book.title}</h5>
                            <div class="d-flex gap-3 justify-content-center">
                                <button type="button" class="btn btn-primary carrello">EUR ${book.price}</button>
                                <button type="button" class="btn btn-secondary nascondi">Svuota</button>
                            </div>
                        </div>
                    </div>
                </div>`
                
        })
        aggiungibordoeselezionaelementi(books);
        librifiltrati();
        
       
    })
    .catch(error => {
        // Gestisci gli errori
        console.error('Si è verificato un errore:', error);
    });
}

loadbooks();

   

    // Selezionare tutti gli elementi con la classe "nascondi"
const pulsantiNascondi = document.querySelectorAll(".nascondi");   

function aggiungibordoeselezionaelementi(books) {
        // Selezionare tutti gli elementi con la classe "carrello"
const pulsantiCarrello = document.querySelectorAll(".carrello");
    //xxx    // richiamo l'id dello span in cui deve essere scritta la somma totale dei libri selezionati
    const sommaDelCarrello = document.getElementById("sommadelcarrello")
    // Iterare su tutti i pulsanti e aggiungere un gestore di eventi a ciascuno
    const pulsantiCarrelloArray = Array.from(pulsantiCarrello);
    pulsantiCarrello.forEach(pulsante => {
        pulsante.addEventListener("click", function() {
         
            // Ottieni l'indice del libro associato al pulsante cliccato
        const index = pulsantiCarrelloArray.indexOf(pulsante);
        // Ottieni il libro corrispondente dall'array 'books' utilizzando l'indice
         book = books[index];
            // Aggiungi la classe "bordo" al genitore del pulsante cliccato
            pulsante.parentNode.parentNode.parentNode.classList.add("bordo");
            let listaselezionati = document.getElementById("listaselezionati")
            let lista = document.createElement("p");
            // Utilizza i dati memorizzati nell'attributo data per ottenere il titolo e il prezzo del libro
            let titoloFilm = book.title;
            const prezzo = parseFloat(book.price).toFixed(2);
            lista.innerHTML = `
             <div class="form-control">
            <span> ${titoloFilm}, </span> <span> ${prezzo} </span> <span><button type="button" class="btn btn-danger">X</button></span>
            </div>`;
            listaselezionati.appendChild(lista);
            sommaCarrello += parseFloat(prezzo);
             // inserisco risultato nella cariabile totale carrello
            sommaDelCarrello.innerHTML = sommaCarrello;
           console.log(sommaCarrello);
            rimuovilibro();
        });
 
    });
   
}



function rimuovilibro () {
    const rimuovielementi = document.querySelectorAll(".btn.btn-danger") 
         rimuovielementi.forEach(rimuovielemento => {
        rimuovielemento.addEventListener("click", function() {
        rimuovielemento.parentNode.parentNode.remove();
        let classeBordo =  document.querySelectorAll(".bordo");
        classeBordo.forEach( elemento =>{
                   elemento.classList.remove("bordo");
                   
                 });
        });
     });
}

function svuota() {
   
    let sommaDelCarrello= document.getElementById("sommadelcarrello")
    sommaDelCarrello.innerHTML = "";
    let classeform = document.querySelectorAll("#listaselezionati .form-control");
        classeform.forEach(elemento => {
            elemento.remove();
        });
    let bordi = document.querySelectorAll(".bordo");
        bordi.forEach(bordo => {
            bordo.classList.remove("bordo");
        });
    sommaCarrello = 0;
    console.log(sommaCarrello);

}
let testoDaCercare = document.getElementById("ricerca");
console.log(testoDaCercare.value);
let testoInserito = "";

function librifiltrati(){
    testoDaCercare.addEventListener("input", function() {
        // Verifica se il testo inserito ha almeno 3 caratteri
        if (testoDaCercare.value.length >= 3) {
            // Esegui il console log solo se l'utente ha inserito almeno 3 caratteri
            console.log(testoDaCercare.value);
             testoInserito = testoDaCercare.value.toLowerCase(); // Rimuovi toLocaleLowerCase()

             let titoliFilm = document.querySelectorAll (".card-title");
             console.log(titoliFilm);
             
             titoliFilm.forEach(titolo => {
                 let card = titolo.closest('.card'); // Ottieni il genitore .card di titolo
                 if (!titolo.innerText.toLowerCase().includes(testoInserito)) {
                     card.classList.add("d-none"); // Rimuovi il punto da ".d-none"
                 } else {
                     card.classList.remove("d-none"); // Rimuovi il punto da ".d-none"
                 }
                 if (testoInserito.value< 3) {
                    card.classList.remove("d-none");
                 }
             });
             
        }
    });
}





