import { FunctionComponent } from 'react';

import { BodyShort } from '@navikt/ds-react';

import { Periode, isUttaksperiode } from '@navikt/fp-common';

import { formatDate } from '../../../../utils';

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

const PeriodeListeContent: FunctionComponent<Props> = ({ periode, erFamiliehendelse }) => {
    return <div>{renderContent(periode, erFamiliehendelse)}</div>;
};

export default PeriodeListeContent;
