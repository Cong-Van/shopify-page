import { useState } from "react";
import {
  Popover,
  Button,
  Box,
  Card,
  Tabs,
  ColorPicker,
  TextField,
  BlockStack,
} from "@shopify/polaris";
import { TextColorMajor } from "@shopify/polaris-icons";

const ColorPicking = () => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState("#fff");
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const handleColorSelection = (value) => {
    console.log(value);
    setColor(value);
  };

  const handleInputChange = (value) => {
    console.log(value);
    setValue(value);
  };

  const tabs = [
    {
      id: "1",
      content: "Text",
      panelID: "1",
    },
    {
      id: "2",
      content: "Back ground",
      panelID: "2",
    },
  ];

  return (
    <Popover
      active={active}
      autofocusTarget="none"
      preferredAlignment="center"
      preferInputActivator={false}
      preferredPosition="below"
      preventCloseOnChildOverlayClick
      onClose={() => setActive(false)}
      activator={
        <Button
          icon={TextColorMajor}
          disclosure="down"
          pressed={active}
          onClick={() => setActive((preValue) => !preValue)}
        />
      }
    >
      <Box maxWidth="220px">
        <Tabs
          fitted
          tabs={tabs}
          selected={selected}
          onSelect={(selectedTabIndex) => setSelected(selectedTabIndex)}
        />
        <Box maxWidth="200px" padding={300}>
          <BlockStack gap={200}>
            <ColorPicker onChange={handleColorSelection} color={color} />
            <TextField
              label="Hex color"
              prefix={
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    boxShadow:
                      "inset 0 0 0 1px #00000012, inset 0 1px 3px 0 #00000026",
                    borderRadius: "50%",
                    backgroundColor: `${value}`,
                  }}
                ></div>
              }
              labelHidden
              value={value}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </BlockStack>
        </Box>
      </Box>
    </Popover>
  );
};

export default ColorPicking;
