//variable of the url to get the 12 random employees
const url = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById('gallery');
const modals = [];

//asynchronous functions to get the JSON document from the url
async function getJSON(url) {
    try{
        const resp = await fetch(url);
        return await resp.json();
    } catch(err) {
        throw err;
    }
}
//Returns the array of employees
async function getEmps(url) {
    const empJSON = await getJSON(url);
    return empJSON.results;     
}

getEmps(url)
    //calls the showEmps method so employees can be displayed in the web
    .then(data => showEmps(data))
    .catch( e => {
        gallery.innerHTML = "<h3>OOOOPS... Something went wrong!</h3>";
        console.error(e);
    });

function showEmps(data) {
    data.forEach((emp, index) => {
        //create the HTML card for each employee
        const card = document.createElement('div');
        card.className = 'card';
        //insert the data from emp into the HTML
        const empHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${emp.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${emp.name.first} ${emp.name.last}</h3>
                <p class="card-text">${emp.email}</p>
                <p class="card-text cap">${emp.location.city}</p>
            </div>
        `;

        card.innerHTML = empHTML;
        gallery.appendChild(card);   
        
        //Create modal window objects of employee
        const modal = document.createElement('div');
        modal.className = 'modal-container';

        //Create the modal window in HTML
        const modalHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${emp.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${emp.name.first} ${emp.name.last}</h3>
                    <p class="modal-text">${emp.email}</p>
                    <p class="modal-text cap">${emp.location.city}</p>
                    <hr>
                    <p class="modal-text">${emp.phone}</p>
                    <p class="modal-text cap">${emp.location.street}, ${emp.location.state}, ${emp.location.postcode}</p>
                    <p class="modal-text">Birthday: ${showBirthday(emp.dob.date)}</p>
                </div>
            </div>

        `;

        modal.innerHTML = modalHTML;
        //add the modal to the array
        modals.push(modal);

        //shows the modal when the card is clicked
        card.addEventListener('click', () => {
            gallery.appendChild(modals[index]);  
            closeModal(index)
        });
    });   
}

//gives the proper format to the birthday
function showBirthday(text) { 
    const regex = /(\d{2})(\d{2})-(\d{2})-(\d{2}).*/;
    return text.replace(regex, '$3/$4/$2');
}
//click in the close button so you can close the modal window
function closeModal(index) {
    const closeBtn = document.getElementById('modal-close-btn');
    const modal = document.querySelector('.modal-container');

    closeBtn.addEventListener('click', () => {
       modal.remove();
    });
}