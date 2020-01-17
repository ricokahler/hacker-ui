import React from 'react';
import FilledButton from './FilledButton';

export default {
  component: FilledButton,
  title: 'FilledButton',
};

export const Demo = () => (
  <div style={{ padding: '1rem' }}>
    <FilledButton color="#000">Okay</FilledButton>
  </div>
);
