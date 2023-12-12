import { useState, useCallback } from "react";
import { Card, BlockStack, Text, Select, Button, Icon } from "@shopify/polaris";
import { TemplateMajor } from "@shopify/polaris-icons";

const ThemeTemplate = () => {
  const [themeTemplate, setThemTemplate] = useState();
  const handleChangeTheme = useCallback((value) => setThemTemplate(value), []);

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">
          Online store
        </Text>
        <BlockStack gap="500">
          <Select
            label="Theme template"
            options={[
              { label: "Default page", value: "default" },
              { label: "contact", value: "contact" },
            ]}
            value={themeTemplate}
            onChange={handleChangeTheme}
          />
          <Text>
            Assign a template from your current theme to define how the page is
            displayed.
          </Text>
          <Button
            icon={<Icon source={TemplateMajor} />}
            textAlign="left"
            variant="plain"
          >
            Customize template
          </Button>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

export default ThemeTemplate;
