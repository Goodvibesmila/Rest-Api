const main = document.querySelector("main");
const Modell = document.querySelector(".Modell");
const color = document.querySelector(".color");
const price = document.querySelector(".price");
const button = document.querySelector("button");
const carlist = document.querySelector(".carlist");

button.addEventListener("click", (e) => {
    addcar();
}
    );

// async funktion, bara att skriva async före funktion.
// await fetch funkar bara med async och tvärtom.

async function getDataFromJson() {
    const get = await fetch ('http://localhost:3000/api/cars')
    const translate = await get.json()

    translate.forEach(element => {
        const paragraph = document.createElement("p");
        paragraph.innerText = element.Modell
        carlist.appendChild(paragraph);
    });

    console.log(translate);
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
