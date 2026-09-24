const xmlns = 'xmlns="http://www.w3.org/2000/svg"';
const viewBoxDelete = 'viewBox="0 0 16 18"';
const pathDelete = 'path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z"'
const viewBoxClose = 'viewBox="0 0 16 16"';
const pathClose = 'path d="M8 9.70342L2.03802 15.6654C1.81496 15.8885 1.53105 16 1.18631 16C0.841572 16 0.557668 15.8885 0.334601 15.6654C0.111534 15.4423 0 15.1584 0 14.8137C0 14.4689 0.111534 14.185 0.334601 13.962L6.29658 8L0.334601 2.03802C0.111534 1.81496 0 1.53105 0 1.18631C0 0.841572 0.111534 0.557668 0.334601 0.334601C0.557668 0.111534 0.841572 0 1.18631 0C1.53105 0 1.81496 0.111534 2.03802 0.334601L8 6.29658L13.962 0.334601C14.185 0.111534 14.4689 0 14.8137 0C15.1584 0 15.4423 0.111534 15.6654 0.334601C15.8885 0.557668 16 0.841572 16 1.18631C16 1.53105 15.8885 1.81496 15.6654 2.03802L9.70342 8L15.6654 13.962C15.8885 14.185 16 14.4689 16 14.8137C16 15.1584 15.8885 15.4423 15.6654 15.6654C15.4423 15.8885 15.1584 16 14.8137 16C14.4689 16 14.185 15.8885 13.962 15.6654L8 9.70342Z"'
 
function templateEnergyContainer(indexEnergy, name, imageFilename, description, price) {
    return `
        <div class="energy-container">
            <img class="energy-img"
                src="./assets/imgs/${imageFilename}" 
                alt="">
            <div class="name-and-description-container">
                <p class="font-24px-600">${name}</p>
                <p class="font-16px-500">${description}</p>
            </div>
            <div class="price-and-add-container">
                <p class="font-24px-600">${price}</p>
                <button id="#ButtonAddToBasket${indexEnergy}" onclick="addToBasket(${indexEnergy})" 
                    class="btn-add-to-basket">
                    Add to basket
                </button>
            </div>
        </div>`
}

function templateEmptyBasket() {
    return `
        <div class="basket">
            <button onclick="closeBasketOverlay()"
                class="btn-close">
                <svg class="close-svg"
                    ${xmlns}
                    ${viewBoxClose}>
                    <${pathClose}>
                    <title>close the basket</title>  
                </svg>
            </button>
            <h3>Your Basket</h3>
            <p class="p-empty-basket">Nothing in your Basket?<br><br>Why?<br><br>The sun gives us Energy for free!<br><br>Look and choose some Energy Parts</p>
            <img class=""
                src="./assets/icons/basket.png" 
                alt="basket-Icon">
        </div>`
}

function templateFilledBasket(position) {
    return `
        <div class="basket">
            <button onclick="closeBasketOverlay()"
                class="btn-close">
                <svg class="close-svg"
                    ${xmlns}
                    ${viewBoxClose}>
                    <${pathClose}>
                    <title>close the basket</title>  
                </svg>
            </button>
            <h3>Your Basket</h3>
            <div id="#ContainerChoosenEnergies${position}"
                class="choosen-energies-container">
                
            </div>
            <div class="money-calculation">
                <table>
                    <tr class="font-20px-600">
                        <td>Subtotal</td>
                        <td id="#Subtotal${position}"></td>
                    </tr>
                    <tr class="font-20px-600">
                        <td>Delivery fee</td>
                        <td id="#DeliveryFee${position}"></td>
                    </tr>
                    <tr class="font-22px-700">
                        <th>Total </th>
                        <th id="#Total${position}"></th>
                    </tr>

                </table>
                <button onclick="showConfirmationOverlay()"
                    id="#BuyNow${position}"
                    class="btn-buy-now">
                </button>  
            </div>
        </div>`
}

function templateEnergyCartInBasket(position, indexEnergy, name, amount, basketPrice) {
    return `
        <div class="choosen-energy-card">
            <div class="choosen-energy-card-child-container">
                <p class="font-22px-700">${amount} x ${name}</p>
                <button onclick="deleteAllFromBasket(${indexEnergy})"
                    id="#DeleteAll${indexEnergy}${position}"
                    class="btn-delete-all">
                    <svg class="delete-svg"
                        ${xmlns}
                        ${viewBoxDelete}>
                        <${pathDelete}>
                        <title>delete all items from Basket</title>  
                    </svg>
                </button>
            </div>
            <div class="choosen-energy-card-child-container">
                <p class="amount-control font-24px-600">
                    <button onclick="deleteOneFromBasket(${indexEnergy})"
                        id="#DeleteOne${indexEnergy}${position}"
                        class="btn-delete-one btn-minus-plus font-24px-600">
                        <svg class="delete-svg"
                            ${xmlns}
                            ${viewBoxDelete}>
                            <${pathDelete}>
                            <title>delete item from Basket</title>  
                        </svg>
                    </button>
                    <span>${amount}</span>
                    <button onclick="addToBasket(${indexEnergy})"
                        class="btn-minus-plus font-24px-600">
                        +
                    </button>
                </p>
                <p class="font-22px-700">${basketPrice}</p>
            </div>
        </div>`
}

function templateConfirmationDialog() {
    return `
        <div class="confirmation-overlay">
            <button onclick="closeConfirmationOverlay()"
                class="btn-close">
                <svg class="close-svg"
                    ${xmlns}
                    ${viewBoxClose}>
                    <${pathClose}>
                    <title>Confirm and close</title>  
                </svg>
            </button>
            <img class=""
                src="./assets/icons/shipping.png" 
                alt="order confirmed">
            <span class="span-confirmation-dialog">
                Order confirmed!
            </span>
            <p class="p-confirmation-dialog">
                Shipping process is started!
            </p>
        </div>`
}