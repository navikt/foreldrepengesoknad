import { getFedrekvoteMorForSykVedlegg, getOverføringsVedlegg } from 'app/steps/manglende-vedlegg/util';
import { FunctionComponent } from 'react';
import DokumentasjonContainer from '../DokumentasjonContainer';
import { VedleggDataType } from 'app/types/VedleggDataType';
import PeriodeDokumentasjon from './PeriodeDokumentasjon';
import { Skjemanummer } from '@navikt/fp-constants';

interface Props {
    vedlegg: VedleggDataType;
}

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const aktivitetskravArbUtdSyk = vedlegg[Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM] || [];
    const aktivitetskravIntro = vedlegg[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET] || [];
    const aktivitetskravKval = vedlegg[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM] || [];
    const overføringsVedlegg = getOverføringsVedlegg(vedlegg);
    const fedrekvoteMorForSykVedlegg = getFedrekvoteMorForSykVedlegg(vedlegg);

    if (
        aktivitetskravArbUtdSyk.length === 0 &&
        aktivitetskravIntro.length === 0 &&
        aktivitetskravKval.length === 0 &&
        overføringsVedlegg.length === 0 &&
        fedrekvoteMorForSykVedlegg.length === 0
    ) {
        return null;
    }

    return (
        <>
            {aktivitetskravArbUtdSyk.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={aktivitetskravArbUtdSyk} />
                </DokumentasjonContainer>
            )}
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
            {overføringsVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={overføringsVedlegg} />
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
