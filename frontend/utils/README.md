# Playwright UI Test Project

This repository contains UI tests for a web-based to-do application using [Playwright](https://playwright.dev/). The tests cover major user flows including login, registration, task management (add, edit, delete), and visual regression checks.

---

## 📌 Test Coverage

The following user flows are tested:

- Login with valid credentials  
- Register new user  
- Add a to-do item  
- Edit a to-do item  
- Delete a to-do item  
- UI visual regression (snapshot comparison)  
- Error handling for invalid login  

---

## 🛠 Tools Used

- [Playwright](https://playwright.dev/) – for browser automation and testing
- Visual Snapshot Testing – for detecting UI regressions
- (Optional) GitHub Actions – for CI/CD integration

---

## ▶️ How to Run Tests

1. **Install dependencies**

   npm install

2. **Ensure your application is running locally at**

   http://localhost:3000
   
   

3. **Run all tests and view the report**

   npx playwright test
   npx playwright show-report


4. **Update visual snapshots if needed**

    npx playwright test --update-snapshots
