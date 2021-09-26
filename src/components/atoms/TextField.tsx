import React, { useRef } from 'react';
import { css } from '@emotion/react';
import Icon from '../icon'

type TextFieldProps = {
  iconClear?: boolean;
  value: string;
  fullWidth?: boolean;
  size?: 'small' | 'normal';
  placeholder?: string;
  onChange: (v: string) => void;
  onChangeObject?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = {
  root: css({
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',

    '&:hover .oulineInput': {
      borderColor: 'blue',
    },
  }),
  input: css({
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
    width: '275px',
    height: '100%',
    lineHeight: '20px',
    padding: '8px 8px',
    outline: 'none',
    border: 'none',

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
  }),
  icon: css({
    position: 'absolute',
    top: '50%',
    right: '8px',
    transform: 'translate(0, -50%)',
    zIndex: 1,
  }),
}

const sizeStyles = {
  small: css({
    height: '24px',
  }),
  normal: css({
    height: '32px',
  }),
}


const TextField: React.FC<TextFieldProps> = ({
  iconClear = true,
  value,
  fullWidth = false,
  size = 'normal',
  placeholder = 'Enter value',
  onChange,
  onChangeObject,
}) => {
  console.log('Textfield render');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    inputRef && inputRef?.current?.focus();
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeObject && onChangeObject(e);
    onChange(e.target.value);
  }

  const handleClear = () => {
    onChange('');
  };
  return (
    <div css={[styles.root, sizeStyles[size]]} onClick={handleFocus}>
      <input
        ref={inputRef}
        css={[styles.input, iconClear && value && styles.inputIcon, fullWidth && styles.inputFullWidth]}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
      <fieldset className={`oulineInput`} css={styles.fieldset}></fieldset>
      {iconClear && value && <Icon type='close' customStyle={styles.icon} onClick={handleClear} />}
    </div>
  );
};

export default TextField;