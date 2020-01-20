import React, { useMemo } from 'react';
import ColorContext from './ColorContext';

interface Props {
  color: string;
  on: string;
  children: React.ReactNode;
}

function ColorProvider({ on, color, children }: Props) {
  const contextValue = useMemo(() => ({ on, color }), [color, on]);
  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
}

export default ColorProvider;
