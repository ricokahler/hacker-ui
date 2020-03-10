import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalActions,
} from 'hacker-ui';
import { createStyles, PropsFromStyles, useTheme } from 'react-style-system';

const useStyles = createStyles(({ css, theme, staticVar }) => ({
  root: css`
    display: flex;
  `,
  button: css`
    margin: ${theme.gap(1)} auto;
  `,
  title: css`
    ${staticVar(theme.fonts.h4)};
    padding: 0 ${theme.space(1)};
  `,
  paragraph: css`
    ${staticVar(theme.fonts.body1)};
    margin: ${theme.space(1)} 0;
  `,
  modalScroll: css`
    overflow: auto;
    padding: 0 ${theme.space(1)};
  `,
  modalHeader: css`
    border-bottom: 1px solid ${theme.colors.bland};
  `,
  modalFooter: css`
    border-top: 1px solid ${theme.colors.bland};
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

function ModalExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Root>
        <Button
          className={styles.button}
          variant="filled"
          onClick={() => setOpen(true)}
        >
          Open Modal
        </Button>
      </Root>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader className={styles.modalHeader}>
          <h3 className={styles.title}>Modal Header</h3>
        </ModalHeader>
        <ModalContent>
          <div className={styles.modalScroll}>
            {Array.from(Array(10)).map(i => (
              <p key={i} className={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
        </ModalContent>
        <ModalFooter className={styles.modalFooter}>
          <ModalActions>
            <Button color={theme.colors.bland} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="filled" onClick={() => setOpen(false)}>
              Okay
            </Button>
          </ModalActions>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalExample;
