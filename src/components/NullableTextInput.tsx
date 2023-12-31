import { TextInputProps, TextInput } from "@mantine/core";

interface NullableTextInputProps extends Omit<TextInputProps, 'onChange' | 'value'> {
    value: string | null | undefined;
    onChange?: (value: string | null) => void;
}

const NullableTextInput: React.FC<NullableTextInputProps> = ({ value, onChange, ...props }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Call the onChange prop with either the current value or null
        const newValue: string | null = (event.currentTarget.value.length === 0 ? null : event.currentTarget.value);
        onChange?.(event.currentTarget.value || null);
    };

    return (
        <TextInput
            {...props}
            value={value || ''}
            onChange={handleChange}
        />
    );
};

export default NullableTextInput;