document.getElementById("convertButton").addEventListener("click", convertCurrency);

function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    // Mock conversion rates for demonstration (from USD to other currencies)
    const conversionRates = {
        "USD": {
            "EUR": 0.85,
            "GBP": 0.75,
            "CAD": 1.25,
            "JPY": 110,
            "AUD": 1.30,
            "NZD": 1.40,
            "INR": 75,
            "CNY": 6.5,
            "ZAR": 15,
            "USD": 1 // Self conversion
        }
        // Ideally, you'd have rates for each currency to every other currency. This can get complex and is why APIs are generally used.
    };

    const convertedAmount = amount * conversionRates[fromCurrency][toCurrency];
    document.getElementById("result").textContent = `${amount} ${fromCurrency} is approximately ${convertedAmount.toFixed(2)} ${toCurrency}.`;
}
