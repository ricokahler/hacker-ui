import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableBodyCell,
  TableCaption,
} from 'hacker-ui';
import { createStyles, PropsFromStyles } from 'react-style-system';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    margin-top: ${theme.space(1)};
  `,
  numberCell: css`
    text-align: right;
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Package Name</TableHeaderCell>
              <TableHeaderCell>npm Path Name</TableHeaderCell>
              <TableHeaderCell>Bundle Size – Minified (kB)</TableHeaderCell>
              <TableHeaderCell>
                Bundle Size – Minified + GZipped (kB)
              </TableHeaderCell>
              <TableHeaderCell>Download Time – 2G Edge (ms)</TableHeaderCell>
              <TableHeaderCell>
                Download Time – Emerging 3G (ms)
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} hoverable>
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
          <TableCaption>Source: bundlephobia.com (March, 2020)</TableCaption>
        </Table>
      </TableContainer>
    </Root>
  );
}

export default TableExample;
