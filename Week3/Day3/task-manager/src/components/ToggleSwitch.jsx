const ToggleSwitch = ({ checked, onChange, disabled = false }) => {
    const sizeClasses = "w-14 h-7"; 
    const knobSizeClasses = "w-6 h-6"; 
    const translateClasses = checked ? "translate-x-7" : "translate-x-0";

    return (
        <div className="relative inline-block">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="sr-only"
            />
            <div
                onClick={!disabled ? onChange : undefined}
                className={`
                    ${sizeClasses} 
                    relative transition-all duration-300 ease-in-out
                    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                style={{
                    backgroundColor: checked ? "#457b9d" : "#e5e5e5",
                }}
            >
                <div
                    className={`
                        ${knobSizeClasses}
                        ${translateClasses}
                        absolute top-0.5 left-0.5 transition-all duration-300 ease-in-out transform
                    `}
                    style={{
                        backgroundColor: "#f1faee",
                        boxShadow: "0 2px 4px rgba(29, 53, 87, 0.2)",
                    }}
                />
            </div>
        </div>
    );
};

export default ToggleSwitch;
