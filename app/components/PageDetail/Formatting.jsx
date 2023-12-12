import { useState } from "react";
import { Popover, Button, OptionList } from "@shopify/polaris";
import { TypeMajor } from "@shopify/polaris-icons";

import { formatList } from "../../utils/constant";

const Formatting = () => {
  const [active, setActive] = useState(false);

  const handleChangeType = (value) => {
    console.log(value);
  };

  const formats = formatList.map((type) => ({ value: type, label: type }));

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
          icon={TypeMajor}
          disclosure="down"
          pressed={active}
          onClick={() => setActive((preValue) => !preValue)}
        />
      }
    >
      <OptionList
        selected={[]}
        options={formats}
        onChange={(value) => handleChangeType(value)}
      />
    </Popover>
  );
};

export default Formatting;
