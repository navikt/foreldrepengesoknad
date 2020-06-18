import * as React from 'react';
import { MorsAktivitet } from '../../../../../../types/uttaksplan/periodetyper';
import { useIntl } from 'react-intl';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import OppsummeringAvDokumentasjon from 'app/steg/oppsummering/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import getMessage from 'common/util/i18nUtils';

interface MorsAktivitetDetaljerProps {
    morsAktivitet: MorsAktivitet;
    dokumentasjonAvMorsAktivitet: Attachment[];
    visOppsummeringAvDokumentasjon: boolean;
}

type Props = MorsAktivitetDetaljerProps;

const MorsAktivitetDetaljer: React.StatelessComponent<Props> = ({
    morsAktivitet,
    dokumentasjonAvMorsAktivitet,
    visOppsummeringAvDokumentasjon,
}) => {
    const intl = useIntl();

    return (
        <>
            <Feltoppsummering feltnavn={getMessage(intl, 'oppsummering.morsAktivitet')} verdi={morsAktivitet} />
            {visOppsummeringAvDokumentasjon && (
                <OppsummeringAvDokumentasjon
                    ledetekst={getMessage(intl, 'oppsummering.morsAktivitet.dokumentasjon')}
                    vedlegg={dokumentasjonAvMorsAktivitet}
                />
            )}
        </>
    );
};

export default MorsAktivitetDetaljer;
