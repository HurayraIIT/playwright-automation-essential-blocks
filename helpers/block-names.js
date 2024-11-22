"use strict";

// FREE BLOCKS: https://github.com/WPDevelopers/essential-blocks/blob/master/blocks/accordion/block.json
// PRO BLOCKS: https://github.com/WPDevelopers/essential-blocks-pro/blob/main/blocks/advanced-search/block.json

const EB_Free_Blocks = Object.freeze({
  ACCORDION_ITEM: "essential-blocks/accordion-item",
  ACCORDION: "essential-blocks/accordion", // done
  ADVANCED_HEADING: "essential-blocks/advanced-heading", //done
  ADVANCED_IMAGE: "essential-blocks/advanced-image",
  ADVANCED_NAVIGATION: "essential-blocks/advanced-navigation", //done
  ADVANCED_TABS: "essential-blocks/advanced-tabs", //done
  ADVANCED_VIDEO: "essential-blocks/advanced-video",
  BUTTON: "essential-blocks/button",
  BREADCRUMBS: "essential-blocks/breadcrumbs", //done
  CALL_TO_ACTION: "essential-blocks/call-to-action", //done
  COLUMN: "essential-blocks/column",
  COUNTDOWN: "essential-blocks/countdown", //done
  DUAL_BUTTON: "essential-blocks/dual-button",
  FEATURE_LIST: "essential-blocks/feature-list", //done
  FLIPBOX: "essential-blocks/flipbox",
  FLUENT_FORMS: "essential-blocks/fluent-forms",
  FORM_CHECKBOX_FIELD: "essential-blocks/form-checkbox-field",
  FORM_EMAIL_FIELD: "essential-blocks/form-email-field",
  FORM_NUMBER_FIELD: "essential-blocks/form-number-field",
  FORM_RADIO_FIELD: "essential-blocks/form-radio-field",
  FORM_SELECT_FIELD: "essential-blocks/form-select-field",
  FORM_TEXT_FIELD: "essential-blocks/form-text-field",
  FORM_TEXTAREA_FIELD: "essential-blocks/form-textarea-field",
  FORM: "essential-blocks/form",
  GOOGLE_MAP: "essential-blocks/google-map",
  ICON: "essential-blocks/icon",
  IMAGE_COMPARISON: "essential-blocks/image-comparison",
  IMAGE_GALLERY: "essential-blocks/image-gallery",
  INFOBOX: "essential-blocks/infobox",
  INSTAGRAM_FEED: "essential-blocks/instagram-feed",
  INTERACTIVE_PROMO: "essential-blocks/interactive-promo",
  NFT_GALLERY: "essential-blocks/nft-gallery",
  NOTICE: "essential-blocks/notice",
  NUMBER_COUNTER: "essential-blocks/number-counter",
  OPENVERSE: "essential-blocks/openverse",
  PARALLAX_SLIDER: "essential-blocks/parallax-slider",
  POPUP: "essential-blocks/popup",
  POST_CAROUSEL: "essential-blocks/post-carousel",
  POST_GRID: "essential-blocks/post-grid",
  PRICE: "essential-blocks/price",
  PRICING_TABLE: "essential-blocks/pricing-table",
  PROGRESS_BAR: "essential-blocks/progress-bar",
  ROW: "essential-blocks/row",
  SHAPE_DIVIDER: "essential-blocks/shape-divider",
  SLIDER: "essential-blocks/slider",
  SOCIAL_SHARE: "essential-blocks/social-share",
  SOCIAL: "essential-blocks/social",
  TAB: "essential-blocks/tab",
  TABLE_OF_CONTENTS: "essential-blocks/table-of-contents",
  TEAM_MEMBER: "essential-blocks/team-member",
  TESTIMONIAL: "essential-blocks/testimonial",
  TOGGLE_CONTENT: "essential-blocks/toggle-content",
  TYPING_TEXT: "essential-blocks/typing-text",
  WOO_PRODUCT_GRID: "essential-blocks/woo-product-grid",
  WPFORMS: "essential-blocks/wpforms",
  WRAPPER: "essential-blocks/wrapper",
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