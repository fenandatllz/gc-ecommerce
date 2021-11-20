'use strict'

const getJSON = async () => {
    let Desarollos = fetch("./data/details.json")
    return await (await Desarollos).json()
}

const data = await getJSON()


const cards = document.getElementById("cards")

data.map((i, index) => {
    let card = document.createElement('a')
    card.href = `details.html?index=${index}`
    card.classList = "card"
    card.innerHTML = `
            <div class="desarrollo">
                <div class="nombre-desarrollo">${i.fracionamiento}</div>
                    <img src="${i.img}">
                    <div class="capa"><img src="${i.logo}" alt=""></div>
            </div>
        `
    cards.appendChild(card)
})
