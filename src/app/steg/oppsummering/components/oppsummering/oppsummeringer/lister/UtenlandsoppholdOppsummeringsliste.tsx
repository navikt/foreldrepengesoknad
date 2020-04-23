import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { Utenlandsopphold } from '../../../../../../types/søknad/InformasjonOmUtenlandsopphold';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../../util/dates/dates';
import Oppsummeringsliste from 'app/steg/oppsummering/components/oppsummeringsliste/Oppsummeringsliste';

interface UtenlandsoppholdOppsummeringslisteProps {
    informasjonOmUtenlandsopphold: Utenlandsopphold[];
}

type Props = UtenlandsoppholdOppsummeringslisteProps;

const UtenlandsoppholdOppsummeringsliste: React.StatelessComponent<Props> = ({ informasjonOmUtenlandsopphold }) => {
    const intl = useIntl();

    return (
        <Oppsummeringsliste
            data={informasjonOmUtenlandsopphold.map(({ land, tidsperiode }) => ({
                venstrestiltTekst: getMessage(intl, 'oppsummering.utenlandsopphold.land', {
                    land: countries.getName(land, 'nb')
                }),
                høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                    fom: formatDate(tidsperiode.fom),
                    tom: formatDate(tidsperiode.tom)
                })
            }))}
            kompakt={true}
        />
    );
};
export default UtenlandsoppholdOppsummeringsliste;
