import { json } from "@remix-run/node";
import { useLoaderData, Link, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Page, Layout, Card, FooterHelp } from "@shopify/polaris";

import { getPages } from "../models/Page.server";
import { getTabs } from "../models/Tab.server";

import EmptyPageState from "../components/PageList/EmptyPageState";
import PageTable from "../components/PageList/PageTable";

export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);
  const pages = await getPages(session.shop, admin.graphql);
  const tabs = await getTabs(session.shop, admin.graphql);

  return json({
    pages,
    tabs,
  });
}

export default function Index() {
  const { pages, tabs } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Page
      title="Pages"
      fullWidth={pages.length > 0}
      primaryAction={{
        content: "Add page",
        onAction: () => navigate("pages/new"),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card padding="0">
            {pages.length === 0 ? (
              <EmptyPageState onAction={() => navigate("pages/new")} />
            ) : (
              <PageTable pages={pages} tabs={tabs} />
            )}
          </Card>
        </Layout.Section>
      </Layout>
      <FooterHelp>
        Learn more about{" "}
        <Link
          url="https://help.shopify.com/en/manual/online-store/images"
          target="_blank"
          fontWeight="semibold"
        >
          pages
        </Link>
      </FooterHelp>
    </Page>
  );
}
