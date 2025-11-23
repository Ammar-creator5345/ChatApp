import { Field } from "formik";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useState } from "react";
import { useFormikContext } from "formik";

type inputTypes = {
  name: keyof formValuesTypes;
  fieldType: string;
  placeholder: string;
  icon: React.ReactNode;
  secondIcon: React.ReactNode;
  isPasswordField?: boolean;
  handleToggle?: () => void;
  isVisible?: boolean;
  value?: string;
};
type formValuesTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const InputField = ({
  name,
  fieldType,
  placeholder,
  icon,
  secondIcon,
  isPasswordField = false,
  handleToggle,
  isVisible,
  value,
}: inputTypes) => {
  const { errors, touched } = useFormikContext<formValuesTypes>();
  return (
    <div>
      <div className="flex items-center justify-between border-b border-b-[#5353c4] mt-3">
        <div className="flex items-center gap-2 w-full">
          {icon}
          <Field
            name={name}
            type={fieldType}
            placeholder={placeholder}
            className="bg-transparent outline-none w-full p-2 text-white text-[18px]"
          />
        </div>
        {!isPasswordField && value && secondIcon}
        {isPasswordField && (
          <button type="button" onClick={handleToggle}>
            {isVisible ? (
              <VisibilityOffOutlinedIcon sx={{ color: "white" }} />
            ) : (
              <VisibilityOutlinedIcon sx={{ color: "white" }} />
            )}
          </button>
        )}
      </div>
      {errors[name] && touched[name] && (
        <p className="text-white text-[12px] mt-1">{errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
