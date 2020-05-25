import React from 'react';
import { Button } from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';
import { Link, StaticRouter } from 'react-router-dom';

const useStyles = createStyles(({ css, theme }) => ({
  root: css`
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
      margin-bottom: ${theme.space(1)};
    }
  `,
  row: css`
    display: flex;
    align-items: center;
  `,
  label: css`
    margin-right: ${theme.space(1)};
    width: ${theme.block(4)};
  `,
  buttonContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  button: css`
    min-width: ${theme.block(1.5)};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ButtonLinksExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <div className={styles.row}>
        <div className={styles.label}>
          This button actually an <code>{'<a>'}</code> tag:
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            variant="outlined"
            component="a"
            // @ts-ignore
            href="#"
          >
            Normal Link
          </Button>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          This button is a <code>{'<Link/>'}</code> from{' '}
          <code>react-router</code>:
        </div>
        <div className={styles.buttonContainer}>
          <StaticRouter>
            <Button
              className={styles.button}
              variant="filled"
              color={theme.brand}
              component={Link}
              // @ts-ignore
              to="/components/buttons-and-links"
            >
              Router Link
            </Button>
          </StaticRouter>
        </div>
      </div>
    </Root>
  );
}

export default ButtonLinksExample;
