import { ForeldreparForelder } from '@navikt/fp-common';

import { getForeldreparIkon } from './foreldreparUtils';

interface Props {
    forelder: ForeldreparForelder;
    width?: number;
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const ForelderIkon: React.FunctionComponent<Props> = ({ forelder, width }) => {
    const scale = width ? width / 31 : 1;
    const scaledWidth = 31 * scale;
    const scaledHeight = 45 * scale;

    return getForeldreparIkon(forelder, 'forelderIkon', scaledWidth, scaledHeight);
};

// eslint-disable-next-line import/no-default-export
export default ForelderIkon;
