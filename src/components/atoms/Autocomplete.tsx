import React, { useRef, useState, useEffect, memo } from 'react';
import { css } from '@emotion/react';

import Paper from './Paper';
import Icon from '../icon';

// Type, Interface
import { OptionSelect } from '../../types';
import ItemList from '../molecules/ItemList';

type AutocompleteProps = {
  iconClear?: boolean;
  value: string[];
  fullWidth?: boolean;
  placeholder?: string;
  ontions: OptionSelect[];
  onChange: (v: string[]) => void;
  renderOption?: (obj: OptionSelect, checked: boolean) => JSX.Element;
};

const styles = {
  root: css({
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    flexWrap: 'wrap',
    width: '275px',
    minHeight: '32px',
    padding: '6px 8px',

    '&:hover .oulineInput': {
      borderColor: 'blue',
    },
  }),
  input: css({
    height: '20px',
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
    minWidth: '20%',
    lineHeight: '20px',
    outline: 'none',
    border: 'none',
    fontSize: '14px',
    flex: 1,
    '&:focus + .oulineInput': {
      borderColor: 'blue',
    },
  }),
  inputIcon: css({
    paddingRight: '28px',
  }),
  inputFullWidth: css({
    width: '100%',
  }),
  fieldset: css({
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    lineHeight: '20px',
    padding: '4px 8px',
    outline: 'none',
    border: '1px solid grey',
    borderRadius: '4px',
    transition: '.2s ease',
    pointerEvents: 'none',
  }),
  icon: css({
    position: 'absolute',
    top: '50%',
    right: '8px',
    transform: 'translate(0, -50%)',
    zIndex: 1,
  }),
  open: css({
    zIndex: 1000,
  }),
  
};

const selectedStyles = {
  selectedWrap: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  }),
  chip: css({
    gap: '8px',
    height: '20px',
    backgroundColor: '#ebf6ff',
    display: 'flex',
    padding: '0 8px',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '16px',
    borderRadius: '2px',
  }),
}

const optionStyle = {
  optionWrap: css({
    backgroundColor: '#FFFFFF',
    maxHeight: '164px',
    overflow: 'auto',
  }),
  option: css({
    display: 'block',
    padding: 10,
    transition: 'hover 0.2s ease',
    color: '#253746',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#E4E7E9',
    },
  }),
  checked: css({
    backgroundColor: '#ebf6ff',
    color: '#0369C7',
  }),
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  iconClear = true,
  value,
  fullWidth = false,
  ontions,
  onChange,
  renderOption,
}) => {
  console.log('Autocomplete render');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const [newOption, setNewOption] = useState<(OptionSelect & { checked: boolean })[]>(
    ontions.map((opt) => ({
      ...opt,
      checked: value.includes(opt.value),
    })),
  );

  useEffect(() => {
    isOpen && inputRef?.current && inputRef.current.focus();
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClear = () => {
    setSearch('');
  };

  const renderSelected = () => {
    return (
      value.map((v, index) => (
        <div css={selectedStyles.chip} key={String(index)}>
          {v}
          <Icon type="close" size={'12px'} onClick={() => {
            const obj = newOption.find(opt => opt.label === v);
            obj && handleClickSelected(obj);
          }} />
        </div>
      ))
    )
  };

  const handleClickSelected = (obj: OptionSelect & { checked: boolean }) => {
    obj.checked = !obj.checked;
    setNewOption([...newOption]);
    onChange(newOption.filter((opt) => opt.checked).map((opt) => opt.label));
  };

  const renderOptions = () => {
    const filterOption = newOption.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()));
    return (
      <ul css={optionStyle.optionWrap}>
        {filterOption.length > 0 ? (
          filterOption.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleClickSelected(opt)}
              css={css([optionStyle.option, opt.checked && optionStyle.checked])}
            >
              {renderOption ? renderOption(opt, opt.checked) : <span>{opt.label}</span>}
            </li>
          ))
        ) : (
          <li css={css([optionStyle.option])}>No Options</li>
        )}
      </ul>
    );
  };

  return (
    <>
      <div
        ref={rootRef}
        css={css([
          styles.root,
          fullWidth && styles.inputFullWidth,
          iconClear && value && styles.inputIcon,
          isOpen && styles.open,
          selectedStyles.selectedWrap,
        ])}
        onClick={handleOpen}
      >
        {renderSelected()}
        {(value.length === 0 || isOpen) && <input
          ref={inputRef}
          css={[styles.input]}
          type="text"
          value={search}
          placeholder={`Enter Value`}
          onChange={(e) => setSearch(e.target.value)}
        />}
        
        <fieldset className={`oulineInput`} css={styles.fieldset}></fieldset>
        {iconClear && search && isOpen && <Icon type="close" customStyle={styles.icon} onClick={handleClear} />}
      </div>
      <Paper rootRef={rootRef} isOpen={isOpen} setIsOpen={setIsOpen}>
        {renderOptions()}
      </Paper>
    </>
  );
};

export default memo(Autocomplete);
