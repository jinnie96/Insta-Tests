const { test, expect } = require('@playwright/test')

test.describe('Authentication', () => {
    test('should allow user to sign in as demo', async ({ page }) => {
      await page.goto('http://insta-clone-group.herokuapp.com/');
      await page.goto('http://insta-clone-group.herokuapp.com/login');
      await page.locator('text=Demo User').click();
      const welcome = await page.innerText('.post-welcome-container h1')
      await expect(welcome).toBe('Welcome, demo')
    });

    test('should redirect user to sign up page', async ({ page }) => {
      await page.goto('http://insta-clone-group.herokuapp.com/login');
      await page.locator('text=Sign up').click();
      await expect(page).toHaveURL('http://insta-clone-group.herokuapp.com/sign-up');
    });

})

test.describe('Posts', () => {
  test('should allow user to edit posts', async ({ page }) => {
    await page.goto('http://insta-clone-group.herokuapp.com/');
    await page.goto('http://insta-clone-group.herokuapp.com/login');
    await page.locator('text=Demo User').click();
    await page.locator('text=demo0 likesdemo test >> div').nth(1).click();
    await page.locator('#edit-comment').click();
    await page.locator('textarea:has-text("test")').click();
    await page.locator('textarea:has-text("test")').fill('test');
    await page.locator('#submit-edit-comment').click();
    const welcome = await page.innerText('#single-caption-comments div div')
    await expect(welcome).toBe('test')
});

})

test.describe('Comment', () => {
  test('should allow user to add comments', async ({ page }) => {
    await page.goto('http://insta-clone-group.herokuapp.com/');
    await page.goto('http://insta-clone-group.herokuapp.com/login');
    await page.locator('text=Demo User').click();
    await page.locator('text=demo0 likesdemo testt >> div').nth(1).click();
    await page.locator('[placeholder="Add a comment\\.\\.\\."]').click();
    await page.locator('[placeholder="Add a comment\\.\\.\\."]').fill('test');
    await page.locator('button:has-text("Post")').click();
    const comment = await page.innerText('.comment-container .edit-comment-form')
    await expect(comment).toBe('test')
  })

})

test.describe('Follows', () => {

  test('should allow user to unfollow other users', async ({ page }) => {
    await page.goto('http://insta-clone-group.herokuapp.com/');
    await page.goto('http://insta-clone-group.herokuapp.com/login');
    await page.locator('text=Demo User').click();
    await page.goto('http://insta-clone-group.herokuapp.com/profile/4');
    await page.locator('text=Unfollow').click();
    const comment = await page.innerText('#follow-butt')
    await expect(comment).toBe('Follow')
  })

  test('should allow user to follow other users', async ({ page }) => {
  await page.goto('http://insta-clone-group.herokuapp.com/login');
  await page.locator('text=Demo User').click();
  await page.goto('http://insta-clone-group.herokuapp.com/profile/4');
  await page.locator('button:has-text("Follow")').click();
  const comment = await page.innerText('#unfollow-butt')
  await expect(comment).toBe('Unfollow')
  })
})
