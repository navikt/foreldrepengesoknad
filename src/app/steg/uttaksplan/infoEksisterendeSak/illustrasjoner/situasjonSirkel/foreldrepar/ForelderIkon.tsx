import * as React from 'react';
import { ForeldreparForelder } from './foreldreparTypes';
import { FlexibleSvg } from 'common/components/customSvg/CustomSVG';

interface Props {
    forelder: ForeldreparForelder;
    width?: number;
}

const ForelderIkon: React.StatelessComponent<Props> = ({ forelder, width }) => {
    const svg = require(`./assets/${forelder}.svg`).default;
    const scale = width ? width / 31 : 1;
    return <FlexibleSvg className="forelderIkon" iconRef={svg} width={31 * scale} height={45 * scale} />;
};
export default ForelderIkon;
