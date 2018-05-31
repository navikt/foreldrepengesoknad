import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from '../vedlegg/VedleggInput';
import VedleggListe from '../vedlegg/VedleggListe';
import LabelText from '../labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment } from 'storage/attachment/types/Attachment';

export interface VedleggOversiktProps {
    vedlegg: Attachment[];
    inputId?: string;
    visFilstørrelse?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
}

class VedleggOversikt extends React.Component<VedleggOversiktProps> {
    render() {
        const {
            inputId = guid(),
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
                        id={inputId}
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
                                <div className="blokk-xs">
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
