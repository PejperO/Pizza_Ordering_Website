document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('order-form');
    const pizzaTypeSelect = document.getElementById('pizza-type');
    const quantityInput = document.getElementById('quantity');
    const totalCostParagraph = document.getElementById('total-cost');

    function updateTotalCost() {
        const selectedPizza = pizzaTypeSelect.options[pizzaTypeSelect.selectedIndex];
        const pizzaPrice = parseFloat(selectedPizza.value.split(' - ')[1].replace(' zł', '').trim());
        const quantity = parseInt(quantityInput.value, 10);

        const totalCost = pizzaPrice * quantity + deliveryCost;
        totalCostParagraph.innerHTML = `<strong>Całkowity koszt: ${totalCost.toFixed(2)} zł</strong>`;
    }

    pizzaTypeSelect.addEventListener('change', updateTotalCost);
    quantityInput.addEventListener('input', updateTotalCost);
});

function calculateTotalCost(pizzaPrice, quantity, deliveryCost, restaurant) {
    // Tutaj umieść logikę obliczania całkowitego kosztu (np. cena pizzy * ilość + koszt dostawy)
    return pizzaPrice * quantity + deliveryCost; // Dodaj odpowiednie dane
}
