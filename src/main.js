import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../src/services/exchange.service.js';


function clearTargetAmountField() {
  $("#baseCurrency").on("focus", function() {
    $("#targetAmount").val('');
  });
  $("#baseAmount").on("focus", function() {
    $("#targetAmount").val('');
  });
  $("#targetCurrency").on("focus", function() {
    $("#targetAmount").val('');
  });
}
function displayError() {
  $('#error').html(`<small style="color:red; text-align:center;">Sincerest apologies, dear currency conversion seeker, but it appears the interweb overlords are denying the entered currency conversion!<br>Please contact our chief tech consultant below who you'll notice also moonlights as our chief financial consultant.</small>`);
}

function clearError() {
  $("#error").empty();
}

function setUpEventListeners() {
  clearTargetAmountField();
}

$(document).ready(function() {
  setUpEventListeners();

  $("#form").on("submit", function(e) {
    e.preventDefault();
    clearError();
    
    let baseCurrencyInput, baseAmountInput, targetCurrencyInput;
    baseCurrencyInput = $("#baseCurrency").val();
    baseAmountInput = $("#baseAmount").val();
    targetCurrencyInput = $("#targetCurrency").val();

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
      })
      .catch(function(error) {
        displayError();
        console.log(error.message); // "console.log" usage only here for assignment to display error type
      });
  });
});