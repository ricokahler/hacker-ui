import React from 'react';
import {
  createStyles,
  PropsFromStyles,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableBodyCell,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    overflow: auto;
    margin: ${theme.space(1)} 0;
  `,
  title: css`
    color: ${theme.colors.danger};
  `,
  numberCell: css`
    text-align: right;
  `,
  headerRow: css`
    th {
      font-weight: 600;
    }
  `,
  hoverableRow: css`
    :hover {
      background-color: rgba(204, 204, 204, 0.2);
      transition: background-color 0.4s;
    }
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function createData(
  name: string,
  npmPath: string,
  bundleSizeMinified: number,
  bundleSizeMinifiedZipped: number,
  downloadTime2G: number,
  downloadTime3G: number,
) {
  return {
    name,
    npmPath,
    bundleSizeMinified,
    bundleSizeMinifiedZipped,
    downloadTime2G,
    downloadTime3G,
  };
}

const rows = [
  createData('Hacker UI', 'hacker-ui@0.1.0-alpha.1', 71.2, 18.7, 620, 374),
  createData(
    'React Style System',
    '@react-style-system/ssr@0.0.0-0844f6041',
    10.7,
    4.4,
    146,
    87,
  ),
  createData(
    'Material UI Core',
    '@material-ui/core@4.9.7',
    313.5,
    88.6,
    2950,
    1770,
  ),
  createData(
    'Material UI Styles',
    '@material-ui/styles@4.9.6',
    46,
    14.1,
    470,
    282,
  ),
  createData(
    'Styled Components',
    'styled-components@5.0.1',
    32.4,
    12.4,
    414,
    248,
  ),
  createData('Emotion Core', '@emotion/core@10.0.28', 17.6, 6.5, 218, 131),
];

function TableExample(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <Table>
        <TableHead>
          <TableRow className={styles.headerRow}>
            <TableHeaderCell>Package Name</TableHeaderCell>
            <TableHeaderCell>npm Path Name</TableHeaderCell>
            <TableHeaderCell>Bundle Size – Minified (kB)</TableHeaderCell>
            <TableHeaderCell>
              Bundle Size – Minified + GZipped (kB)
            </TableHeaderCell>
            <TableHeaderCell>Download Time – 2G Edge (ms)</TableHeaderCell>
            <TableHeaderCell>Download Time – Emerging 3G (ms)</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} className={styles.hoverableRow}>
              <TableHeaderCell>{row.name}</TableHeaderCell>
              <TableBodyCell>{row.npmPath}</TableBodyCell>
              <TableBodyCell className={styles.numberCell}>
                {row.bundleSizeMinified}
              </TableBodyCell>
              <TableBodyCell className={styles.numberCell}>
                {row.bundleSizeMinifiedZipped}
              </TableBodyCell>
              <TableBodyCell className={styles.numberCell}>
                {row.downloadTime2G}
              </TableBodyCell>
              <TableBodyCell className={styles.numberCell}>
                {row.downloadTime3G}
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Root>
  );
}

export default TableExample;
