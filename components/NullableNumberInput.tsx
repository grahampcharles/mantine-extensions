import React from 'react';
import { NumberInput, NumberInputProps } from '@mantine/core';

interface NullableNumberInputProps extends Omit<NumberInputProps, 'onChange' | 'value'> {
    value: number | null;
    onChange?: (value: number | null) => void;
}

const NullableNumberInput: React.FC<NullableNumberInputProps> = ({ value, onChange, ...props }) => {
    const handleChange = (value: string | number) => {
        // Convert the input to a number or pass null if the conversion results in NaN
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        onChange?.(isNaN(numericValue) ? null : numericValue);
    };

    return (
        <NumberInput
            {...props}
            value={value === null ? '' : value}
            onChange={handleChange}
        />
    );
};


export default NullableNumberInput;