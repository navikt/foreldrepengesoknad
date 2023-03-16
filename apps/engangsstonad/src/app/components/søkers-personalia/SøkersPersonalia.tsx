import * as React from 'react';
const { Normaltekst, Undertittel } = require('nav-frontend-typografi');

import './søkersPersonalia.less';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import { Kjønn } from 'app/types/domain/Person';

const womanSvg = require('../../assets/svg/kvinne.svg').default;
const manSvg = require('../../assets/svg/mann.svg').default;

interface Props {
    navn: string;
    kjønn: Kjønn;
    personnummer: string;
}

const SøkersPersonalia: React.FunctionComponent<Props> = ({ navn, kjønn, personnummer }) => (
    <div className="søkersPersonalia">
        <CustomSVG iconRef={kjønn === 'K' ? womanSvg : manSvg} size={40} />
        <div className="søkersPersonalia__label">
            <Undertittel className="søkersPersonalia__name capitalizeName">{navn}</Undertittel>
            <Normaltekst className="søkersPersonalia__person">{personnummer}</Normaltekst>
        </div>
    </div>
);

export default SøkersPersonalia;
