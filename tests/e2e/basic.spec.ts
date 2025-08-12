import { test, expect } from '@playwright/test';

test('login to dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.goto('/dashboard');
  await expect(page.getByText('待复习')).toBeVisible();
});

test('study flashcards reduces count', async ({ page }) => {
  await page.goto('/study/flashcards');
  await expect(page.getByText('剩余：3 张')).toBeVisible();
  await page.getByText('认识').click();
  await page.getByText('认识').click();
  await page.getByText('认识').click();
  await expect(page.getByText('学习完成')).toBeVisible();
});

test('match game finish', async ({ page }) => {
  await page.goto('/games/match');
  await page.getByTestId('finish-match').click();
  await expect(page.getByText('成绩已记录')).toBeVisible();
});

test('diagnostic to path', async ({ page }) => {
  await page.goto('/diagnostic');
  await page.getByText('完成').click();
  await expect(page.getByText('建议：')).toBeVisible();
});
