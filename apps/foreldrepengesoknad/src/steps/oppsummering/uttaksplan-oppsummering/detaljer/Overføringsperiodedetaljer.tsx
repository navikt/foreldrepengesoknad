import { IntlShape, useIntl } from 'react-intl';

import { KontoTypeUttak, NavnPåForeldre, UttakDto } from '@navikt/fp-types';

import { Feltoppsummering } from './Feltoppsummering';

interface Props {
    part: UttakDto;
    navnPåForeldre: NavnPåForeldre;
}

const getNavnPåAnnenForelder = (navnPåForeldre: NavnPåForeldre, konto: KontoTypeUttak | undefined, intl: IntlShape) => {
    if (konto === 'FEDREKVOTE') {
        return navnPåForeldre.farMedmor;
    }
    if (konto === 'MØDREKVOTE') {
        return navnPåForeldre.mor;
    }
    return intl.formatMessage({ id: 'annen.forelder' });
};

export const Overføringsperiodedetaljer = ({ part, navnPåForeldre }: Props) => {
    const intl = useIntl();
    const navnAnnenForelder = getNavnPåAnnenForelder(navnPåForeldre, part.kontoType, intl);
    return (
        <Feltoppsummering
            feltnavn={intl.formatMessage({ id: 'oppsummering.uttak.årsak' })}
            verdi={getÅrsakTekst(intl, part, navnAnnenForelder)}
        />
    );
};

const getÅrsakTekst = (intl: IntlShape, part: UttakDto, navnAnnenForelder: string) => {
    const { overføringÅrsak } = part;

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
