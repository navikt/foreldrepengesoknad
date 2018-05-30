import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from '../vedlegg/VedleggInput';
import VedleggListe from '../vedlegg/VedleggListe';
import LabelText from '../labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from '../../util/attachment';
import { Attachment } from '../../types/Attachment';
import { mapFileToAttachment } from './util';
import { SøknadsvedleggKeys } from '../../types/s\u00F8knad/S\u00F8knadsvedlegg';
import { CSSTransition } from 'react-transition-group';

export interface VedleggOversiktProps {
    id: SøknadsvedleggKeys;
    vedlegg: Attachment[];
    visFilstørrelse?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
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

        const showVedleggListe = vedlegg.length > 0;
        return (
            <div>
                <div className={showVedleggListe ? 'blokk-m' : undefined}>
                    <VedleggInput
                        id={id}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(
                                files.map((f) => mapFileToAttachment(f))
                            );
                        }}
                    />
                </div>
                <CSSTransition
                    classNames="transitionFade"
                    timeout={150}
                    in={showVedleggListe}
                    unmountOnExit={true}>
                    <React.Fragment>
                        {showVedleggListe && (
                            <div>
                                <div className="blokk-xs" id={id}>
                                    <LabelText>
                                        <FormattedMessage
                                            id="vedlegg.liste.tittel"
                                            values={{
                                                størrelse: bytesString(
                                                    getTotalFileSize(
                                                        vedlegg.map(
                                                            (v) => v.file
                                                        )
                                                    )
                                                )
                                            }}
                                        />
                                    </LabelText>
                                </div>
                                <VedleggListe
                                    vedlegg={vedlegg}
                                    visFilstørrelse={visFilstørrelse}
                                    onDelete={(file: Attachment) =>
                                        onFileDelete(file)
                                    }
                                />
                            </div>
                        )}
                    </React.Fragment>
                </CSSTransition>
            </div>
        );
    }
}
export default VedleggOversikt;
