import { useState } from "react";
import { Card, BlockStack, Text, Button, ChoiceList } from "@shopify/polaris";

import DatePicking from "./DatePicking";
import TimePicking from "./TimePicking";

const Visibility = ({ formState, handleChangeFormValue }) => {
  console.log(formState);
  const [isEditingForPub, setIsEdittingForPub] = useState(false);

  const handleChangeVisibility = (value) => {
    console.log(value);
    if (value === "Visible") {
      handleChangeFormValue({
        visibility: value,
        publishedAt: new Date().toLocaleString(),
      });
      setIsEdittingForPub(false);
    } else {
      handleChangeFormValue({ visibility: value, publishedAt: "" });
    }
  };

  const handleSetVisibilityDate = () => {
    const curTime = new Date();
    const min = curTime.getMinutes();
    if (min < 30) {
      curTime.setMinutes(30);
    } else {
      curTime.setHours(curTime.getHours() + 1);
      curTime.setMinutes(0);
    }
    handleChangeFormValue({
      publishedAt: curTime,
      visibility: "Hidden",
    });
    setIsEdittingForPub(true);
  };

  const handleClearVisibilityDate = () => {
    handleChangeFormValue({ publishedAt: "" });
    setIsEdittingForPub(false);
  };

  let publishedDate, publishedTime, publishedDateTime, isWillPublish;
  if (formState.publishedAt) {
    const publishedAt = new Date(formState.publishedAt);
    publishedDate = publishedAt.toLocaleDateString();
    publishedTime =
      publishedAt.toLocaleTimeString().slice(0, 4) +
      publishedAt.toLocaleTimeString().slice(7);
    isWillPublish = new Date().toLocaleString() < publishedAt.toLocaleString();

    if (isWillPublish)
      publishedDateTime = `(will become visible on ${publishedDate}, ${publishedTime} PM GMT+7)`;
    else publishedDateTime = `(as of ${publishedDate}, ${publishedTime} GMT+7)`;
  }

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h2">
          Visibility
        </Text>
        <ChoiceList
          title="published-at"
          titleHidden
          choices={[
            {
              label: `Visible ${
                publishedDateTime && !isWillPublish ? publishedDateTime : ""
              }`,
              value: "Visible",
            },
            {
              label: `Hidden ${
                publishedDateTime && isWillPublish ? publishedDateTime : ""
              }`,
              value: "Hidden",
            },
          ]}
          selected={formState.visibility}
          onChange={(value) => handleChangeVisibility(value[0])}
        />
        {isEditingForPub ? (
          <>
            <BlockStack gap="100">
              <Text>Visibility date</Text>
              <DatePicking
                formState={formState}
                handleChangeFormValue={handleChangeFormValue}
              />
              <TimePicking
                formState={formState}
                handleChangeFormValue={handleChangeFormValue}
              />
            </BlockStack>
            <Button
              variant="plain"
              textAlign="left"
              onClick={handleClearVisibilityDate}
            >
              Clear date...
            </Button>
          </>
        ) : (
          <Button
            variant="plain"
            textAlign="left"
            onClick={handleSetVisibilityDate}
          >
            Set visibility date
          </Button>
        )}
      </BlockStack>
    </Card>
  );
};

export default Visibility;
