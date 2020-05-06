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
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function createData(
  person: string,
  english: string,
  spanish: string,
  french: string,
  latin: string,
) {
  return {
    person,
    english,
    spanish,
    french,
    latin,
  };
}

const rows = [
  createData('I', 'like', 'amo', 'aime', 'amo'),
  createData('you (singular)', 'like', 'amas', 'aimes', 'amas'),
  createData('he, she, it', 'likes', 'ama', 'aime', 'amat'),
  createData('we', 'like', 'amamos', 'aimons', 'amamus'),
  createData('you (plural)', 'like', 'amais', 'aimez', 'amatis'),
  createData('they', 'like', 'aman', 'aiment', 'amant'),
];

function TableExample(props: Props) {
  const { Root } = useStyles(props);

  return (
    <Root>
      <TableContainer>
        <Table variant="striped">
          <TableHead>
            <TableRow>
              <TableHeaderCell>&nbsp;</TableHeaderCell>
              <TableHeaderCell>English</TableHeaderCell>
              <TableHeaderCell>Spanish</TableHeaderCell>
              <TableHeaderCell>French</TableHeaderCell>
              <TableHeaderCell>Latin</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={`language-${i}`} hoverable>
                <TableHeaderCell>{row.person}</TableHeaderCell>
                <TableBodyCell>{row.english}</TableBodyCell>
                <TableBodyCell>{row.spanish}</TableBodyCell>
                <TableBodyCell>{row.french}</TableBodyCell>
                <TableBodyCell>{row.latin}</TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
}

export default TableExample;
