import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import { Utenlandsopphold } from '../../../../../app/types/søknad/InformasjonOmUtenlandsopphold';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummeringsliste/Oppsummeringsliste';

interface UtenlandsoppholdOppsummeringslisteProps {
    informasjonOmUtenlandsopphold: Utenlandsopphold[];
}

type Props = UtenlandsoppholdOppsummeringslisteProps & InjectedIntlProps;

const UtenlandsoppholdOppsummeringsliste: React.StatelessComponent<Props> = ({
    informasjonOmUtenlandsopphold,
    intl
}: Props) => {
    return (
        <Oppsummeringsliste
            data={informasjonOmUtenlandsopphold.map(({ land, tidsperiode }) => ({
                venstrestiltTekst: `bo i ${countries.getName(land, 'nb')}`,
                høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                    fom: formatDate(tidsperiode.fom),
                    tom: formatDate(tidsperiode.tom)
                })
            }))}
            kompakt={true}
        />
    );
};
export default injectIntl(UtenlandsoppholdOppsummeringsliste);
