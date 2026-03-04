"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const driver_1 = require("../helpers/driver");
// import { CLIENT_URL } from '../../libs/Utils';
async function run() {
    console.log('🚀 Starting Selenium test - Divide...');
    console.log('🧱 Building driver...');
    const driver = await (0, driver_1.createDriver)();
    try {
        console.log('🌐 Opening calculator app...');
        await driver.get('http://localhost:5180'); // Vite dev server
        console.log('🔎 Locating inputs...');
        const inputA = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-a"]'));
        const inputB = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-b"]'));
        const addButton = await driver.findElement(selenium_webdriver_1.By.xpath("//button[text()='Divide']"));
        await inputA.sendKeys('6');
        await inputB.sendKeys('3');
        await addButton.click();
        const resultElem = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('h6.MuiTypography-root')), 5000);
        const text = await resultElem.getText();
        if (!text.includes('Result:'))
            throw new Error('No result found: ' + text);
        if (text !== 'Result: 2') {
            console.warn('❌ Test failed: result is supposed to be 2, instead ' + text);
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
