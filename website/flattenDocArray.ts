import { RouteProps } from 'react-router-dom';
import { DocArray } from '../docs';

interface Route extends RouteProps {
  title: string;
}

function flattenDocArray(docArray: DocArray, rootPath = ''): Route[] {
  return docArray
    .map(({ title, value }) => {
      const slug = title.toLowerCase().replace(/ /g, '-');
      const path = `${rootPath}/${slug}`;

      if (Array.isArray(value)) {
        return flattenDocArray(value, path);
      }

      return [
        {
          title,
          path,
          component: value,
        },
      ];
    })
    .reduce((acc, next) => {
      for (const i of next) {
        acc.push(i);
      }
      return acc;
    }, [] as Route[]);
}

export default flattenDocArray;
