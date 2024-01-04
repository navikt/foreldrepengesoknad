import { convertAttachmentsMapToArray } from 'app/api/apiUtils';
import { VedleggDataType } from 'app/types/VedleggDataType';
import { FunctionComponent } from 'react';

interface Props {
    vedlegg: VedleggDataType;
}

const DokumentasjonOppsummering: FunctionComponent<Props> = ({ vedlegg }) => {
    const vedleggArray = convertAttachmentsMapToArray(vedlegg);

    return <>{vedleggArray.map((v) => v.beskrivelse)}</>;
};

export default DokumentasjonOppsummering;
