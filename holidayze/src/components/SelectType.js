import Select from "react-select";
import React from "react";

const SelectType = ({ options, onChange }) => {
  return (
    <div className="stays__filter">
      <Select
        defaultValue={options[0]}
        options={options}
        onChange={onChange}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#e63946",
          },
        })}
      />
    </div>
  );
};

export default SelectType;
