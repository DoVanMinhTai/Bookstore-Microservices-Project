import { Path, RegisterOptions, UseFormRegister, FieldValues } from 'react-hook-form';

type Option = {
    id: string | number;
    name: string;
};

type OptionSelectProps<T extends FieldValues> = {
    labelText: string;
    field: Path<T>;
    register: UseFormRegister<T>;
    registerOptions?: RegisterOptions<T, Path<T>>;
    error?: string;
    options?: Option[];
    defaultValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
};

export const OptionSelect = <T extends FieldValues>({
    labelText,
    field,
    register,
    registerOptions,
    error,
    options,
    defaultValue,
    placeholder,
    disabled,
}: OptionSelectProps<T>) => (
    <div className="w-full space-y-1.5">
        {/* Label */}
        <label 
            className="block text-sm font-semibold text-slate-700 ml-1" 
            htmlFor={`select-option-${field}`}
        >
            {labelText} 
            {registerOptions?.required && <span className="text-rose-500 ml-1">*</span>}
        </label>

        <div className="relative group">
            <select
                id={`select-option-${field}`}
                defaultValue={defaultValue || ''}
                {...register(field, registerOptions)}
                disabled={disabled}
                className={`
                    w-full px-4 py-2.5 rounded-xl border appearance-none outline-none transition-all duration-200
                    text-sm bg-white cursor-pointer
                    ${disabled ? 'bg-slate-50 cursor-not-allowed text-slate-400' : 'text-slate-900'}
                    ${error 
                        ? 'border-rose-500 focus:ring-4 focus:ring-rose-50' 
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50'
                    }
                `}
            >
                <option value="" disabled hidden>
                    {placeholder || '--- Chọn một tùy chọn ---'}
                </option>
                {(options || []).map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>

            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        {error && (
            <p className="flex items-center gap-1 text-[12px] font-medium text-rose-500 ml-1 animate-in fade-in slide-in-from-top-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
            </p>
        )}
    </div>
);