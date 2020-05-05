import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableBodyCell,
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
  numberPerOnce: number,
  calories: number,
  protein: number,
  totalFat: number,
) {
  return {
    name,
    numberPerOnce,
    calories,
    protein,
    totalFat,
  };
}

const rows = [
  createData('Almonds', 23, 160, 6, 14),
  createData('Cashews', 18, 160, 4, 13),
  createData('Hazelnuts', 21, 180, 4, 17),
  createData('Pistachios', 49, 160, 4, 18),
];

function TableExample(props: Props) {
  const { Root, styles } = useStyles(props);

  return (
    <Root>
      <TableContainer>
        <Table variant="contained" color="orange">
          <TableHead>
            <TableRow>
              <TableHeaderCell colSpan={5}>
                Nutrients per 1 ounce (weight)
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nut Variety</TableHeaderCell>
              <TableHeaderCell>Approx # of Nuts</TableHeaderCell>
              <TableHeaderCell>Calories (kcal)</TableHeaderCell>
              <TableHeaderCell>Protein (g)</TableHeaderCell>
              <TableHeaderCell>Total Fat (g)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} hoverable>
                <TableHeaderCell>{row.name}</TableHeaderCell>
                <TableBodyCell className={styles.numberCell}>
                  {row.numberPerOnce}
                </TableBodyCell>
                <TableBodyCell className={styles.numberCell}>
                  {row.calories}
                </TableBodyCell>
                <TableBodyCell className={styles.numberCell}>
                  {row.protein}
                </TableBodyCell>
                <TableBodyCell className={styles.numberCell}>
                  {row.totalFat}
                </TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
}

export default TableExample;
