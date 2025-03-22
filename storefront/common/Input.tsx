import { HTMLInputTypeAttribute } from "react";
import {
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
    labelText: string;
    field: Path<T>;
    register: UseFormRegister<T>;
    error?: string;
    type?: HTMLInputTypeAttribute;
    registerOptions?: RegisterOptions<T, Path<T>>;
    defaultValue?: number | string | string[];
    disabled?: boolean;
    placeholder?: string;
};

export const Input = <T extends FieldValues>({
    labelText,
    field,
    register,
    registerOptions = {},
    error,
    defaultValue,
    type = "text",
    disabled = false,
    placeholder,
}: InputProps<T>) => (
    <div className="mb-4">
        {/* Label */}
        <label htmlFor={field} className="block text-sm font-medium text-gray-700">
            {labelText}
            {registerOptions?.required && <span className="text-red-500"> *</span>}
        </label>

        {/* Input Field */}
        <input
            type={type}
            id={field}
            className={`mt-1 block w-full rounded-md border p-2 shadow-sm focus:outline-none focus:ring-2 transition-all ${error
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
            {...register(field, registerOptions)}
            defaultValue={defaultValue}
            disabled={disabled}
            placeholder={placeholder}
        />

        {/* Error Message */}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);
