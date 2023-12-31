import React from 'react';
import { DatePickerInput, DatePickerInputProps, DateValue, DatesRangeValue } from '@mantine/dates';
import { dayjsNeutral } from 'src/lib/dateFunctions';

// note: DateValue = Date | null
// but DatePicker input needs Date | undefined

interface NullableDatePickerInputProps extends Omit<DatePickerInputProps, 'onChange' | 'value'> {
    value: Date | null;
    onChange?: (value: DateValue) => void;
}

const NullableDatePickerInput: React.FC<NullableDatePickerInputProps> = ({ value, onChange, ...props }) => {
    const handleChange = (values: DateValue | DatesRangeValue | Date[]) => {

        // extract the first date
        let newValue = Array.isArray(values) ? values[0] : values;
        onChange?.(newValue);
    };

    // massage the value into undefined
    const valueOrUndefined = value === null ? undefined : dayjsNeutral(value).toDate();

    return (<>
        <DatePickerInput
            {...props}
            value={valueOrUndefined}
            onChange={handleChange}
        /></>
    );
};

export default NullableDatePickerInput;


// onChange = {(value) => {
//     if (value === null) {
//         form.setFieldValue('DateComplete', null);
//         return;
//     }
//     const newDate = dayjs(value.getDate());
//     form.setFieldValue('DateComplete',
//         newDate.isValid()
//             ? newDate.startOf('d').toDate()
//             : null);
