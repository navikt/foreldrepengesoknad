import { getFellesperiodeVedlegg, getOverføringsVedlegg } from 'app/steps/manglende-vedlegg/util';
import { FunctionComponent } from 'react';
import DokumentasjonContainer from './DokumentasjonContainer';
import { VedleggDataType } from 'app/types/VedleggDataType';
import FellesperiodeDokumentasjon from './FellesperiodeDokumentasjon';
import OverføringsperiodeDokumentasjon from './OverføringsperiodeDokumentasjon';

interface Props {
    vedlegg: VedleggDataType;
}

const PeriodeDokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const fellesperiodeVedlegg = getFellesperiodeVedlegg(vedlegg);
    const overføringsVedlegg = getOverføringsVedlegg(vedlegg);
    // const fedrekvoteMorForSykVedlegg = getFedrekvoteMorForSykVedlegg(vedlegg);

    return (
        <>
            <DokumentasjonContainer>
                <FellesperiodeDokumentasjon vedlegg={fellesperiodeVedlegg} />
            </DokumentasjonContainer>
            <DokumentasjonContainer>
                <OverføringsperiodeDokumentasjon vedlegg={overføringsVedlegg} />
            </DokumentasjonContainer>
        </>
    );
};

export default PeriodeDokumentasjonOppsummering;
