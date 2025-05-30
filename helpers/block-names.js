"use strict";

// FREE BLOCKS: https://github.com/WPDevelopers/essential-blocks/blob/master/src/blocks/form/block.json
// PRO BLOCKS: https://github.com/WPDevelopers/essential-blocks-pro/blob/main/src/blocks/advanced-search/block.json

const EB_Free_Blocks = Object.freeze({
  ACCORDION_ITEM: "essential-blocks/accordion-item", //done
  ACCORDION: "essential-blocks/accordion", // done
  ADVANCED_HEADING: "essential-blocks/advanced-heading", //done
  ADVANCED_IMAGE: "essential-blocks/advanced-image", //done
  ADVANCED_NAVIGATION: "essential-blocks/advanced-navigation", //done
  ADVANCED_TABS: "essential-blocks/advanced-tabs", //done
  ADVANCED_VIDEO: "essential-blocks/advanced-video", //done
  BUTTON: "essential-blocks/button", //done
  BREADCRUMBS: "essential-blocks/breadcrumbs", //done
  CALL_TO_ACTION: "essential-blocks/call-to-action", //done
  COLUMN: "essential-blocks/column", //helper block
  COUNTDOWN: "essential-blocks/countdown", //done
  DUAL_BUTTON: "essential-blocks/dual-button", //done
  FEATURE_LIST: "essential-blocks/feature-list", //done
  FLIPBOX: "essential-blocks/flipbox", //done
  FLUENT_FORMS: "essential-blocks/fluent-forms", //done need to do form submit
  FORM_CHECKBOX_FIELD: "essential-blocks/form-checkbox-field", //done
  FORM_EMAIL_FIELD: "essential-blocks/form-email-field", //done
  FORM_NUMBER_FIELD: "essential-blocks/form-number-field", //done
  FORM_RADIO_FIELD: "essential-blocks/form-radio-field", //done
  FORM_SELECT_FIELD: "essential-blocks/form-select-field", //done
  FORM_TEXT_FIELD: "essential-blocks/form-text-field", //done
  FORM_TEXTAREA_FIELD: "essential-blocks/form-textarea-field", //done
  FORM: "essential-blocks/form", //done
  GOOGLE_MAP: "essential-blocks/google-map", //done
  ICON: "essential-blocks/icon", //done
  IMAGE_COMPARISON: "essential-blocks/image-comparison", //done
  IMAGE_GALLERY: "essential-blocks/image-gallery", //done
  INFOBOX: "essential-blocks/infobox", //done
  INSTAGRAM_FEED: "essential-blocks/instagram-feed", //done
  INTERACTIVE_PROMO: "essential-blocks/interactive-promo", //done
  NFT_GALLERY: "essential-blocks/nft-gallery", //done
  NOTICE: "essential-blocks/notice", //done
  NUMBER_COUNTER: "essential-blocks/number-counter", //done
  OPENVERSE: "essential-blocks/openverse", //done
  PARALLAX_SLIDER: "essential-blocks/parallax-slider", //done
  POPUP: "essential-blocks/popup", //done
  POST_CAROUSEL: "essential-blocks/post-carousel", //done
  POST_GRID: "essential-blocks/post-grid", //done
  PRICE: "essential-blocks/price", //helper block
  PRICING_TABLE: "essential-blocks/pricing-table", //done
  PROGRESS_BAR: "essential-blocks/progress-bar", //done
  ROW: "essential-blocks/row", //helper block
  SHAPE_DIVIDER: "essential-blocks/shape-divider", //done
  SLIDER: "essential-blocks/slider", //done
  SOCIAL_SHARE: "essential-blocks/social-share", //done
  SOCIAL: "essential-blocks/social", //done
  TAB: "essential-blocks/tab", //helper block
  TABLE_OF_CONTENTS: "essential-blocks/table-of-contents", //done
  TEAM_MEMBER: "essential-blocks/team-member", //done
  TESTIMONIAL: "essential-blocks/testimonial", //done
  TOGGLE_CONTENT: "essential-blocks/toggle-content", //done
  TYPING_TEXT: "essential-blocks/typing-text", //done
  WOO_PRODUCT_GRID: "essential-blocks/woo-product-grid", //done
  WPFORMS: "essential-blocks/wpforms", //done
  WRAPPER: "essential-blocks/wrapper", //done
});

const EB_PRO_Blocks = Object.freeze({
  ADVANCED_SEARCH: "essential-blocks/pro-advanced-search",
  DATA_TABLE: "essential-blocks/pro-data-table",
  FANCY_CHART: "essential-blocks/pro-fancy-chart",
  FORM_DATETIME_PICKER:"essential-blocks/pro-form-datetime-picker",
  FORM_RECAPTCHA:"essential-blocks/pro-form-recaptcha",
  MULTICOLUMN_PRICING_TABLE:"essential-blocks/pro-multicolumn-pricing-table",
  NEWS_TICKER:"essential-blocks/pro-news-ticker",
  OFF_CANVAS:"essential-blocks/pro-off-canvas",
  PRICING_CELL:"essential-blocks/pro-pricing-cell",
  PRICING_COLUMN:"essential-blocks/pro-pricing-column",
  STACKED_CARDS:"essential-blocks/pro-stacked-cards",
  TESTIMONIAL_SLIDER:"essential-blocks/pro-testimonial-slider",
  TIMELINE_SLIDER:"essential-blocks/pro-timeline-slider",
  WOO_PRODUCT_CAROUSEL:"essential-blocks/pro-woo-product-carousel",

  // TODO: Add more pro blocks here {countdown, post carousel, post grid, woo product grid}
});

export { EB_Free_Blocks, EB_PRO_Blocks };