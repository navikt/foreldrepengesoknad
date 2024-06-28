import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyShort } from '@navikt/ds-react';

import { Periode, Uttaksperiode, isUttaksperiode } from '@navikt/fp-common';
import { formatDate, formatDateExtended } from '@navikt/fp-utils';

interface Props {
    periode: Periode;
    erFamiliehendelse: boolean;
}

const renderContent = (periode: Periode, erFamiliehendelse: boolean) => {
    if (erFamiliehendelse) {
        return <BodyShort>Noe innhold her</BodyShort>;
    }

    if (isUttaksperiode(periode)) {
        return `${periode.konto} - ${formatDate(periode.tidsperiode.fom)} - ${formatDate(periode.tidsperiode.tom)}`;
    }

    return `${periode.type} - ${formatDate(periode.tidsperiode.fom)} - ${formatDate(periode.tidsperiode.tom)}`;
};

const renderPeriodeUtenSamtidigUttak = (periode: Uttaksperiode) => {
    return (
        <>
            <div style={{ margin: '0 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CalendarIcon width={24} height={24} />
                <BodyShort weight="semibold">
                    {formatDateExtended(periode.tidsperiode.fom)} - {formatDateExtended(periode.tidsperiode.tom)}
                </BodyShort>
            </div>
            <div style={{ margin: '1rem' }}>
                <BodyShort>Foreldrepenger fra Petters kvote</BodyShort>
            </div>
        </>
    );
};

const PeriodeListeContent: FunctionComponent<Props> = ({ periode, erFamiliehendelse }) => {
    const erUttakUtenSamtidigUttak = isUttaksperiode(periode) && periode.ønskerSamtidigUttak !== true;

    return (
        <div>
            {erUttakUtenSamtidigUttak
                ? renderPeriodeUtenSamtidigUttak(periode)
                : renderContent(periode, erFamiliehendelse)}
        </div>
    );
};

export default PeriodeListeContent;
