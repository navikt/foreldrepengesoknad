import { Radio } from '@navikt/ds-react';

import styles from './greenRadio.module.css';

const GreenRadio: React.FunctionComponent<React.ComponentProps<typeof Radio>> = (props) => {
    return (
        <Radio {...props} className={styles.greenPanel}>
            {props.children}
        </Radio>
    );
};
export default GreenRadio;
