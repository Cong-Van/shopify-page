import { useState } from "react";
import { Popover, Button, OptionList } from "@shopify/polaris";
import { TextAlignmentLeftMajor } from "@shopify/polaris-icons";

import { alignmentList } from "../../utils/constant";

const Alignment = () => {
  const [active, setActive] = useState(false);

  const handleChangeType = (value) => {
    console.log(value);
  };

  const alignments = alignmentList.map((type) => ({
    value: type,
    label: type,
  }));

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
          icon={TextAlignmentLeftMajor}
          disclosure="down"
          pressed={active}
          onClick={() => setActive((preValue) => !preValue)}
        />
      }
    >
      <OptionList
        selected={[]}
        options={alignments}
        onChange={(value) => handleChangeType(value)}
      />
    </Popover>
  );
};

export default Alignment;
