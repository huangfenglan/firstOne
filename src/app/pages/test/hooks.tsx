import { useEffect, useState } from 'react';

const useTableData = (params, cuspromise) => {
  const [value, setValue] = useState('');

  const getValue = () => {
    try {
      const preParams = localStorage.get('preParams');
      if (JSON.stringify(params) === preParams) {
        const data = JSON.parse(localStorage.getItem('curData'));
        setValue(data);
      } else {
        updateValue();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getValue();
  }, []);

  const updateValue = async () => {
    try {
      const result = await cuspromise(params);
      localStorage.setItem('preParams', params);
      localStorage.setItem('curData', result);
      setValue(result);
    } catch (error) {}
  };

  return {
    value,
    updateValue,
  };

  // const key=Date.now()
};
