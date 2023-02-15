const { test, expect } = require('@playwright/test')

test.describe('Authentication', () => {
    test('should allow user to sign in as demo', async ({ page }) => {
      await page.goto('https://remember-the-grapes.herokuapp.com/');
      await page.getByRole('link', { name: 'Log In' }).click();
      await page.getByRole('button', { name: 'Demo User' }).click();
    });
    test('should redirect user to sign up page', async ({ page }) => {
      await page.goto('https://instaclone-app-group.herokuapp.com/login');
      await page.locator('text=Sign up').click();
      await expect(page).toHaveURL('https://instaclone-app-group.herokuapp.com/sign-up');
    });

})

test.describe('Follows', () => {

  test('should allow user to follow other users', async ({ page }) => {
    await page.goto('https://instaclone-app-group.herokuapp.com/login');
    await page.locator('text=Demo User').click();
    await page.goto('https://instaclone-app-group.herokuapp.com/profile/2');
    await page.locator('button:has-text("Follow")').click();
    const comment = await page.innerText('#unfollow-butt')
    await expect(comment).toBe('Unfollow')
  })

  test('should allow user to unfollow other users', async ({ page }) => {
    await page.goto('https://instaclone-app-group.herokuapp.com/login');
    await page.locator('text=Demo User').click();
    await page.goto('http://instaclone-app-group.herokuapp.com/profile/2');
    await page.locator('text=Unfollow').click();
    const comment = await page.innerText('#follow-butt')
    await expect(comment).toBe('Follow')
  })

})
