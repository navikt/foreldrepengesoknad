import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';
import PeriodeDokumentasjonOppsummering from './components/perioder/PeriodeDokumentasjonOppsummering';
import BarnDokumentasjonOppsummering from './components/barn/BarnDokumentasjonOppsummering';

interface Props {
    vedlegg: VedleggDataType;
}
const DokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    return (
        <>
            <PeriodeDokumentasjonOppsummering vedlegg={vedlegg} />
            <BarnDokumentasjonOppsummering vedlegg={vedlegg} />
        </>
    );
};

export default DokumentasjonOppsummering;
