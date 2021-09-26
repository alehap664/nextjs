import React, { useState, useCallback } from 'react';
import { jsx, css } from '@emotion/react';

import TextField from '../../src/components/atoms/TextField';
import Autocomplete from '../../src/components/atoms/Autocomplete';

import { OptionSelect } from '../../src/types';
const optionsInit: OptionSelect[] = [
  {
    label: 'Test01',
    value: 'test1',
  },
  {
    label: 'Test02',
    value: 'test2',
  },
  {
    label: 'Test03',
    value: 'test3',
  },
  {
    label: 'Test04',
    value: 'test4',
  },
  {
    label: 'Test05',
    value: 'test5',
  },
  {
    label: 'Test011',
    value: 'test11',
  },
  {
    label: 'Test021',
    value: 'test21',
  },
  {
    label: 'Test031',
    value: 'test31',
  },
  {
    label: 'Test041',
    value: 'test41',
  },
  {
    label: 'Test051',
    value: 'test51',
  },
]
const CreateUI = () => {
  const [value, setValue] = useState('');
  const [valueOptions, setValueOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<OptionSelect[]>(optionsInit);

  const handleAutoChange = useCallback((v: string[]) => {
    setValueOptions(v);
  }, []);
  
  return (
    <div css={css({ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' })}>
      <div css={css({ display: 'flex', flexDirection: 'column', gap: '10px' })}>
        <TextField value={value} onChange={(e) => setValue(e)} />
        <Autocomplete
          value={valueOptions}
          ontions={options} onChange={handleAutoChange}
          // renderOption={(obj, checked) => (
          //   <div css={css({ backgroundColor: 'red' })}>{obj.label}</div>
          // )}
        />
      </div>
    </div>
  );
};

export default CreateUI;