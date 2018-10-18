import * as React from 'react';
import { MorsAktivitet } from '../../../../../app/types/uttaksplan/periodetyper';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import OppsummeringAvDokumentasjon from 'common/components/oppsummering-av-dokumentasjon/OppsummeringAvDokumentasjon';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';

interface MorsAktivitetDetaljerProps {
    morsAktivitet: MorsAktivitet;
    dokumentasjonAvMorsAktivitet: Attachment[];
}

type Props = MorsAktivitetDetaljerProps & InjectedIntlProps;

const MorsAktivitetDetaljer: React.StatelessComponent<Props> = ({
    morsAktivitet,
    dokumentasjonAvMorsAktivitet,
    intl
}) => (
    <>
        <Feltoppsummering feltnavn="Mors aktivitet i perioden" verdi={morsAktivitet} />
        <OppsummeringAvDokumentasjon vedlegg={dokumentasjonAvMorsAktivitet} />
    </>
);

export default injectIntl(MorsAktivitetDetaljer);
