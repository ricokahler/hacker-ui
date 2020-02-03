import React from 'react';
import { Button, createStyles, PropsFromStyles, useTheme } from 'hacker-ui';
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

function ButtonLinks(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  return (
    <Root>
      <div className={styles.row}>
        <div className={styles.label}>
          This button actually an{' '}
          <code>
            {'<'}a{'>'}
          </code>{' '}
          tag:
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.button}
            variant="outlined"
            // eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid
            component={props => <a href="#" {...props} />}
          >
            Normal Link
          </Button>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.label}>
          This button is a{' '}
          <code>
            {'<'}Link{'/>'}
          </code>{' '}
          from <code>react-router</code>:
        </div>
        <div className={styles.buttonContainer}>
          <StaticRouter>
            <Button
              className={styles.button}
              variant="filled"
              color={theme.colors.brand}
              component={props => (
                <Link to="/components/buttons-and-links" {...props} />
              )}
            >
              Router Link
            </Button>
          </StaticRouter>
        </div>
      </div>
    </Root>
  );
}

export default ButtonLinks;
