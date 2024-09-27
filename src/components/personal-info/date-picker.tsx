import { DateInput } from "@nextui-org/date-input";
import { CalendarDate } from "@internationalized/date";

export default function DatePicker() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 bg-white">
      <DateInput
        label={"Birth date"}
        placeholderValue={new CalendarDate(1995, 11, 6)}
        className="max-w-sm"
      />
    </div>
  );
}
