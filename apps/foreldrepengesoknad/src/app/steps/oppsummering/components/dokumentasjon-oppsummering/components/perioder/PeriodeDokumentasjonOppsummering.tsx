import {
    getBarnInnlagtVedlegg,
    getFarForSykVedlegg,
    getFarInnlagtVedlegg,
    getMorForSykVedlegg,
    getMorInnlagtVedlegg,
    getMorIntroprogramVedlegg,
    getMorJobberOgStudererVedlegg,
    getMorJobberVedlegg,
    getMorKvalprogramVedlegg,
    getMorStudererVedlegg,
} from 'app/steps/manglende-vedlegg/util';
import { FunctionComponent } from 'react';
import DokumentasjonContainer from '../DokumentasjonContainer';
import { VedleggDataType } from 'app/types/VedleggDataType';
import PeriodeDokumentasjon from './PeriodeDokumentasjon';

interface Props {
    vedlegg: VedleggDataType;
}

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const aktivitetskravIntro = getMorIntroprogramVedlegg(vedlegg);
    const aktivitetskravKval = getMorKvalprogramVedlegg(vedlegg);
    const morInnlagtVedlegg = getMorInnlagtVedlegg(vedlegg);
    const farInnlagtVedlegg = getFarInnlagtVedlegg(vedlegg);
    const barnInnlagtVedlegg = getBarnInnlagtVedlegg(vedlegg);
    const morForSykVedlegg = getMorForSykVedlegg(vedlegg);
    const farForSykVedlegg = getFarForSykVedlegg(vedlegg);
    const morUtdanning = getMorStudererVedlegg(vedlegg);
    const morArbeid = getMorJobberVedlegg(vedlegg);
    const morArbeidOgUtdanning = getMorJobberOgStudererVedlegg(vedlegg);

    const ingenVedlegg = () => {
        return (
            aktivitetskravIntro.length === 0 &&
            aktivitetskravKval.length === 0 &&
            morInnlagtVedlegg.length === 0 &&
            farInnlagtVedlegg.length === 0 &&
            barnInnlagtVedlegg.length === 0 &&
            morForSykVedlegg.length === 0 &&
            farForSykVedlegg.length === 0 &&
            morUtdanning.length === 0 &&
            morArbeid.length === 0 &&
            morArbeidOgUtdanning.length === 0
        );
    };

    if (ingenVedlegg()) {
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
            {morInnlagtVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={morInnlagtVedlegg} />
                </DokumentasjonContainer>
            )}
            {farInnlagtVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={farInnlagtVedlegg} />
                </DokumentasjonContainer>
            )}
            {barnInnlagtVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={barnInnlagtVedlegg} />
                </DokumentasjonContainer>
            )}
            {morForSykVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={morForSykVedlegg} />
                </DokumentasjonContainer>
            )}
            {farForSykVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={farForSykVedlegg} />
                </DokumentasjonContainer>
            )}
            {morUtdanning.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={morUtdanning} />
                </DokumentasjonContainer>
            )}
            {morArbeid.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={morArbeid} />
                </DokumentasjonContainer>
            )}
            {morArbeidOgUtdanning.length > 0 && (
                <DokumentasjonContainer>
                    <PeriodeDokumentasjon vedlegg={morArbeidOgUtdanning} />
                </DokumentasjonContainer>
            )}
        </>
    );
};

export default PeriodeDokumentasjonOppsummering;
