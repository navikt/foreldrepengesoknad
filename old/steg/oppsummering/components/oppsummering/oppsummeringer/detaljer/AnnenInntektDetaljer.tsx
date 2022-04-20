import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../../../../types/søknad/AnnenInntekt';
import * as React from 'react';
import JobbIUtlandetInntektsdetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/JobbIUtlandetInntektsdetaljer';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface AnnenInntektDetaljerProps {
    annenInntekt: AnnenInntekt;
}

const AnnenInntektDetaljer: React.FunctionComponent<AnnenInntektDetaljerProps> = ({ annenInntekt }) => {
    const { type, vedlegg } = annenInntekt;
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        return <JobbIUtlandetInntektsdetaljer jobbIUtlandetInntekt={annenInntekt as JobbIUtlandetInntekt} />;
    }
    if (
        type === AnnenInntektType.VENTELØNN ||
        type === AnnenInntektType.SLUTTPAKKE ||
        type === AnnenInntektType.MILITÆRTJENESTE
    ) {
        return <OppsummeringAvDokumentasjon vedlegg={vedlegg || []} />;
    }
    return null;
};

export default AnnenInntektDetaljer;
