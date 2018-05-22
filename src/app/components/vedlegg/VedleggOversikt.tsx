import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from '../vedlegg/VedleggInput';
import VedleggListe from '../vedlegg/VedleggListe';
import LabelText from '../labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from '../../util/attachment';

export interface VedleggOversiktProps {
    id: string;
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
}

class VedleggOversikt extends React.Component<VedleggOversiktProps> {
    render() {
        const {
            id,
            vedlegg,
            visFilstørrelse,
            onFileDelete,
            onFilesSelect
        } = this.props;

        const visListe = vedlegg.length > 0;
        return (
            <div>
                <div className={visListe ? 'blokk-m' : ''}>
                    <VedleggInput
                        id={id}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(files);
                        }}
                    />
                </div>
                {visListe && (
                    <div>
                        <div className="blokk-xs" id={id}>
                            <LabelText>
                                <FormattedMessage
                                    id="vedlegg.liste.tittel"
                                    values={{
                                        størrelse: bytesString(
                                            getTotalFileSize(vedlegg)
                                        )
                                    }}
                                />
                            </LabelText>
                        </div>
                        <VedleggListe
                            vedlegg={vedlegg}
                            visFilstørrelse={visFilstørrelse}
                            onDelete={(file: File) => onFileDelete(file)}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default VedleggOversikt;
