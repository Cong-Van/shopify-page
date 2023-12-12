import db from "../db.server";

export async function getPage(id, graphql) {
  const page = await db.page.findFirst({ where: { id } });

  if (!page) {
    return null;
  }

  return supplementPage(page, graphql);
}

export async function getPages(shop, graphql) {
  const pages = await db.page.findMany({
    where: { shop },
    orderBy: { id: "desc" },
  });

  if (pages.length === 0) return [];

  return Promise.all(pages.map((page) => supplementPage(page, graphql)));
}

async function supplementPage(page, graphql) {
  return {
    ...page,
    visibility: page.publishAt ? "Visible" : "Hidden",
    url: `https://${page.shop}/pages/${page.handle}`,
  };
}

export function validatePage(data) {
  const errors = {};

  if (!data.title) {
    errors.title = "Title can't be blank";
  }

  if (Object.keys(errors).length) {
    return errors;
  }
}
