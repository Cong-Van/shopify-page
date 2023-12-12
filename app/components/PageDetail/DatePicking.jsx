import { useState } from "react";
import { Box, Popover, TextField, DatePicker, Icon } from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";

const DatePicking = ({ formState, handleChangeFormValue }) => {
  const publishedAt = new Date(formState.publishedAt);

  const [active, setActive] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: publishedAt.getMonth(),
    year: publishedAt.getFullYear(),
  });

  const handleInputDateChange = (value) => {
    console.log(new Date(value));
  };
  function handleCloseDatePick({ relatedTarget }) {
    setActive(false);
  }
  function handleMonthChange(month, year) {
    setDate({ month, year });
  }
  function handleDateSelection({ end: newSelectedDate }) {
    publishedAt.setDate(newSelectedDate.getDate());
    publishedAt.setMonth(newSelectedDate.getMonth());
    publishedAt.setFullYear(newSelectedDate.getFullYear());
    handleChangeFormValue({ publishedAt: publishedAt });
    setActive(false);
  }

  let dateToSelect = new Date();
  dateToSelect.setDate(dateToSelect.getDate() - 1);
  const formattedDate = publishedAt.toLocaleDateString();

  return (
    <Box>
      <Popover
        active={active}
        autofocusTarget="none"
        preferredAlignment="center"
        preferInputActivator={false}
        preferredPosition="below"
        preventCloseOnChildOverlayClick
        onClose={handleCloseDatePick}
        activator={
          <TextField
            role="combobox"
            prefix={<Icon source={CalendarMajor} />}
            value={formattedDate}
            onFocus={() => setActive(true)}
            onChange={handleInputDateChange}
            autoComplete="off"
          />
        }
      >
        <DatePicker
          fullWidth
          month={month}
          year={year}
          selected={publishedAt}
          onMonthChange={handleMonthChange}
          onChange={handleDateSelection}
          disableDatesBefore={dateToSelect}
        />
      </Popover>
    </Box>
  );
};

export default DatePicking;
