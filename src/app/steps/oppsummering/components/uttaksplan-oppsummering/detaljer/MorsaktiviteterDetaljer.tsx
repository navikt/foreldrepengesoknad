import * as React from 'react';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { Attachment } from 'app/types/Attachment';
import { useIntl } from 'react-intl';
import OppsummeringAvDokumentasjon from '../oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import Feltoppsummering from '../feltoppsummering/Feltoppsummering';
import { intlUtils } from '@navikt/fp-common';

interface MorsAktivitetDetaljerProps {
    morsAktivitet: MorsAktivitet;
    dokumentasjonAvMorsAktivitet: Attachment[];
    visOppsummeringAvDokumentasjon: boolean;
}

type Props = MorsAktivitetDetaljerProps;

const MorsAktivitetDetaljer: React.FunctionComponent<Props> = ({
    morsAktivitet,
    dokumentasjonAvMorsAktivitet,
    visOppsummeringAvDokumentasjon,
}) => {
    const intl = useIntl();

    return (
        <>
            <Feltoppsummering feltnavn={intlUtils(intl, 'oppsummering.morsAktivitet')} verdi={morsAktivitet} />
            {visOppsummeringAvDokumentasjon && (
                <OppsummeringAvDokumentasjon
                    ledetekst={intlUtils(intl, 'oppsummering.morsAktivitet.dokumentasjon')}
                    vedlegg={dokumentasjonAvMorsAktivitet}
                />
            )}
        </>
    );
};

export default MorsAktivitetDetaljer;
