import { test, expect } from "@playwright/test"

let context

test.beforeAll(async({ browser }) => {
    context = await browser.newContext()
    await context.clearCookies()


})

test.only("booking ", async() => {
    test.setTimeout(120000);
    let page = await context.newPage()
    await page.goto("https://camping.bcparks.ca/login")
    await page.locator("#consentButton").click()

    await page.locator("#login-cookie-consent").click()

    await page.getByRole("textbox", { name: 'Email' }).clear()
    await page.getByRole("textbox", { name: 'Email' }).fill("samtaggarwal09@gmail.com") // change username

    await page.getByRole("textbox", { name: 'Password' }).clear()
    await page.getByRole("textbox", { name: 'Password' }).fill("pujaR@123") // change password

    await page.locator("button#loginButton").click()
    await page.getByText("Create reservation").click()

    await page.locator('input#park-autocomplete-input').click()

    // change Gladstone as per your requriement from Accessibility 
    const park = page.getByRole('option', { name: 'Cultus Lake' })
    await park.click()
        // change Gladstone as per your requriement from Accessibility 
    await expect(page.locator('input#park-autocomplete-input')).toHaveValue('Cultus Lake')

    // hold for selecting date OR  you can select it before, then it will show same
    await page.waitForTimeout(8000)

    await page.locator('#equipment-field').click()

    await page.getByRole("option", { name: '2 Tents' }).click() // change # Tents value as per yours from Accessibility
    await expect(page.locator('#equipment-field')).toHaveText('2 Tents') // here too changed 

    await page.locator('button#actionSearch').click()

    await page.getByRole('radio', { name: 'List view of results' }).click()

    let role = 'button',
        namee = 'Campsite Maple Bay' // update this as per your requirement from 

    await page.getByRole(role, { name: namee }).click()

    namee = 'Campsite M2 Available' // update this as per your requirement from

    // await page.getByRole(role, { name: namee }).click()
    await page.locator('div.list-entry.ng-star-inserted').nth(2).click()

    await page.getByRole('button', { name: 'Reserve' }).click()
        // hold for selecting reservation date 
        // await page.waitForTimeout(4000) // if require

    await page.getByRole('checkbox', { name: 'All reservation details are correct.' }).click()
    await page.getByRole('button', { name: 'Confirm reservation details' }).click()

    await page.getByRole('button', { name: 'Proceed to checkout' }).click()

    await page.getByRole('checkbox', { name: /EVERYONE IN MY GROUP WILL FOLLOW/i }).click()


    await page.getByRole('button', { name: 'Confirm acknowledgements' }).click()

    await page.getByRole('button', { name: 'Confirm account details' }).click()

    // occupant information
    await page.getByRole('radio', { name: 'I will be the occupant.' }).click()

    // confirm occupant
    await page.getByRole('button', { name: "Confirm occupant" }).click()

    // wait for no of member

    await page.waitForTimeout(5000)
    await page.getByRole('button', { name: "Confirm party information" }).click()

    //hold for vehicle info
    await page.waitForTimeout(4000)

    await page.getByRole('button', { name: "Confirm additional information" }).click()

    //skipping for additional vehicle
    await page.getByRole('button', { name: "Skip add ons" }).click()

    // now payment info page is reached, so stopping 










})