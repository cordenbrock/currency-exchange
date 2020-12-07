import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../src/services/exchange.service.js';

function useStorageData(baseCurrencyInput, targetCurrencyInput, baseAmountInput) {
  const storedConversionRates = JSON.parse(sessionStorage.getItem([`rates_${baseCurrencyInput}`]));
  const targetCurrency = storedConversionRates[`${targetCurrencyInput}`];
  const targetAmount = parseFloat(baseAmountInput * targetCurrency).toFixed(2);
  $("#targetAmount").val(targetAmount);
}

function displayResult(response,baseCurrencyInput, targetCurrencyInput, baseAmountInput) {
  const conversionRates = response.conversion_rates;
  const targetCurrency = conversionRates[`${targetCurrencyInput}`];
  const targetAmount = parseFloat(baseAmountInput * targetCurrency).toFixed(2);
  $("#targetAmount").val(targetAmount);
  sessionStorage.setItem(`rates_${baseCurrencyInput}`, JSON.stringify(conversionRates));
}

function displayError(error) {
  $('#error').html(`<p>${error}</p><small style="color:red">Sincerest apologies, dear currency conversion seeker, but it appears the interweb overlords are denying the entered currency you requested to convert!<br>Please select another currency or contact our chief tech consultant below who you'll notice also moonlights as our chief financial consultant.</small>`);
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

    const baseCurrencyInput = $("#baseCurrency").val();
    const baseAmountInput = $("#baseAmount").val();
    const targetCurrencyInput = $("#targetCurrency").val();
    const storageCheck = Object.keys(sessionStorage).includes(`rates_${baseCurrencyInput}`);
    

    if (storageCheck) {
      useStorageData(baseCurrencyInput,targetCurrencyInput,baseAmountInput);
    } else {
      Exchange.getConversionRates(baseCurrencyInput)
        .then(function(response) {
          if (response instanceof Error) {
            throw Error(`ExchangeRate API error -- ${response.message}`);
          }
          displayResult(response,baseCurrencyInput,targetCurrencyInput,baseAmountInput);
        })
        .catch(function(error) {
          displayError(error);
        });
    }
  });
});