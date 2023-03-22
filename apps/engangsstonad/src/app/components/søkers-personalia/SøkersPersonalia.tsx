import * as React from 'react';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import { Kjønn } from 'app/types/domain/Person';

import './søkersPersonalia.less';
import { BodyShort, Heading } from '@navikt/ds-react';

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
            <Heading size="small" className="søkersPersonalia__name capitalizeName">{navn}</Heading>
            <BodyShort className="søkersPersonalia__person">{personnummer}</BodyShort>
        </div>
    </div>
);

export default SøkersPersonalia;
