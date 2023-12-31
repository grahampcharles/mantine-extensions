import { TextareaProps, Textarea } from "@mantine/core";

interface NullableTextareaProps extends Omit<TextareaProps, 'onChange' | 'value'> {
    value: string | null;
    onChange?: (value: string | null) => void;
}

const NullableTextarea: React.FC<NullableTextareaProps> = ({ value, onChange, ...props }) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Call the onChange prop with either the current value or null
        onChange?.(event.currentTarget.value || null);
    };

    return (
        <Textarea
            {...props}
            value={value || ''}
            onChange={handleChange}
        />
    );
};

export default NullableTextarea;