import { getAndreInntekterVedlegg } from 'app/steps/manglende-vedlegg/util';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';
import AndreInntekterDokumentasjon from './AndreInntekterDokumentasjon';
import DokumentasjonContainer from '../DokumentasjonContainer';

interface Props {
    vedlegg: VedleggDataType;
}

const AndreInntekterDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const andreInntekerVedlegg = getAndreInntekterVedlegg(vedlegg);

    if (andreInntekerVedlegg.length === 0) {
        return null;
    }

    return (
        <>
            <DokumentasjonContainer>
                <AndreInntekterDokumentasjon vedlegg={andreInntekerVedlegg} />
            </DokumentasjonContainer>
        </>
    );
};

export default AndreInntekterDokumentasjonOppsummering;
