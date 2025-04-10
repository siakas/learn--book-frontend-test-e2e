import test, { expect } from "@playwright/test";

test("フォーム操作のテスト", async ({ page }) => {
  await page.goto("http://localhost:3000/form");
  await page.getByRole("textbox", { name: /1人目/ }).fill("項羽");
  await page.getByRole("textbox", { name: /2人目/ }).fill("劉邦");
  await page.getByRole("button", { name: /シャッフル/ }).click();
  await expect(page.getByRole("status")).toHaveText(/(項羽→劉邦)|(劉邦→項羽)/);
});
