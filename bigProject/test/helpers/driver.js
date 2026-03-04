"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriver = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
// import * as chromedriver from "chromedriver";
const createDriver = () => {
    const options = new chrome_1.Options(); // .addArguments("--headless") if needed
    //chromeOptions.addArguments("--headless", "--no-sandbox", "--disable-gpu");
    // const service = new ServiceBuilder(chromedriver.path);
    return new selenium_webdriver_1.Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        // .setChromeService(service)
        .build();
};
exports.createDriver = createDriver;
