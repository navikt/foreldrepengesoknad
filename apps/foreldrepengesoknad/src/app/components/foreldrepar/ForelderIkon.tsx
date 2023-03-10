import { ForeldreparForelder } from 'app/types/ForeldreparSituasjonTypes';
import React from 'react';
import { getForeldreparIkon } from './foreldreparUtils';

interface Props {
    forelder: ForeldreparForelder;
    width?: number;
}

const ForelderIkon: React.FunctionComponent<Props> = ({ forelder, width }) => {
    const scale = width ? width / 31 : 1;
    const scaledWidth = 31 * scale;
    const scaledHeight = 45 * scale;

    return getForeldreparIkon(forelder, 'forelderIkon', scaledWidth, scaledHeight);
};

export default ForelderIkon;
