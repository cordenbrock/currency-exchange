import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../src/services/exchange.service.js';

function setUpEventListeners() {
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

$(document).ready(function() {
  setUpEventListeners();

  $("#form").on("submit", function(e) {
    e.preventDefault();

    let baseCurrencyInput, baseAmountInput, targetCurrencyInput;
    baseCurrencyInput = $("#baseCurrency").val();
    baseAmountInput = $("#baseAmount").val();
    targetCurrencyInput = $("#targetCurrency").val();

    Exchange.getConversionRates(baseCurrencyInput)
      .then(function(response) {
        let conversionRates, targetCurrency, targetAmount;
        conversionRates = response.conversion_rates;
        targetCurrency = conversionRates[`${targetCurrencyInput}`];
        targetAmount = parseFloat(baseAmountInput * targetCurrency).toFixed(2);
        $("#targetAmount").val(targetAmount);
      });
  });
});