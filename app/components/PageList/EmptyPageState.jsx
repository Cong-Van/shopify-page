import { EmptyState } from "@shopify/polaris";

const EmptyPageState = ({ onAction }) => (
  <EmptyState
    heading="Add pages to your online store"
    action={{
      content: "Add page",
      onAction,
    }}
    image="https://cdn.shopify.com/shopifycloud/online-store-web/assets/8001a44e37248e13f435f27aac113bf41ef8c7b78c5a460e9c77137b887b37c0.svg"
  >
    <p>
      Write clear page titles and descriptions to improve your search engine
      optimization (SEO) and help customers find your website.
    </p>
  </EmptyState>
);

export default EmptyPageState;
