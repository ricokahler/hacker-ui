import React, { useState } from 'react';
import { List, ListItem, Button } from 'hacker-ui';
import {
  createStyles,
  PropsFromStyles,
  readableColor,
  transparentize,
} from 'react-style-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles(({ css, theme }) => ({
  root: css``,
  list: css`
    background-color: ${theme.surface};
    box-shadow: ${theme.shadows.standard};
    width: ${theme.block(6)};
    margin: ${theme.gap(1)} auto;
  `,
  listItem: css`
    display: flex;
    align-items: center;
    padding: ${theme.space(0.75)};
    & > *:not(:last-child) {
      margin-right: ${theme.space(1)};
    }
  `,
  img: css`
    width: ${theme.block(0.75)};
    height: ${theme.block(0.75)};
    object-fit: contain;
    border-radius: 5px;
  `,
  info: css`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  `,
  title: css`
    ${theme.h6};
  `,
  subtitle: css`
    ${theme.caption};
  `,
  buttonSection: css`
    min-width: ${theme.block(1)};
    min-height: ${theme.block(0.75)};
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  buttons: css`
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    & > *:not(:last-child) {
      margin-right: ${theme.space(0.5)};
    }
  `,
  quantityCount: css`
    ${theme.body1};
    flex: 1 1 auto;
    text-align: center;
  `,
  subtotalSection: css`
    min-width: ${theme.block(1)};
    min-height: ${theme.block(0.75)};
    margin-right: ${theme.space(1)};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `,
  subtotal: css`
    ${theme.body1};
    font-weight: bold;
    color: ${readableColor(theme.surface)};
    margin-bottom: ${theme.space(0.5)};
  `,
  subLabel: css`
    ${theme.caption};
    color: ${transparentize(readableColor(theme.surface), 0.2)};
    text-align: center;
  `,
}));

interface Props extends PropsFromStyles<typeof useStyles> {}

interface Product {
  id: string;
  imgUrl: string;
  title: string;
  price: number;
}

const products: Product[] = [
  {
    id: '1',
    imgUrl: 'https://i.picsum.photos/id/91/100/100.jpg',
    price: 19999,
    title: 'Outfit Warm Coat',
  },
  {
    id: '2',
    imgUrl: 'https://i.picsum.photos/id/531/100/100.jpg',
    price: 15000,
    title: 'Lorem Ipsum Coat',
  },
  {
    id: '3',
    imgUrl: 'https://i.picsum.photos/id/7/100/100.jpg',
    price: 15000,
    title: 'Ipsum Dol Accessories',
  },
];

function ComplexListExample(props: Props) {
  const { Root, styles } = useStyles(props);
  const [quantities, setQuantities] = useState({} as { [id: string]: number });

  return (
    <Root>
      <List className={styles.list}>
        {products.map(({ id, imgUrl, title, price }) => {
          const quantity = quantities[id] ?? 0;

          const handleDec = () => {
            setQuantities((quantities) => ({
              ...quantities,
              [id]: Math.max(0, quantity - 1),
            }));
          };
          const handleInc = () => {
            setQuantities((quantities) => ({
              ...quantities,
              [id]: quantity + 1,
            }));
          };

          return (
            <ListItem className={styles.listItem}>
              <img className={styles.img} src={imgUrl} alt={title} />
              <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.subtitle}>
                  ${(price / 100).toLocaleString()}
                </p>
              </div>
              <div className={styles.buttonSection}>
                <div className={styles.buttons}>
                  <Button shape="icon" size="small" onClick={handleDec}>
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <div className={styles.quantityCount}>{quantity}</div>
                  <Button shape="icon" size="small" onClick={handleInc}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
                <div className={styles.subLabel}>Quantity</div>
              </div>
              <div className={styles.subtotalSection}>
                <div className={styles.subtotal}>
                  ${((quantity * price) / 100).toLocaleString()}
                </div>
                <div className={styles.subLabel}>Subtotal</div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </Root>
  );
}

export default ComplexListExample;
