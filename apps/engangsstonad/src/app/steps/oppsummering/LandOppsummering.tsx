import React from 'react';
import { BostedUtland } from 'app/steps/utenlandsopphold/bostedUtlandListAndDialog/types';
import { Element } from 'nav-frontend-typografi';
import * as countries from 'i18n-iso-countries';

import './landOppsummering.less';
import { formatDate } from '@navikt/fp-common';

interface Props {
    utenlandsoppholdListe: BostedUtland[];
}

const LandOppsummering: React.FunctionComponent<Props> = ({ utenlandsoppholdListe }) => (
    <ul className="landOppsummering">
        {utenlandsoppholdListe.map((opphold: BostedUtland) => (
            <div key={`${opphold.landkode}${opphold.fom}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Element>{countries.getName(opphold.landkode, 'nb')}</Element>
                <Element>
                    {formatDate(opphold.fom)} - {formatDate(opphold.tom)}
                </Element>
            </div>
        ))}
    </ul>
);

export default LandOppsummering;
