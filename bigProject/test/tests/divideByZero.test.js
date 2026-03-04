"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const Utils_1 = require("../../libs/Utils");
const driver_1 = require("../helpers/driver");
async function run() {
    console.log('🚀 Starting Selenium test - Divide by zero...');
    console.log('🧱 Building driver...');
    const driver = await (0, driver_1.createDriver)();
    try {
        console.log('🌐 Opening calculator app...');
        await driver.get(Utils_1.CLIENT_URL); // Vite dev server
        console.log('🔎 Locating inputs...');
        const inputA = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-a"]'));
        const inputB = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-b"]'));
        const addButton = await driver.findElement(selenium_webdriver_1.By.xpath("//button[text()='Divide']"));
        await inputA.sendKeys('6');
        await inputB.sendKeys('0');
        await addButton.click();
        const resultElem = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('h6.MuiTypography-root')), 5000);
        const text = await resultElem.getText();
        if (!text.includes('Division by zero'))
            throw new Error('No result found: ' + text);
        if (text !== 'Division by zero') {
            console.warn('❌ Test failed: result is supposed to be Division by zero, instead ' +
                text);
            process.exit(1);
        }
        console.log('✅ Test passed: ' + text);
        process.exit(0);
    }
    catch (e) {
        console.error('❌ Test failed:', e);
        process.exit(1);
    }
    finally {
        await driver.quit();
    }
}
run();
