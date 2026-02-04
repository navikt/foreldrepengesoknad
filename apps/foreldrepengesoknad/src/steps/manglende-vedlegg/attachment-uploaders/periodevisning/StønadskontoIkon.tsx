import { ComponentProps } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { Box } from '@navikt/ds-react';

import { NavnPåForeldre, Situasjon } from '@navikt/fp-common';
import { BrukerRolleSak_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import { UttaksplanIkon, UttaksplanIkonKeys } from './UttaksplanIkon';

interface Props {
    konto: KontoTypeUttak | undefined;
    forelder?: BrukerRolleSak_fpoversikt;
    gradert?: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    situasjon?: Situasjon;
    erAleneOmOmsorg?: boolean;
    harMidlertidigOmsorg?: boolean;
}

export const StønadskontoIkon = ({
    konto,
    forelder,
    gradert,
    navnPåForeldre,
    harMidlertidigOmsorg,
    erFarEllerMedmor,
    erAleneOmOmsorg,
}: Props) => {
    const intl = useIntl();
    return (
        <Box
            background={getUttaksperiodeFarge(konto, forelder, erFarEllerMedmor, harMidlertidigOmsorg)}
            borderColor={gradert ? 'accent-strong' : undefined}
            borderRadius="full"
            padding="space-4"
            width="fit-content"
        >
            <UttaksplanIkon
                ikon={UttaksplanIkonKeys.uttak}
                title={getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg)}
            />
        </Box>
    );
};

const getKontoFarge = (
    konto: KontoTypeUttak | undefined,
    erFarEllerMedmor: boolean,
): ComponentProps<typeof Box>['background'] => {
    switch (konto) {
        case 'FEDREKVOTE':
        case 'AKTIVITETSFRI_KVOTE':
            return erFarEllerMedmor ? 'success-strong' : 'success-moderate';
        case 'FORELDREPENGER_FØR_FØDSEL':
        case 'MØDREKVOTE':
            return erFarEllerMedmor ? 'accent-moderate' : 'accent-strong';
        case 'FORELDREPENGER':
            return erFarEllerMedmor ? 'success-strong' : 'accent-strong';
        case 'FELLESPERIODE':
            return erFarEllerMedmor ? 'brand-beige-strong' : 'brand-beige-moderate';
        default:
            return undefined;
    }
};

const getUttaksperiodeFarge = (
    konto: KontoTypeUttak | undefined,
    forelder: BrukerRolleSak_fpoversikt | undefined,
    erFarEllerMedmor: boolean,
    harMidlertidigOmsorg?: boolean,
): ComponentProps<typeof Box>['background'] => {
    if (harMidlertidigOmsorg) {
        return erFarEllerMedmor ? 'success-strong' : 'accent-strong';
    }

    if (forelder === undefined) {
        return getKontoFarge(konto, erFarEllerMedmor);
    }
    return getForelderFarge(forelder, erFarEllerMedmor);
};

const getForelderFarge = (
    forelder: BrukerRolleSak_fpoversikt,
    erFarEllerMedmor: boolean,
): ComponentProps<typeof Box>['background'] => {
    if (forelder === 'MOR') {
        return erFarEllerMedmor ? 'accent-moderate' : 'accent-strong';
    }
    return erFarEllerMedmor ? 'success-strong' : 'success-moderate';
};

const getStønadskontoNavn = (
    intl: IntlShape,
    konto: KontoTypeUttak | undefined,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    erAleneOmOmsorg?: boolean,
) => {
    if ((erFarEllerMedmor && konto === 'FEDREKVOTE') || (!erFarEllerMedmor && konto === 'MØDREKVOTE')) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.dinKvote' });
    }
    let navn;

    switch (konto) {
        case 'MØDREKVOTE':
            navn = navnPåForeldre.mor;
            break;
        case 'FEDREKVOTE':
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (konto === 'AKTIVITETSFRI_KVOTE') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        if (konto === 'FORELDREPENGER') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
        }
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};
