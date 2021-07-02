import { ForeldreparForelder } from 'app/types/ForeldreparSituasjonTypes';
import React from 'react';
import FlexibleSvg from '../flexible-svg/FlexibleSVG';

interface Props {
    forelder: ForeldreparForelder;
    width?: number;
}

const ForelderIkon: React.FunctionComponent<Props> = ({ forelder, width }) => {
    const svg = require(`./assets/${forelder}.svg`).default;
    const scale = width ? width / 31 : 1;
    return <FlexibleSvg className="forelderIkon" iconRef={svg} width={31 * scale} height={45 * scale} />;
};
export default ForelderIkon;
