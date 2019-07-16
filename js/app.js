//variable of the url to get the 12 random employees
const url = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById('gallery');

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
                <h3 id="name" class="card-name cap">${emp.name.first}</h3>
                <p class="card-text">${emp.email}</p>
                <p class="card-text cap">${emp.location.city}, ${emp.location.state}</p>
            </div>
        `;

        card.innerHTML = empHTML;
        gallery.appendChild(card);            
    });    
}
