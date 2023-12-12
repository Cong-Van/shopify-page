import { useState, useRef, useEffect } from "react";
import {
  Card,
  Text,
  Box,
  TextField,
  Icon,
  FormLayout,
  InlineStack,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import {
  MagicMajor,
  BoldMajor,
  ItalicMajor,
  UnderlineMajor,
  CodeMajor,
} from "@shopify/polaris-icons";
import styled from "styled-components";

import Formatting from "./Formatting";
import Alignment from "./Alignment";
import ColorPicking from "./ColorPicking";

const StyledInlineButton = styled.div`
  background-color: #f7f7f7;
  border: #ebebeb solid 1px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 8px;
  margin-top: 4px;
`;

const ContentDisplay = styled.div`
  width: 100%;
  min-height: 150px;
  padding: 8px;
  border: #ebebeb solid 1px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  &:focus {
    outline: #005bd3 solid 2px;
  }
`;

const HtmlBodyTextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 8px;
  border: #ebebeb solid 1px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const MainContent = ({ formState, handleChangeFormValue }) => {
  const [isEdittingBodyHtml, setIsEdittingBodyHtml] = useState(false);
  const [textStyle, setTextStyle] = useState([]);
  const contentRef = useRef();

  const handleChangeStyle = (type) => {
    if (textStyle.includes(type))
      setTextStyle(textStyle.filter((value) => value !== type));
    else setTextStyle([...textStyle, type]);
  };

  const handleFocus = () => {
    console.log(tags);
  };

  const handleContentChange = () => {};

  let tags;
  useEffect(() => {
    textStyle.map((value) => {
      if (value === "bold") tags = <strong></strong>;
      if (value === "italic") tags = <em></em>;
      if (value === "underline")
        tags = <span style="text-decoration: underline;"></span>;
    });
  }, [textStyle]);

  useEffect(() => {
    contentRef.current.innerHTML = formState.bodyHtml;
  }, [formState]);

  return (
    <Card>
      <FormLayout>
        <TextField
          label="Title"
          placeholder="e.g. About us, Sizing chart, FAQ"
          value={formState.title}
          onChange={(value) => handleChangeFormValue({ title: value })}
          labelAction={{
            content: <Icon source={MagicMajor} />,
          }}
          autoComplete="off"
        />
        <Box>
          <Text>Content</Text>
          <StyledInlineButton>
            <InlineStack align="space-between">
              {isEdittingBodyHtml ? (
                <div></div>
              ) : (
                <InlineStack gap="200">
                  <ButtonGroup variant="segmented">
                    <Formatting />
                    <Button
                      icon={BoldMajor}
                      pressed={textStyle.includes("bold")}
                      onClick={() => handleChangeStyle("bold")}
                    />
                    <Button
                      icon={ItalicMajor}
                      pressed={textStyle.includes("italic")}
                      onClick={() => handleChangeStyle("italic")}
                    />
                    <Button
                      icon={UnderlineMajor}
                      pressed={textStyle.includes("underline")}
                      onClick={() => handleChangeStyle("underline")}
                    />
                  </ButtonGroup>
                  <ButtonGroup variant="segmented">
                    <Alignment />
                    <ColorPicking />
                  </ButtonGroup>
                </InlineStack>
              )}

              <Button
                icon={CodeMajor}
                onClick={() => setIsEdittingBodyHtml((prevValue) => !prevValue)}
              />
            </InlineStack>
          </StyledInlineButton>
          <HtmlBodyTextArea
            style={isEdittingBodyHtml ? {} : { display: "none" }}
            value={formState.bodyHtml}
            onInput={(e) => {
              handleChangeFormValue({ bodyHtml: e.target.value });
            }}
          />
          <ContentDisplay
            ref={contentRef}
            style={!isEdittingBodyHtml ? {} : { display: "none" }}
            contentEditable="true"
            onFocus={handleFocus}
            onKeyDown={handleContentChange}
            onBlur={() =>
              handleChangeFormValue({
                bodyHtml: contentRef.current.innerHTML,
              })
            }
          ></ContentDisplay>
        </Box>
      </FormLayout>
    </Card>
  );
};

export default MainContent;
