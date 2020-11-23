import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../src/services/exchange.service.js';



function displayError() {
  $('#error').html(`<small style="color:red">Sincerest apologies, dear currency conversion seeker, but it appears the interweb overlords are denying the entered currency you requested to convert!<br>Please select another currency or contact our chief tech consultant below who you'll notice also moonlights as our chief financial consultant.</small>`);
}

function clearFields() {
  $("#baseCurrency, #baseAmount, #targetCurrency").on("focus", function() {
    $("#targetAmount").val('');
    $("#error").empty();
  });
}

function setUpEventListeners() {
  clearFields();
}

$(document).ready(function() {
  setUpEventListeners();

  $("#form").on("submit", function(e) {
    e.preventDefault();

    let baseCurrencyInput, baseAmountInput, targetCurrencyInput, storageCheck;
    baseCurrencyInput = $("#baseCurrency").val();
    baseAmountInput = $("#baseAmount").val();
    targetCurrencyInput = $("#targetCurrency").val();
    storageCheck = Object.keys(sessionStorage).includes(`rates_${baseCurrencyInput}`);
    

    if (storageCheck) {
      console.log("sessionStorage is being used");
      let storedConversionRates, targetCurrency, targetAmount;
      storedConversionRates = JSON.parse(sessionStorage.getItem([`rates_${baseCurrencyInput}`]));
      targetCurrency = storedConversionRates[`${targetCurrencyInput}`];
      targetAmount = parseFloat(baseAmountInput * targetCurrency).toFixed(2);
      $("#targetAmount").val(targetAmount);
    } else {
      console.log("API service call is being used");
      Exchange.getConversionRates(baseCurrencyInput)
        .then(function(response) {
          if (response instanceof Error) {
            throw Error(`ExchangeRate API error -- ${response.message}`);
          }
          let conversionRates, targetCurrency, targetAmount;
          conversionRates = response.conversion_rates;
          targetCurrency = conversionRates[`${targetCurrencyInput}`];
          targetAmount = parseFloat(baseAmountInput * targetCurrency).toFixed(2);
          $("#targetAmount").val(targetAmount);
          sessionStorage.setItem(`rates_${baseCurrencyInput}`, JSON.stringify(conversionRates));
        })
        .catch(function(error) {
          displayError();
          console.log(error);
        });
    }
  });
});