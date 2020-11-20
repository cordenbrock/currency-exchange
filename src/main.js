import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../src/services/exchange.service.js';




$(document).ready(function() {


  $("#form").on("submit", function(e) {
    e.preventDefault();

    let baseCurrencyInput, baseAmountInput, targetCurrencyInput;
    baseCurrencyInput = $("#baseCurrency").val();
    baseAmountInput = $("#baseAmount").val();
    targetCurrencyInput = $("#targetCurrency").val();
    console.log(baseCurrencyInput, baseAmountInput,targetCurrencyInput);

    Exchange.getConversionRates(baseCurrencyInput)
      .then(function(response) {
        console.log(response);
      });
  });
});