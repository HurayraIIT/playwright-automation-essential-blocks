
# Essential Blocks Insert Test Automation 🚀

<div align="center">

[![Playwright Tests](https://github.com/HurayraIIT/playwright-automation-essential-blocks/actions/workflows/playwright.yml/badge.svg)](https://github.com/HurayraIIT/playwright-automation-essential-blocks/actions/workflows/playwright.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub last commit](https://img.shields.io/github/last-commit/HurayraIIT/playwright-automation-essential-blocks)
[![Powered by Playwright](https://img.shields.io/badge/Powered%20by-Playwright-45ba4b.svg)](https://playwright.dev)
[![Node.js CI](https://img.shields.io/badge/CI-Node.js-43853d.svg)](https://nodejs.org)

</div>

## 📝 Overview

Automated test suite for testing the **Essential Blocks** demo pages using [Playwright](https://playwright.dev).  
This project aims to ensure the stability and performance of demo pages with environment-based configuration, Slack notifications, and fast execution.

---

## 🔧 Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Git
- A code editor (VS Code recommended)

---

## 🚀 Project Setup

1. **Clone the Repository**
   ```bash
   git clone git@github.com:HurayraIIT/playwright-automation-essential-blocks.git
   cd playwright-automation-essential-blocks
   ```

2. **Copy Environment Variables**
   ```bash
   cp .env.example .env
   # Then, fill in the required environment secrets
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

---

## ⚙️ Installation Guide

Install core dependencies:

```bash
npm init playwright@latest
npm install dotenv@latest
npm install playwright-slack-report@latest
npm install @wordpress/e2e-test-utils-playwright
```

Update Playwright if needed:

```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

---

## 🧪 Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/example.spec.ts
```

### View the Last HTML Report

```bash
npx playwright show-report
```

---

## 📈 Features

- ✅ Automated E2E testing for demo pages
- 🔄 CI/CD GitHub Actions Integration
- 📊 HTML reports
- 🔔 Slack notification support
- ⚡ Fast & reliable test runs
- 🌐 Environment-based configuration

---

## 👥 Contributors

<div align="center">
  <a href="https://github.com/HurayraIIT/playwright-automation-essential-blocks/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=HurayraIIT/playwright-automation-essential-blocks" alt="contributors" />
  </a>
</div>

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by the Essential Blocks QA Team
</div>
