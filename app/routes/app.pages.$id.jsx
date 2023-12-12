import { useState } from "react";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Badge,
  Icon,
  Layout,
  BlockStack,
  PageActions,
} from "@shopify/polaris";
import { DuplicateMinor, ViewMajor } from "@shopify/polaris-icons";

import { authenticate } from "../shopify.server";
import db from "../db.server";
import { getPage, validatePage } from "../models/Page.server";

import MainContent from "../components/PageDetail/MainContent";
import SecondaryContent from "../components/PageDetail/SecondaryContent";
import Visibility from "../components/PageDetail/Visibility";
import ThemeTemplate from "../components/PageDetail/ThemeTemplate";

export async function loader({ request, params }) {
  const { session, admin } = await authenticate.admin(request);
  const { shop } = session;

  if (params.id === "new") {
    return json({
      title: "",
      bodyHtml: "",
      handle: "",
      publishedAt: new Date().toLocaleString(),
      visibility: "Visible",
      shop,
    });
  }

  return json(await getPage(Number(params.id), admin.graphql));
}

export async function action({ request, params }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  /** @type {Object} */
  const data = {
    ...Object.fromEntries(await request.formData()),
    shop,
  };

  if (data.action === "delete") {
    await db.page.delete({ where: { id: Number(params.id) } });
    return redirect("/app");
  }

  const errors = validatePage(data);

  if (errors) {
    return json({ errors }, { status: 422 });
  }

  const page =
    params.id === "new"
      ? await db.page.create({ data })
      : await db.page.update({ where: { id: Number(params.id) }, data });

  return redirect(`/app/pages/${page.id}`);
}

export default function PageForm() {
  const errors = useActionData()?.errors || {};

  const page = useLoaderData();
  const [formState, setFormState] = useState(page);
  const [cleanFormState, setCleanFormState] = useState(page);
  const isDirty = JSON.stringify(formState) !== JSON.stringify(cleanFormState);

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";

  const handleChangeFormValue = (attribute) =>
    setFormState({ ...formState, ...attribute });

  const submit = useSubmit();
  const handleSave = () => {
    const data = {
      title: formState.title,
      bodyHtml: formState.bodyHtml,
      pageTitle: formState.pageTitle || "",
      description: formState.description || "",
      handle: formState.handle,
      publishedAt: formState.publishedAt,
    };

    setCleanFormState({ ...formState });
    submit(data, { method: "post" });
  };

  const isWillPublish = page.publishedAt
    ? new Date().toLocaleString() < page.publishedAt.toLocaleString()
    : "";

  return (
    <Page
      backAction={{
        url: "/app",
      }}
      title={page.id ? page.title : "Add page"}
      titleMetadata={
        !page.publishedAt || isWillPublish ? (
          <Badge tone="info">Hidden</Badge>
        ) : (
          ""
        )
      }
      secondaryActions={[
        {
          icon: <Icon source={DuplicateMinor} />,
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          icon: <Icon source={ViewMajor} />,
          content: "View page",
          onAction: () => alert("View on your store action"),
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <MainContent
              formState={formState}
              handleChangeFormValue={handleChangeFormValue}
            />
            <SecondaryContent
              formState={formState}
              handleChangeFormValue={handleChangeFormValue}
            />
          </BlockStack>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <BlockStack gap="400">
            <Visibility
              formState={formState}
              handleChangeFormValue={handleChangeFormValue}
            />
            <ThemeTemplate />
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <PageActions
            secondaryActions={[
              {
                content: "Delete page",
                loading: isDeleting,
                disabled: !page || !page.id || isSaving || isDeleting,
                destructive: true,
                outline: true,
                onAction: () =>
                  submit({ action: "delete" }, { method: "post" }),
              },
            ]}
            primaryAction={{
              content: "Save",
              loading: isSaving,
              disabled: !isDirty || isSaving || isDeleting,
              onAction: handleSave,
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
