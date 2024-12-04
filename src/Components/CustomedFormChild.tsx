import { Select } from 'antd';
import { pinyin } from 'pinyin-pro';
import { match } from 'pinyin-pro';
import { useEffect, useState } from 'react';

interface selectOption {
  key: string | number | null | undefined;
  label: string;
  [key: string]: any;
}

interface PinyinTs {
  value: string;
  onChange: (param: any) => void;
  options: selectOption[];
  [key: string]: any;
}

//支持拼音搜索
export const SelecetByPinyin = ({
  value,
  onChange,
  options = [],
  ...rest
}: PinyinTs) => {
  const [selectedData, setSelectedData] = useState(value);
  useEffect(() => {
    !!selectedData && onChange && onChange(selectedData);
  }, [selectedData]);
  return (
    <Select
      placeholder="请输入英文、汉字、拼音进行搜索"
      options={options}
      value={selectedData}
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
