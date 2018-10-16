import * as React from 'react';
import { JobbIUtlandetInntekt } from '../../../../../app/types/søknad/AnnenInntekt';

interface JobbIUtlandetInntektsdetaljerProps {
    jobbIUtlandetInntekt: JobbIUtlandetInntekt;
}

const JobbIUtlandetInntektsdetaljer: React.StatelessComponent<JobbIUtlandetInntektsdetaljerProps> = ({
    jobbIUtlandetInntekt
}) => {
    const { arbeidsgiverNavn, land, erNærVennEllerFamilieMedArbeidsgiver } = jobbIUtlandetInntekt;
    return (
        <>
            <p>Arbeidsgivers navn: {arbeidsgiverNavn}</p>
            <p>Arbeidsgivers land: {land}</p>
            <p>
                Jeg er nær venn av eller i familie med denne arbeidsgiveren:
                {erNærVennEllerFamilieMedArbeidsgiver ? 'Ja' : 'Nei'}
            </p>
        </>
    );
};

export default JobbIUtlandetInntektsdetaljer;
