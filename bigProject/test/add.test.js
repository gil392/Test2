"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const driver_1 = require("./helpers/driver");
const assert_1 = require("assert");
describe("Addition", function () {
    jest.setTimeout(15000); // Set timeout for async Selenium
    let driver;
    beforeEach(async () => {
        driver = await (0, driver_1.createDriver)();
        await driver.get("http://localhost:5180");
    });
    afterEach(async () => {
        await driver.quit();
    });
    it("should add two numbers correctly", async () => {
        const inputA = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-a"]'));
        const inputB = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-b"]'));
        await inputA.sendKeys("5");
        await inputB.sendKeys("3");
        const addButton = await driver.findElement(selenium_webdriver_1.By.xpath("//button[text()='Add']"));
        await addButton.click();
        const resultElem = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath("//h6[contains(text(), 'Result')]")), 5000);
        const result = await resultElem.getText();
        console.log("Result text:", result);
        assert_1.strict.equal(result, "Result: 8");
    });
});
