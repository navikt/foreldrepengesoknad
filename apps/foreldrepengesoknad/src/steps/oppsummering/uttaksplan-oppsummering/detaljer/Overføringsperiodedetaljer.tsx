import { IntlShape, useIntl } from 'react-intl';

import { KontoTypeUttak, NavnPåForeldre, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    periode: UttakPeriode_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
}

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: KontoTypeUttak | undefined, intl: IntlShape) => {
    if (konto === 'FEDREKVOTE') {
        return navnPåForeldre.farMedmor;
    } else if (konto === 'MØDREKVOTE') {
        return navnPåForeldre.mor;
    }
    return intl.formatMessage({ id: 'annen.forelder' });
};

export const Overføringsperiodedetaljer = ({ periode, navnPåForeldre }: Props) => {
    const intl = useIntl();
    const navnAnnenForelder = getNavnPåAnnenForelder(navnPåForeldre, periode.kontoType, intl);
    return (
        <Feltoppsummering
            feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
            verdi={getÅrsakTekst(intl, periode, navnAnnenForelder)}
        />
    );
};

const getÅrsakTekst = (intl: IntlShape, periode: UttakPeriode_fpoversikt, navnAnnenForelder: string) => {
    const { overføringÅrsak } = periode;

    if (overføringÅrsak === 'ALENEOMSORG') {
        return intl.formatMessage({ id: 'uttaksplan.overføringsårsaktype.ALENEOMSORG' }, { navnAnnenForelder });
    }
    if (overføringÅrsak === 'IKKE_RETT_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: 'uttaksplan.overføringsårsaktype.IKKE_RETT_ANNEN_FORELDER' },
            { navnAnnenForelder },
        );
    }
    if (overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: 'uttaksplan.overføringsårsaktype.INSTITUSJONSOPPHOLD_ANNEN_FORELDER' },
            { navnAnnenForelder },
        );
    }
    if (overføringÅrsak === 'SYKDOM_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: 'uttaksplan.overføringsårsaktype.SYKDOM_ANNEN_FORELDER' },
            { navnAnnenForelder },
        );
    }

    return '';
};
