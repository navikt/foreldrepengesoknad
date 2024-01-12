import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';
import PeriodeDokumentasjonOppsummering from './components/PeriodeDokumentasjonOppsummering';

interface Props {
    vedlegg: VedleggDataType;
}
const DokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    return (
        <>
            <PeriodeDokumentasjonOppsummering vedlegg={vedlegg} />
        </>
    );
};

export default DokumentasjonOppsummering;
