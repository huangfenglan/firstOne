import { Select } from 'antd';
import { pinyin } from 'pinyin-pro';
import { match } from 'pinyin-pro';
import { useEffect, useState } from 'react';

//支持拼音搜索
export const SelecetByPinyin = ({
  value,
  onChange,
  options = [],
  ...rest
}: any) => {
  const [selectedData, setSelectedData] = useState(null);
  useEffect(() => {
    !!selectedData && onChange(selectedData);
  }, [selectedData]);
  return (
    <Select
      placeholder="请输入英文、汉字、拼音进行搜索"
      options={options}
      filterOption={(input, option) => {
        const { fieldNames = {} } = rest;
        const { label } = fieldNames;
        const inputLabel = !!label ? label : 'label';
        const finalInputLabel = option[inputLabel];

        const isEngMatch = finalInputLabel
          .toLowerCase()
          .includes(input.toLowerCase());

        const pinyinMatch =
          match(finalInputLabel.toLowerCase(), input.toLowerCase()) || [];
        const isPinyinMatch = !!pinyinMatch.length;

        return isEngMatch || isPinyinMatch;
      }}
      onSelect={(value) => setSelectedData(value)}
      {...rest}
    />
  );
};
