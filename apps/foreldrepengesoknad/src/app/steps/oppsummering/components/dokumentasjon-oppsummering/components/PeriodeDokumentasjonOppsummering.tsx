import { Heading } from '@navikt/ds-react';
import { Attachment } from '@navikt/fp-types';
import { FunctionComponent } from 'react';

interface Props {
    dokumentasjon: Attachment[];
}

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ dokumentasjon }) => {
    return (
        <>
            <Heading size="xsmall">Dokumentasjon for perioder</Heading>
            {dokumentasjon.map((d) => d.id)}
        </>
    );
};

export default PeriodeDokumentasjonOppsummering;
