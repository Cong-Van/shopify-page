import {
  Card,
  BlockStack,
  InlineStack,
  FormLayout,
  Box,
  Text,
  Button,
  Divider,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import styled from "styled-components";

const StyledTitle = styled.p`
  color: #1a0dab;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 2px;
`;
const StyledUrl = styled.p`
  color: #006621;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 2px;
`;
const StyledContent = styled.p`
  color: #545454;
  font-size: 13px;
  line-height: 16px;
`;

const SecondaryContent = ({ formState, handleChangeFormValue }) => {
  const [isEdittingWebSEO, setIsEdittingWebSEO] = useState(false);

  const pageTitle = formState.pageTitle || formState.title;
  const url = `https://${formState.shop}/pages/${formState.handle}`;
  const description = formState.description || formState.content;

  return (
    <Card>
      <BlockStack gap="500">
        <InlineStack align="space-between">
          <Text variant="headingMd" as="h2">
            Search engine listing preview
          </Text>
          {!isEdittingWebSEO && (
            <Button variant="plain" onClick={() => setIsEdittingWebSEO(true)}>
              Edit website SEO
            </Button>
          )}
        </InlineStack>
        {pageTitle && url && description && (
          <Box>
            <StyledTitle>{pageTitle}</StyledTitle>
            <StyledUrl>{url}</StyledUrl>
            <StyledContent>{description}</StyledContent>
          </Box>
        )}

        <Text>
          Add a title and description to see how this Page might appear in a
          search engine listing
        </Text>
        {isEdittingWebSEO && (
          <FormLayout>
            <Divider />
            <TextField
              label="Page title"
              value={formState.pageTitle}
              onChange={(value) => handleChangeFormValue({ pageTitle: value })}
              helpText="0 of 70 characters used"
              autoComplete="off"
            />
            <TextField
              label="Description"
              value={formState.description}
              onChange={(value) =>
                handleChangeFormValue({ description: value })
              }
              multiline={4}
              helpText="0 of 320 characters used"
              autoComplete="off"
            />
            <TextField
              label="URL and handle"
              value={formState.handle}
              onChange={(value) => handleChangeFormValue({ handle: value })}
              prefix={`https://${formState.shop}/pages/`}
              autoComplete="off"
            />
          </FormLayout>
        )}
      </BlockStack>
    </Card>
  );
};

export default SecondaryContent;
