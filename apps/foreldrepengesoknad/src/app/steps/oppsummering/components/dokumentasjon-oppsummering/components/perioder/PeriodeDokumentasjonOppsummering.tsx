import { getMorInnlagtVedlegg } from 'app/steps/manglende-vedlegg/util';
import { FunctionComponent } from 'react';
import DokumentasjonContainer from '../DokumentasjonContainer';
import { VedleggDataType } from 'app/types/VedleggDataType';
import PeriodeDokumentasjon from './PeriodeDokumentasjon';
import { Skjemanummer } from '@navikt/fp-constants';

interface Props {
    vedlegg: VedleggDataType;
}

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const aktivitetskravIntro = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET] || [];
    const aktivitetskravKval = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM] || [];
    const fedrekvoteMorForSykVedlegg = getMorInnlagtVedlegg(vedlegg);

    if (
        aktivitetskravIntro.length === 0 &&
        aktivitetskravKval.length === 0 &&
        fedrekvoteMorForSykVedlegg.length === 0
    ) {
        return null;
    }

    return (
        <>
            {aktivitetskravIntro.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={aktivitetskravIntro} />
                </DokumentasjonContainer>
            )}
            {aktivitetskravKval.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={aktivitetskravKval} />
                </DokumentasjonContainer>
            )}
            {fedrekvoteMorForSykVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={fedrekvoteMorForSykVedlegg} />
                </DokumentasjonContainer>
            )}
        </>
    );
};

export default PeriodeDokumentasjonOppsummering;
