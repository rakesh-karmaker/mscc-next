type SubmitBtnProps = {
  isLoading: boolean;
  pendingText: string;
  children: React.ReactNode;
  width?: string;
};

const SubmitBtn = ({
  isLoading,
  pendingText,
  children,
  ...rest
}: SubmitBtnProps) => {
  const width = rest?.width ?? "fit-content";

  return (
    <div className="submit-btn-container">
      <button
        disabled={isLoading}
        type="submit"
        className="primary-button"
        style={{ width: width }}
      >
        {isLoading ? `${pendingText}...` : children}
      </button>
    </div>
  );
};

export default SubmitBtn;
