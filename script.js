const main = document.querySelector("main");
const Modell = document.querySelector(".Modell");
const color = document.querySelector(".color");
const price = document.querySelector(".price");
const button = document.querySelector("button");
const carlist = document.querySelector(".carlist");
const Idchange = document.querySelector(".Idchange");
const Modellchange = document.querySelector(".Modellchange");
const colorchange = document.querySelector(".colorchange");
const pricechange = document.querySelector(".pricechange");
const buttonchange = document.querySelector(".buttonchange");
const Id = document.querySelector(".Id");
const removebutton = document.querySelector(".removebutton");
const caroftheweek = document.querySelector(".caroftheweek");

button.addEventListener("click", (e) => {
    addcar();
});

buttonchange.addEventListener("click", (e) => {
    changecar(Idchange.value);
});

        
removebutton.addEventListener("click", (e) => {
    deletecar(Id.value);
});

async function getDataFromJson() {
    const get = await fetch ('http://localhost:3000/api/cars')
    const translate = await get.json()

    translate.forEach(element => {
        const paragraph = document.createElement("p");
        paragraph.innerText = element.Modell
        carlist.appendChild(paragraph);
        const paragraphforcolor = document.createElement("p");
        paragraphforcolor.innerText = element.color
        carlist.appendChild(paragraphforcolor);
        const paragraphforprice = document.createElement("p");
        paragraphforprice.innerText = element.price
        carlist.appendChild(paragraphforprice);
        const paragraphforId = document.createElement("p");
        paragraphforId.innerText = element.Id
        carlist.appendChild(paragraphforId);
        const br = document.createElement("br");
        carlist.appendChild(br);
        
    });
}

getDataFromJson();


const addcar = async () => {
    const response = await fetch ('http://localhost:3000/api/cars', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        "Modell": Modell.value,
        "color": color.value,
        "price": price.value
    }),
    });
}

const changecar = async (carid) => {
    const response = await fetch (`http://localhost:3000/api/cars/${carid}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        "Modell": Modellchange.value,
        "color": colorchange.value,
        "price": pricechange.value
    }),
    });
}


const deletecar = async (carid) => {
    await fetch (`http://localhost:3000/api/cars/${carid}`, {
    method: "DELETE"})
}


async function getIdFromJson(carid) {
    const get = await fetch (`http://localhost:3000/api/cars/${carid}`)
    const translate = await get.json();

    const weekparagraph = document.createElement("p");
    weekparagraph.innerText = translate.Modell;
    caroftheweek.appendChild(weekparagraph);
}

getIdFromJson(1);
