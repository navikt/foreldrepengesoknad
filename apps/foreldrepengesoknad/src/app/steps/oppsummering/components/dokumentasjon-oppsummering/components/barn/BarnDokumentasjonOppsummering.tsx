import {
    getAleneOmOmsorgVedlegg,
    getOmsorgsovertakelseVedlegg,
    getTerminbekreftelseVedlegg,
} from 'app/steps/manglende-vedlegg/util';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';
import DokumentasjonContainer from '../DokumentasjonContainer';
import BarnDokumentasjon from './BarnDokumentasjon';

interface Props {
    vedlegg: VedleggDataType;
}

const BarnDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const omsorgsovertakelseVedlegg = getOmsorgsovertakelseVedlegg(vedlegg);
    const aleneOmOmsorgVedlegg = getAleneOmOmsorgVedlegg(vedlegg);
    const terminbekreftelseVedlegg = getTerminbekreftelseVedlegg(vedlegg);

    if (
        omsorgsovertakelseVedlegg.length === 0 &&
        aleneOmOmsorgVedlegg.length === 0 &&
        terminbekreftelseVedlegg.length === 0
    ) {
        return null;
    }

    return (
        <>
            {omsorgsovertakelseVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <BarnDokumentasjon vedlegg={omsorgsovertakelseVedlegg} />
                </DokumentasjonContainer>
            )}
            {aleneOmOmsorgVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <BarnDokumentasjon vedlegg={aleneOmOmsorgVedlegg} />
                </DokumentasjonContainer>
            )}
            {terminbekreftelseVedlegg.length > 0 && (
                <DokumentasjonContainer>
                    <BarnDokumentasjon vedlegg={terminbekreftelseVedlegg} />
                </DokumentasjonContainer>
            )}
        </>
    );
};

export default BarnDokumentasjonOppsummering;
