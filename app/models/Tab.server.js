import db from "../db.server";

export async function getTabs(shop) {
  const tabs = await db.tab.findMany({
    where: { shop },
    orderBy: { id: "asc" },
  });

  if (tabs.length === 0) return [];

  return tabs.map((tab) => (tab.panelID = tab.id));
}
