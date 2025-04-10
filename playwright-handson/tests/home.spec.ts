import test, { expect } from "@playwright/test";

test("ページの表示テスト", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/最初のページ/);
  await expect(page.getByRole("heading")).toHaveText(/Playwright のハンズオン/);
  await expect(page.getByRole("button", { name: "操作ボタン" })).toBeVisible();
});

test("フォーム画面への遷移", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "入力フォーム" }).click();
  await expect(page).toHaveURL("http://localhost:3000/form");
  await expect(
    page.getByRole("heading", { name: "入力フォーム" }),
  ).toBeVisible();
});
