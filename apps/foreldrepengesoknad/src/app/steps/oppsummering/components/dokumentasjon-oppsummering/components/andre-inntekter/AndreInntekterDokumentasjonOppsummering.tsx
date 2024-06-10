import { FunctionComponent } from 'react';

import { InnsendingsType, Skjemanummer } from '@navikt/fp-constants';

import { getAndreInntekterVedlegg } from 'app/steps/manglende-vedlegg/util';
import { VedleggDataType } from 'app/types/VedleggDataType';

import DokumentasjonContainer from '../DokumentasjonContainer';
import AndreInntekterDokumentasjon from './AndreInntekterDokumentasjon';

interface Props {
    vedlegg: VedleggDataType;
    setManglerDokumentasjon: (manglerDokumentajson: boolean) => void;
}

const AndreInntekterDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg, setManglerDokumentasjon }) => {
    const andreInntekerVedlegg = getAndreInntekterVedlegg(vedlegg);

    const militærVedlegg = andreInntekerVedlegg.filter(
        (v) => v.skjemanummer === Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE,
    );
    const etterlønnVedlegg = andreInntekerVedlegg.filter(
        (v) => v.skjemanummer === Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG,
    );

    if (andreInntekerVedlegg.length === 0) {
        return null;
    }

    if (andreInntekerVedlegg.find((v) => v.innsendingsType === InnsendingsType.SEND_SENERE)) {
        setManglerDokumentasjon(true);
    }

    return (
        <>
            {militærVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <AndreInntekterDokumentasjon vedlegg={militærVedlegg} />
                </DokumentasjonContainer>
            )}
            {etterlønnVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <AndreInntekterDokumentasjon vedlegg={etterlønnVedlegg} />
                </DokumentasjonContainer>
            )}
        </>
    );
};

export default AndreInntekterDokumentasjonOppsummering;
