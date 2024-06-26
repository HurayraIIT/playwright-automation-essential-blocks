# essential-blocks-demopage-test-automation
Testing the Essential Blocks Demo Pages Using Playwright

## Getting Started

Install playwright using the following command:

```
npm init playwright@latest
```

Install dotenv:

```
npm install dotenv@latest
```

Install playwright-slack-report

```
npm install playwright-slack-report@latest
```

To update playwright:

```
npm install -D @playwright/test@latest
```

Usually after Playwright update, browsers need to be updated with command:

```
npx playwright install --with-deps
```

## Project Setup

Step 01: Clone the repository:

```
git clone git@github.com:HurayraIIT/playwright-automation-essential-blocks.git
cd playwright-automation-essential-blocks
```

Step 02: Copy the .env.example file to create a .env file. Then provide the necessary secrets.

```
cp .env.example .env
```

Step 03: Run npm install

```
npm install
```