import { useState } from "react";
import {
  Box,
  Popover,
  TextField,
  Text,
  OptionList,
  Icon,
} from "@shopify/polaris";
import { ClockMajor } from "@shopify/polaris-icons";

import { timeList } from "../../utils/constant";

const TimePicking = ({ formState, handleChangeFormValue }) => {
  const publishedAt = new Date(formState.publishedAt);
  const formattedTime =
    publishedAt.toLocaleTimeString().slice(0, 4) +
    publishedAt.toLocaleTimeString().slice(7);

  const [active, setActive] = useState(false);

  const handleTimeSelection = (value) => {
    const newTime = new Date(value + ":00");
    newTime.setDate(publishedAt.getDate());
    newTime.setMonth(publishedAt.getMonth());
    newTime.setFullYear(publishedAt.getFullYear());
    handleChangeFormValue({ publishedAt: newTime });
    setActive(false);
  };

  function handleInputTimeChange() {
    console.log("handleInputValueChange");
  }
  function handleCloseTimeSelect({ relatedTarget }) {
    setActive(false);
  }

  let times;
  if (new Date().toLocaleDateString() < publishedAt.toLocaleDateString()) {
    times = timeList;
  } else {
    const index = timeList.findIndex((value) => value === formattedTime);
    times = timeList.slice(index);
  }
  const choiceList = times.map((time) => ({
    value: time,
    label: time,
  }));
  console.log(choiceList);

  return (
    <Box>
      <Popover
        active={active}
        autofocusTarget="none"
        preferredAlignment="left"
        preferInputActivator={false}
        preferredPosition="below"
        preventCloseOnChildOverlayClick
        onClose={handleCloseTimeSelect}
        fullWidth
        activator={
          <TextField
            role="combobox"
            prefix={<Icon source={ClockMajor} />}
            suffix={<Text>GMT+7</Text>}
            value={formattedTime}
            onFocus={() => setActive(true)}
            onChange={handleInputTimeChange}
            autoComplete="off"
          />
        }
      >
        <OptionList
          selected={[]}
          options={choiceList}
          onChange={(value) => handleTimeSelection(value[0])}
        />
      </Popover>
    </Box>
  );
};

export default TimePicking;
