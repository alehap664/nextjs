import React, { useState, useEffect, useRef } from 'react';
import { css, SerializedStyles, keyframes } from '@emotion/react';
import Effect from './Effect';


type PaperProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  customStyle?: SerializedStyles;
  rootRef: React.RefObject<HTMLDivElement>;
};

const styles = {
  root: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    transition: '.2s ease',
    opacity: 0,
    visibility: 'hidden',
  }),
  rootOpen: css({
    opacity: 1,
    visibility: 'visible',
  }),
  default: css({
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
  }),
  mask: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'inherit',
    height: 'inherit'
  }),
}

const Paper: React.FC<PaperProps> = ({
  isOpen,
  setIsOpen,
  customStyle,
  children,
  rootRef,
}) => {  
  const [offset, setOffset] = useState({ x: `0px`, y: `0px` });
  const [isHidden, setIsHidden] = useState(false);
  const refPaper = useRef<HTMLDivElement>(null);
  
  const minWidth = `${rootRef?.current?.offsetWidth ? `${rootRef?.current?.offsetWidth}px` : '100%'}`

  const handleClose = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log('run');

    const winHeight = window.innerHeight;
    const paperHeight = refPaper?.current?.offsetHeight || 0;
    const offset_x = rootRef?.current?.offsetLeft || 0;
    let offset_y = (rootRef?.current?.offsetTop || 0) + (rootRef?.current?.offsetHeight || 0);
    const isHidden = offset_y + paperHeight >= winHeight;

    if (isHidden) {
      setIsHidden(true)
      const marginTop = -10;
      offset_y = winHeight - paperHeight + marginTop;
    }
    else {
      setIsHidden(false)
    }

    setOffset({
      x: `${offset_x}px`,
      y: `${offset_y}px`
    })
  }, [rootRef?.current?.offsetHeight])

  return (
    <div
      css={[
        styles.root,
        isOpen && styles.rootOpen,
        { 
          zIndex: isHidden ? 1000 : 999,
        },
      ]}
    >
      <div css={styles.mask} onClick={handleClose}>
      </div>
      <div ref={refPaper} css={css({ top: offset.y, left: offset.x, minWidth, position: 'absolute', zIndex: 1, backgroundColor: 'white' })}>
        <Effect>
          <div css={css([styles.default, customStyle])}>
            { children }
          </div>
        </Effect>
      </div>
    </div>
  )
};

export default Paper;