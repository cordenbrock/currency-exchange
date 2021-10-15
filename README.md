# Exchangerator

#### By Cory Nordenbrock
##### 11/30/20

## Visit Site!

https://exchangerator.herokuapp.com/

## _What_ does it do?

* Exchangerator is a simple, user-friendly web app for converting any monetary value to another in over 50 different currencies.
* Additionally, each currency conversion requested by the user utilizes the _ExchangeRate-API_ to ensure currency conversions are always accurate and up-to-date.

## _Why_ does it do?

* Credit for the project prompt goes to the wonderful people at Epicodus!
* Moreover, the core idea behind the development of this app was to learn how to make successful API calls as well as set up error handling that still elicits a quality user experience. In addition, this app utilizes client-side session storage to provide faster conversion times for the user and also account for the limited queries available in the _ExchangeRate-API_ free plan (more info on that below).

## Installation Options

1. Using bash terminal or preferred CLI, generate a new app directory by cloning git repository with the following command: ``` git clone https://github.com/cordenbrock/currency-exchange ```
2. Navigate to currency-exchange directory: ``` cd currency-exchange ```
3. Open with VScode or preferred IDE: ``` code . ```
4. Install required node modules: ``` npm install ```
5. Go to https://www.exchangerate-api.com/, create an account, and a free API key will be available to you upon completing the account registration.
6. In order to keep API key private, create a ``` .env ``` file in your root directory and store your API key as an environment variable there with the following variable declaration: ``` API_KEY=[Your API key here, no brackets] ```

    => _For troubleshooting, info regarding different plans, or further exploration, be sure to peruse through_ ExchangeRate-API's _developer documentation: https://www.exchangerate-api.com/docs/overview_

7. Launch a live webpack dev-server amenable to personal edits, which will automatically deploy app in default web browser: ``` npm run start ```

    => _Alternate option from last step: run the command ``` npm run build ``` to generate a "dist" directory containing bundled files optimized for deployment. Navigate to "dist" directory from desktop GUI and open index.html file to launch app in default web browser._

## Built with/Tools used

* _HTML_
* _CSS_
* _Bootstrap_
* _javaScript_
* _jQuery_
* _Webpack_
* _Postman_
* _Heroku_
* _Express_

### Known Bugs

* No known bugs at this time

### Legal

MIT License, (c) 2020 Cory Nordenbrock
