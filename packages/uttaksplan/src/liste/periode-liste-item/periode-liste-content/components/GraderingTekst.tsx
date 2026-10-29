import { FormattedMessage } from 'react-intl';

import { BrukerRolleSak_fpoversikt, NavnPåForeldre } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

interface Props {
    arbeidstidprosent: number;
    erAnnenPartsPeriode: boolean;
    forelder: BrukerRolleSak_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
}

export const GraderingTekst = ({ arbeidstidprosent, erAnnenPartsPeriode, forelder, navnPåForeldre }: Props) => {
    const uttaksprosent = Math.round((100 - arbeidstidprosent) * 100) / 100;

    if (erAnnenPartsPeriode) {
        const navnPåForelder = forelder === 'MOR' ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
        return (
            <FormattedMessage
                id="uttaksplan.periodeListeContent.arbeid.annenForelder"
                values={{ navnPåForelder: capitalizeFirstLetter(navnPåForelder), arbeidstidprosent, uttaksprosent }}
            />
        );
    }

    return (
        <FormattedMessage id="uttaksplan.periodeListeContent.arbeid" values={{ arbeidstidprosent, uttaksprosent }} />
    );
};
