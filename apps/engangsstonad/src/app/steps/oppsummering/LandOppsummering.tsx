import React from 'react';
import { BostedUtland } from 'app/steps/utenlandsopphold/bostedUtlandListAndDialog/types';
import * as countries from 'i18n-iso-countries';

import './landOppsummering.less';
import { formatDate } from '@navikt/fp-common';
import { Label } from '@navikt/ds-react';

interface Props {
    utenlandsoppholdListe: BostedUtland[];
}

const LandOppsummering: React.FunctionComponent<Props> = ({ utenlandsoppholdListe }) => (
    <ul className="landOppsummering">
        {utenlandsoppholdListe.map((opphold: BostedUtland) => (
            <div key={`${opphold.landkode}${opphold.fom}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Label>{countries.getName(opphold.landkode, 'nb')}</Label>
                <Label>
                    {formatDate(opphold.fom)} - {formatDate(opphold.tom)}
                </Label>
            </div>
        ))}
    </ul>
);

export default LandOppsummering;
