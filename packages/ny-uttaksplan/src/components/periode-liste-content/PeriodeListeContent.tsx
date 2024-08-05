import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyShort } from '@navikt/ds-react';

import {
    AnnenForelder,
    NavnPåForeldre,
    Oppholdsperiode,
    Periode,
    Uttaksperiode,
    isOppholdsperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { formatDateExtended } from '@navikt/fp-utils';

interface Props {
    periode: Periode;
    erFamiliehendelse: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
}

// const renderPeriodeMedSamtidigUttak = (periode: Periode, erFamiliehendelse: boolean) => {
//     if (erFamiliehendelse) {
//         return <BodyShort>Noe innhold her</BodyShort>;
//     }

//     if (isUttaksperiode(periode)) {
//         return `${periode.konto} - ${formatDate(periode.tidsperiode.fom)} - ${formatDate(periode.tidsperiode.tom)}`;
//     }

//     return `${periode.type} - ${formatDate(periode.tidsperiode.fom)} - ${formatDate(periode.tidsperiode.tom)}`;
// };

const renderUttaksperiode = (periode: Uttaksperiode) => {
    return (
        <>
            <div style={{ margin: '0 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CalendarIcon width={24} height={24} />
                <BodyShort weight="semibold">
                    {formatDateExtended(periode.tidsperiode.fom)} - {formatDateExtended(periode.tidsperiode.tom)}
                </BodyShort>
            </div>
            <div style={{ margin: '1rem' }}>
                <BodyShort>Din periode</BodyShort>
            </div>
        </>
    );
};

const renderOppholdsperiode = (
    periode: Oppholdsperiode,
    _navnPåForeldre: NavnPåForeldre,
    _erFarEllerMedmor: boolean,
) => {
    return (
        <>
            <div style={{ margin: '0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CalendarIcon width={24} height={24} />
                <BodyShort weight="semibold">
                    {formatDateExtended(periode.tidsperiode.fom)} - {formatDateExtended(periode.tidsperiode.tom)}
                </BodyShort>
            </div>
            <div style={{ margin: '1rem' }}>
                <BodyShort>Opphold</BodyShort>
            </div>
        </>
    );
};

const renderPeriode = (periode: Periode, navnPåForeldre: NavnPåForeldre, erFarEllerMedmor: boolean) => {
    if (isUttaksperiode(periode)) {
        renderUttaksperiode(periode);
    }

    if (isOppholdsperiode(periode)) {
        return renderOppholdsperiode(periode, navnPåForeldre, erFarEllerMedmor);
    }

    return (
        <>
            <div style={{ margin: '0 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CalendarIcon width={24} height={24} />
                <BodyShort weight="semibold">
                    {formatDateExtended(periode.tidsperiode.fom)} - {formatDateExtended(periode.tidsperiode.tom)}
                </BodyShort>
            </div>
            <div style={{ margin: '1rem' }}>
                <BodyShort>Opphold</BodyShort>
            </div>
        </>
    );
};

const PeriodeListeContent: FunctionComponent<Props> = ({ periode, navnPåForeldre, erFarEllerMedmor }) => {
    return <div>{renderPeriode(periode, navnPåForeldre, erFarEllerMedmor)}</div>;
};

export default PeriodeListeContent;
