import React, { useContext, createContext, useState } from "react";

const FilterDataContext = createContext();

const DataFilter = ({ children }) => {
  const [values, setValues] = useState([]);

  return (
    <FilterDataContext.Provider value={[values, setValues]}>
      {children}
    </FilterDataContext.Provider>
  );
};

const useFilter = () => useContext(FilterDataContext);

export { useFilter, DataFilter };
