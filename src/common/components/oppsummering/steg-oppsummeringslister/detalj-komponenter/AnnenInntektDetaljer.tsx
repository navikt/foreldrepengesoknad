import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from '../../../../../app/types/søknad/AnnenInntekt';
import * as React from 'react';
import JobbIUtlandetInntektsdetaljer from 'common/components/oppsummering/steg-oppsummeringslister/detalj-komponenter/JobbIUtlandetInntektsdetaljer';

interface AnnenInntektDetaljerProps {
    annenInntekt: AnnenInntekt;
}

const AnnenInntektDetaljer: React.StatelessComponent<AnnenInntektDetaljerProps> = ({ annenInntekt }) => {
    const { type } = annenInntekt;
    if (type === AnnenInntektType.JOBB_I_UTLANDET) {
        return <JobbIUtlandetInntektsdetaljer jobbIUtlandetInntekt={annenInntekt as JobbIUtlandetInntekt} />;
    }
    return null;
};

export default AnnenInntektDetaljer;
