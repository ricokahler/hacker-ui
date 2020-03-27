import React from 'react';
import {
  createStyles,
  PropsFromStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableBodyCell,
} from 'hacker-ui';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    margin-top: ${theme.space(1)};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function createData(
  language: string,
  imperative: string,
  objectOriented: string,
  functional: string,
  generic: string,
) {
  return {
    language,
    imperative,
    objectOriented,
    functional,
    generic,
  };
}

const rows = [
  createData('C', 'yes', '', '', 'yes'),
  createData('C++', 'yes', 'yes', 'yes', 'yes'),
  createData('C#', 'yes', 'yes', 'yes', 'yes'),
  createData('Java', 'yes', 'yes', 'yes', 'yes'),
  createData('JavaScript', 'yes', 'yes', 'yes', ''),
];

function TableExample(props: Props) {
  const { Root } = useStyles(props);

  return (
    <Root>
      <TableContainer>
        <Table variant="ghost">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Language</TableHeaderCell>
              <TableHeaderCell>Imperative</TableHeaderCell>
              <TableHeaderCell>Object-oriented</TableHeaderCell>
              <TableHeaderCell>Functional</TableHeaderCell>
              <TableHeaderCell>Generic</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.language} hoverable>
                <TableHeaderCell>{row.language}</TableHeaderCell>
                <TableBodyCell>{row.imperative}</TableBodyCell>
                <TableBodyCell>{row.objectOriented}</TableBodyCell>
                <TableBodyCell>{row.functional}</TableBodyCell>
                <TableBodyCell>{row.generic}</TableBodyCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Root>
  );
}

export default TableExample;
