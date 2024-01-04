import { AttachmentMetadataType } from '@navikt/fp-types/src/AttachmentMetadata';
import { convertAttachmentsMapToArray } from 'app/api/apiUtils';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';
import PeriodeDokumentasjonOppsummering from './components/PeriodeDokumentasjonOppsummering';

interface Props {
    vedlegg: VedleggDataType;
}
const DokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const vedleggArray = convertAttachmentsMapToArray(vedlegg);
    const perioderDokumentasjon = vedleggArray.filter(
        (v) => v.dokumenterer && v.dokumenterer.type === AttachmentMetadataType.UTTAK,
    );

    return (
        <>
            <PeriodeDokumentasjonOppsummering dokumentasjon={perioderDokumentasjon} />
        </>
    );
};

export default DokumentasjonOppsummering;
