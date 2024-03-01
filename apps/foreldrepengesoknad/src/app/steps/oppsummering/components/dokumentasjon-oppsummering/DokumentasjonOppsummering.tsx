import { FunctionComponent } from 'react';

import { VedleggDataType } from 'app/types/VedleggDataType';

import AndreInntekterDokumentasjonOppsummering from './components/andre-inntekter/AndreInntekterDokumentasjonOppsummering';
import BarnDokumentasjonOppsummering from './components/barn/BarnDokumentasjonOppsummering';
import PeriodeDokumentasjonOppsummering from './components/perioder/PeriodeDokumentasjonOppsummering';

interface Props {
    vedlegg: VedleggDataType;
    setManglerDokumentasjon: (manglerDokumentajson: boolean) => void;
}
const DokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg, setManglerDokumentasjon }) => {
    return (
        <>
            <PeriodeDokumentasjonOppsummering vedlegg={vedlegg} setManglerDokumentasjon={setManglerDokumentasjon} />
            <BarnDokumentasjonOppsummering vedlegg={vedlegg} setManglerDokumentasjon={setManglerDokumentasjon} />
            <AndreInntekterDokumentasjonOppsummering
                vedlegg={vedlegg}
                setManglerDokumentasjon={setManglerDokumentasjon}
            />
        </>
    );
};

export default DokumentasjonOppsummering;
