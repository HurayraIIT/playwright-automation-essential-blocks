"use strict"

// buttonUtils.js
export const clickIfAriaExpandedIsFalse = async (locator) => {
    const isExpanded = await locator.getAttribute('aria-pressed');
    if (isExpanded === 'false') {
        console.log('Button is not expanded. Clicking the button...');
        await locator.click();
    } else {
        console.log('Button is already expanded. No action needed.');
    }
};
