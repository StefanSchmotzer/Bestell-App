const energiesInBasket = {"energies":[], "amounts":[]};

function init() {
    renderAllEnergyContainer();
    renderEmptyBasket();
}

function renderAllEnergyContainer() {
    for (let indexEnergy = 0; indexEnergy < allEnergies.length; indexEnergy++) {

        const category = allEnergies[indexEnergy].category;
        const name = allEnergies[indexEnergy].name;
        const imageFilename = allEnergies[indexEnergy].imageFilename;
        const description = allEnergies[indexEnergy].description;
        const price = allEnergies[indexEnergy].price.toFixed(2).toString().replace(".", ",") + " €";

        const energyContainerRef = document.getElementById('#Container' + category);
        energyContainerRef.innerHTML += templateEnergyContainer(indexEnergy, name, imageFilename, description, price);
    }
}

function renderBasket() {
    (energiesInBasket.energies.length == 0) ? renderEmptyBasket() : renderFilledBasket();
}

function renderEmptyBasket() {
    document.getElementById('#ShoppingCart').classList.remove("energies-added-to-basket");
    document.getElementById('#AmountEnergies').classList.add("d-none");
    document.getElementById('#BasketAside').innerHTML = templateEmptyBasket();
    document.getElementById('#BasketDialog').innerHTML = templateEmptyBasket();
}

function renderFilledBasket() {
    renderShoppingCartIcon();
    document.getElementById('#BasketAside').innerHTML = templateFilledBasket('Aside');
    document.getElementById('#BasketDialog').innerHTML = templateFilledBasket('Dialog');
    renderEnergiesInBasket('Aside');
    renderEnergiesInBasket('Dialog');
}

function renderShoppingCartIcon() {
    const amountEnergies = energiesInBasket.amounts.reduce((accumulator, currentValue) => accumulator + currentValue,);
    document.getElementById('#ShoppingCart').classList.add("energies-added-to-basket");
    document.getElementById('#AmountEnergies').classList.remove("d-none");
    document.getElementById('#AmountEnergies').innerHTML = amountEnergies;
}

function renderEnergiesInBasket(position) {
    let subtotal = 0;
    const choosenEnergiesRef = document.getElementById(`#ContainerChoosenEnergies${position}`);
    choosenEnergiesRef.innerHTML = "";
    for (let indexBasket = 0; indexBasket < energiesInBasket.energies.length; indexBasket++) {
        const indexEnergy = energiesInBasket.energies[indexBasket];
        const amount = energiesInBasket.amounts[indexBasket];
        const name = allEnergies[indexEnergy].name;
        const basketPrice = (amount * allEnergies[indexEnergy].price);

        subtotal += basketPrice;
        choosenEnergiesRef.innerHTML += templateEnergyCartInBasket(position, indexEnergy, name, amount, basketPrice.toFixed(2).toString().replace(".", ",") + " €");
        toggleDeleteIcon(position, indexEnergy, amount);
    }

    renderMoneyCalculation(position, subtotal);
}

function toggleDeleteIcon(position, indexEnergy, amount) {
    if (amount == 1) {
        document.getElementById(`#DeleteAll${indexEnergy}${position}`).classList.add("d-none");
    } else {
        document.getElementById(`#DeleteOne${indexEnergy}${position}`).innerHTML = `-`;
        document.getElementById(`#DeleteOne${indexEnergy}${position}`).classList.remove("btn-delete-one");
    }
}

function renderMoneyCalculation(position, subtotal) {
    const deliveryFee = 119.40;
    const total = (subtotal + deliveryFee).toFixed(2).toString().replace(".", ",") + " €";

    document.getElementById(`#Subtotal${position}`).innerHTML = subtotal.toFixed(2).toString().replace(".", ",") + " €";
    document.getElementById(`#DeliveryFee${position}`).innerHTML = deliveryFee.toFixed(2).toString().replace(".", ",") + " €";
    document.getElementById(`#Total${position}`).innerHTML = total;
    document.getElementById(`#BuyNow${position}`).innerHTML = `Buy now (${total})`
}

function addToBasket(indexEnergy) {
    if (!energiesInBasket.energies.includes(indexEnergy)) {
        energiesInBasket.energies.push(indexEnergy);
        energiesInBasket.amounts.push(1);
    } else {
        const i = energiesInBasket.energies.indexOf(indexEnergy);
        energiesInBasket.amounts[i] += 1;
    }

    changeAddButton(indexEnergy);
    renderFilledBasket();
}

function deleteOneFromBasket(indexEnergy) {
    const i = energiesInBasket.energies.indexOf(indexEnergy);

    if (energiesInBasket.amounts[i] == 1) {
        energiesInBasket.energies.splice(i, 1);
        energiesInBasket.amounts.splice(i, 1);
    } else {
        energiesInBasket.amounts[i] -= 1;
    }
    
    changeAddButton(indexEnergy);
    renderBasket();
}

function deleteAllFromBasket(indexEnergy) {
    const i = energiesInBasket.energies.indexOf(indexEnergy);

    energiesInBasket.energies.splice(i, 1);
    energiesInBasket.amounts.splice(i, 1);

    changeAddButton(indexEnergy);
    renderBasket();
}

function deleteCompleteBasket() {
    for (let indexBasket = 0; indexBasket < energiesInBasket.energies.length; indexBasket++) {
        const indexEnergy = energiesInBasket.energies[indexBasket];
        const addButtonRef = document.getElementById(`#ButtonAddToBasket${indexEnergy}`);
        addButtonRef.innerHTML = `Add to basket`;
        addButtonRef.classList.remove("btn-added-to-basket");
    }

    energiesInBasket.energies = [];
    energiesInBasket.amounts = [];
    renderEmptyBasket();
}

function changeAddButton(indexEnergy) {
    const addButtonRef = document.getElementById(`#ButtonAddToBasket${indexEnergy}`);
    if (energiesInBasket.energies.includes(indexEnergy)) {
        const i = energiesInBasket.energies.indexOf(indexEnergy);
        const amount = energiesInBasket.amounts[i];

        addButtonRef.innerHTML = `Added ${amount}`;
        addButtonRef.classList.add("btn-added-to-basket");
    } else {
        addButtonRef.innerHTML = `Add to basket`;
        addButtonRef.classList.remove("btn-added-to-basket");
    }
}

function showBasketOverlay() {
    document.getElementById('#BasketDialog').showModal();
    renderBasket();
}

function closeBasketOverlay() {
    document.getElementById('#BasketDialog').close();
}

function showConfirmationOverlay() {
    deleteCompleteBasket();
    closeBasketOverlay();
    document.getElementById('#ConfirmationDialog').showModal();
    document.getElementById('#ConfirmationDialog').innerHTML = templateConfirmationDialog();
    setTimeout(() => closeConfirmationOverlay(), 2000);
}

function closeConfirmationOverlay() {
    document.getElementById('#ConfirmationDialog').close();
}