import {
    getFedrekvoteMorForSykVedlegg,
    getFellesperiodeVedlegg,
    getOverføringsVedlegg,
} from 'app/steps/manglende-vedlegg/util';
import { FunctionComponent } from 'react';
import DokumentasjonContainer from './DokumentasjonContainer';
import { VedleggDataType } from 'app/types/VedleggDataType';
import PeriodeDokumentasjon from './PeriodeDokumentasjon';

interface Props {
    vedlegg: VedleggDataType;
}

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const fellesperiodeVedlegg = getFellesperiodeVedlegg(vedlegg);
    const overføringsVedlegg = getOverføringsVedlegg(vedlegg);
    const fedrekvoteMorForSykVedlegg = getFedrekvoteMorForSykVedlegg(vedlegg);

    return (
        <>
            <DokumentasjonContainer>
                <PeriodeDokumentasjon vedlegg={fellesperiodeVedlegg} />
            </DokumentasjonContainer>
            <DokumentasjonContainer>
                <PeriodeDokumentasjon vedlegg={overføringsVedlegg} />
            </DokumentasjonContainer>
            <DokumentasjonContainer>
                <PeriodeDokumentasjon vedlegg={fedrekvoteMorForSykVedlegg} />
            </DokumentasjonContainer>
        </>
    );
};

export default PeriodeDokumentasjonOppsummering;
