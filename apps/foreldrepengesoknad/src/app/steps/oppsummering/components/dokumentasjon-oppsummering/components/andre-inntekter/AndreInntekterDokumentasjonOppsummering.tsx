import { getAndreInntekterVedlegg } from 'app/steps/manglende-vedlegg/util';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';
import AndreInntekterDokumentasjon from './AndreInntekterDokumentasjon';
import DokumentasjonContainer from '../DokumentasjonContainer';
import { Skjemanummer } from '@navikt/fp-constants';

interface Props {
    vedlegg: VedleggDataType;
}

const AndreInntekterDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
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
