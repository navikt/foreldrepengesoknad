import { bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { Utenlandsopphold } from 'app/context/types/InformasjonOmUtenlandsopphold';
import countries from 'i18n-iso-countries';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import './utenlandsoppholdOppsummeringListe.less';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    utenlandsopphold: Utenlandsopphold[];
    tidligereOpphold: boolean;
}

const UtenlandsoppholdOppsummeringListe: FunctionComponent<Props> = ({ utenlandsopphold, tidligereOpphold }) => {
    const intl = useIntl();
    const bem = bemUtils('utenlandsoppholdOppsummeringListe');

    return (
        <ul className={bem.block}>
            {utenlandsopphold.map((opphold) => {
                return (
                    <li
                        className={bem.element('listElement')}
                        key={`${opphold.land}${opphold.tidsperiode.fom}${opphold.tidsperiode.tom}`}
                    >
                        <BodyShort>
                            {tidligereOpphold
                                ? intlUtils(intl, 'oppsummering.utenlandsopphold.harBoddINorge.utenlands', {
                                      land: countries.getName(opphold.land, 'nb'),
                                  })
                                : intlUtils(intl, 'oppsummering.utenlandsopphold.skalBoINorge.utenlands', {
                                      land: countries.getName(opphold.land, 'nb'),
                                  })}
                        </BodyShort>
                        <BodyShort>
                            {formatDate(opphold.tidsperiode.fom)} - {formatDate(opphold.tidsperiode.tom)}
                        </BodyShort>
                    </li>
                );
            })}
        </ul>
    );
};

export default UtenlandsoppholdOppsummeringListe;
