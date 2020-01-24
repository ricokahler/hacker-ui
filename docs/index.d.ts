import React from 'react';

export type DocArray = Array<{
  title: string;
  value: DocArray | React.ComponentType<any>;
}>;

declare const arr: DocArray;
export default arr;
