import { useState, useCallback } from "react";
import {
  Tabs,
  ChoiceList,
  Filters,
  Button,
  Box,
  ResourceList,
  ResourceItem,
  Text,
} from "@shopify/polaris";
import { StarFilledMinor } from "@shopify/polaris-icons";

const PageTable = ({ pages, tabs }) => {
  const [tabSelected, setTabSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setTabSelected(selectedTabIndex),
    []
  );

  tabs = [
    {
      id: "1",
      content: "All",
      panelID: "1",
    },
    {
      id: "2",
      content: "Tab 1",
      panelID: "2",
    },
    {
      id: "3",
      content: "Tab 2",
      panelID: "3",
    },
  ];

  pages = [
    {
      id: "112",
      title: "Title 1",
      content: "Content",
      url: "pages/contact",
    },
    {
      id: "212",
      title: "Contact",
      content: "",
      url: "pages/contact",
    },
  ];

  const [queryValue, setQueryValue] = useState();
  const [visibility, setVisibility] = useState();
  const [sortValue, setSortValue] = useState("UPDATED_AT_DESC");
  const [selectedPages, setSelectedPages] = useState([]);

  const handleSortChange = (selected) => {
    setSortValue(selected);
    console.log(`Sort option changed to ${selected}.`);
  };
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleVisibilityChange = useCallback(
    (value) => setVisibility(value),
    []
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    []
  );
  const handlevisibilityRemove = useCallback(
    () => setVisibility(undefined),
    []
  );
  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
    handlevisibilityRemove();
  }, [handleQueryValueRemove, handlevisibilityRemove]);

  const resourceName = {
    singular: "page",
    plural: "pages",
  };

  const sortOptions = [
    { label: "Newest update", value: "UPDATED_AT_DESC" },
    { label: "Oldest update", value: "UPDATED_AT_ASC" },
    { label: "Title A-Z", value: "TITLE_ASC" },
    { label: "Title Z-A", value: "TITLE_DESC" },
  ];

  const bulkActions = [
    {
      content: "Make selected pages visible",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Hide selected pages",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete pages",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  const filters = [
    {
      key: "visibility",
      label: "Visibility",
      filter: (
        <ChoiceList
          title="Visibility"
          titleHidden
          choices={[
            { label: "Visible", value: "Visible" },
            { label: "Hidden", value: "Hidden" },
          ]}
          selected={visibility || ""}
          onChange={handleVisibilityChange}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = visibility
    ? [
        {
          key: "visibility",
          label: disambiguateLabel("Visibility", visibility),
          onRemove: handlevisibilityRemove,
        },
      ]
    : [];

  const filterControl = (
    <Filters
      queryValue={queryValue}
      queryPlaceholder="Search pages"
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{ paddingLeft: "8px" }}>
        <Button
          icon={StarFilledMinor}
          onClick={() => console.log("New filter saved")}
        >
          Saved
        </Button>
      </div>
    </Filters>
  );

  return (
    <>
      <Tabs
        tabs={tabs}
        selected={tabSelected}
        onSelect={handleTabChange}
      ></Tabs>
      <Box>
        <ResourceList
          resourceName={resourceName}
          items={pages}
          renderItem={renderItem}
          selectedItems={selectedPages}
          onSelectionChange={setSelectedPages}
          bulkActions={bulkActions}
          sortValue={sortValue}
          sortOptions={sortOptions}
          onSortChange={handleSortChange}
          filterControl={filterControl}
        />
      </Box>
    </>
  );

  function truncate(str, { length = 25 } = {}) {
    if (!str) return "";
    if (str.length <= length) return str;
    return str.slice(0, length) + "…";
  }

  function renderItem(item) {
    const { id, title, content, url } = item;
    const shortcutActions = url ? [{ content: "View page", url }] : undefined;
    return (
      <ResourceItem
        id={id}
        url={url}
        accessibilityLabel={`View details for ${title}`}
        shortcutActions={shortcutActions}
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {title}
        </Text>
        <div>{content}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case "Visibility":
        return `Visibility is ${value}`;
      default:
        return value;
    }
  }
};

export default PageTable;
