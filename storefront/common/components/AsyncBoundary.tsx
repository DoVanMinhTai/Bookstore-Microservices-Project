import React from 'react';

export interface AsyncBoundaryProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  className?: string;
}

const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
  isLoading,
  error,
  children,
  className,
}) => {
  const wrapperClassName = className ? className : '';

  return (
    <div className={wrapperClassName}>
      <div className="relative">
        {children}

        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
            <div className="h-8 w-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
          </div>
        )}
      </div>

      {!isLoading && !!error && (
        <div className="mt-2 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-red-400 text-xs font-bold">
            !
          </div>
          <span>{error || 'Đã xảy ra lỗi khi tải dữ liệu.'}</span>
        </div>
      )}
    </div>
  );
};

export default AsyncBoundary;