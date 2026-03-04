"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
const Utils_1 = require("../libs/Utils");
async function run() {
    console.log("🚀 Starting Selenium test...");
    // const service = new ServiceBuilder(chromedriver.path);
    const chromeOptions = new chrome_1.Options();
    //chromeOptions.addArguments("--headless", "--no-sandbox", "--disable-gpu");
    console.log("🧱 Building driver...");
    const driver = await new selenium_webdriver_1.Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        // .setChromeService(service)
        .build();
    try {
        console.log("🌐 Opening calculator app...");
        await driver.get(Utils_1.CLIENT_URL); // Vite dev server
        console.log("🔎 Locating input A...");
        const inputA = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-a"]'));
        const inputB = await driver.findElement(selenium_webdriver_1.By.css('[data-testid="input-b"]'));
        const addButton = await driver.findElement(selenium_webdriver_1.By.xpath("//button[text()='Add']"));
        await inputA.sendKeys("4");
        await inputB.sendKeys("3");
        await addButton.click();
        const resultElem = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css("h6.MuiTypography-root")), 5000);
        const text = await resultElem.getText();
        if (!text.includes("Result:"))
            throw new Error("No result found");
        if (text !== "Result: 7") {
            console.warn("❌ Test failed: result is supposed to be 7, instead " + text);
            process.exit(1);
        }
        console.log("✅ Test passed: " + text);
        process.exit(0);
    }
    catch (e) {
        console.error("❌ Test failed:", e);
        process.exit(1);
    }
    finally {
        await driver.quit();
    }
}
run();
