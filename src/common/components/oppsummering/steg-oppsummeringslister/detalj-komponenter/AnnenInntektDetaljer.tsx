import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../../../app/types/søknad/AnnenInntekt';
import * as React from 'react';
import JobbIUtlandetInntektsdetaljer from 'common/components/oppsummering/steg-oppsummeringslister/detalj-komponenter/JobbIUtlandetInntektsdetaljer';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';

interface AnnenInntektDetaljerProps {
    annenInntekt: AnnenInntekt;
}

const AnnenInntektDetaljer: React.StatelessComponent<AnnenInntektDetaljerProps> = ({ annenInntekt }) => {
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
