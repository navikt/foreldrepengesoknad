import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import DatoInput from 'common/components/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import {
    AnnenInntekt,
    AnnenInntektPartial,
    AnnenInntektType
} from '../../types/søknad/AnnenInntekt';
import InntektstypeVelger from '../inntektstype-velger/InntektstypeVelger';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Checkbox } from 'nav-frontend-skjema';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import BEMHelper from 'common/util/bem';
import './annenInntektModal.less';

export interface AnnenInntektModalProps extends ModalProps {
    annenInntekt?: AnnenInntekt;
    editMode: boolean;
    onAdd: (annenInntekt: AnnenInntekt) => void;
    onEdit: (annenInntekt: AnnenInntekt) => void;
}

type Props = AnnenInntektModalProps & InjectedIntlProps;

interface State {
    annenInntekt: AnnenInntektPartial;
}

class AnnenInntektModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props, state: State) {
        return AnnenInntektModal.buildStateFromProps(props, state);
    }

    static buildStateFromProps(props: Props, state?: State) {
        const { isOpen } = props;

        if (!isOpen) {
            return { annenInntekt: props.annenInntekt || {} };
        } else {
            return {
                annenInntekt:
                    state &&
                    state.annenInntekt &&
                    Object.keys(state.annenInntekt).length > 0
                        ? state.annenInntekt
                        : props.annenInntekt || {}
            };
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = AnnenInntektModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateAnnenInntekt(annenInntektProperties: AnnenInntektPartial) {
        this.setState({
            annenInntekt: {
                ...this.state.annenInntekt,
                ...annenInntektProperties
            }
        });
    }

    updateVedleggList(vedlegg: Attachment[]) {
        const { annenInntekt } = this.state;
        this.setState({
            annenInntekt: {
                ...annenInntekt,
                vedlegg
            }
        });
    }

    updateVedleggItem(vedlegg: Attachment) {
        const { annenInntekt } = this.state;
        if (annenInntekt && annenInntekt.vedlegg) {
            const index = annenInntekt.vedlegg.indexOf(vedlegg);
            annenInntekt.vedlegg[index] = vedlegg;
            this.setState({
                annenInntekt: {
                    ...annenInntekt,
                    vedlegg: annenInntekt.vedlegg
                }
            });
        }
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        const { onAdd, onEdit, editMode } = this.props;
        const { annenInntekt } = this.state;

        if (editMode) {
            onEdit(annenInntekt as AnnenInntekt);
        } else {
            onAdd(annenInntekt as AnnenInntekt);
        }
    }

    render() {
        const { intl, onRequestClose, ...modalProps } = this.props;
        const { annenInntekt } = this.state;

        const cls = BEMHelper('annenInntektModal');
        return (
            <Modal
                className={cls.className}
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className={cls.element('title')}>
                        <FormattedMessage id="annenInntekt.modal.tittel" />
                    </Undertittel>

                    <Spørsmål
                        render={() => (
                            <InntektstypeVelger
                                label={
                                    <Labeltekst intlId="annenInntekt.modal.select.spørsmål" />
                                }
                                onChange={(type: AnnenInntektType) =>
                                    this.updateAnnenInntekt({ type })
                                }
                                defaultValue={annenInntekt.type}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <DatoInput
                                id="fraDatoInput"
                                label={getMessage(
                                    intl,
                                    'annenInntekt.modal.fra.spørsmål'
                                )}
                                onChange={(startdato: Date) => {
                                    this.updateAnnenInntekt({
                                        tidsperiode: {
                                            ...this.state.annenInntekt
                                                .tidsperiode,
                                            startdato
                                        }
                                    });
                                }}
                                dato={
                                    annenInntekt.tidsperiode &&
                                    annenInntekt.tidsperiode.startdato
                                }
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <DatoInput
                                id="tilDatoInput"
                                label={getMessage(
                                    intl,
                                    'annenInntekt.modal.til.spørsmål'
                                )}
                                onChange={(sluttdato: Date) => {
                                    this.updateAnnenInntekt({
                                        tidsperiode: {
                                            ...this.state.annenInntekt
                                                .tidsperiode,
                                            sluttdato
                                        }
                                    });
                                }}
                                dato={
                                    annenInntekt.tidsperiode &&
                                    annenInntekt.tidsperiode.sluttdato
                                }
                                disabled={annenInntekt.pågående}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <Checkbox
                                checked={annenInntekt.pågående || false}
                                label={getMessage(
                                    intl,
                                    'annenInntekt.modal.pågående'
                                )}
                                onChange={() => {
                                    this.updateAnnenInntekt({
                                        pågående: !annenInntekt.pågående,
                                        tidsperiode: {
                                            ...annenInntekt.tidsperiode,
                                            sluttdato: undefined
                                        }
                                    });
                                }}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <AttachmentsUploader
                                attachments={annenInntekt.vedlegg || []}
                                onFilesUploadStart={(
                                    attachments: Attachment[]
                                ) => {
                                    this.updateVedleggList([
                                        ...(annenInntekt.vedlegg || []),
                                        ...attachments
                                    ]);
                                }}
                                onFileUploadFinish={(vedlegg: Attachment) =>
                                    this.updateVedleggItem(vedlegg)
                                }
                                onFileDeleteStart={(vedlegg: Attachment) => {
                                    this.updateVedleggItem(vedlegg);
                                }}
                                onFileDeleteFinish={(vedlegg: Attachment) => {
                                    const vedleggList =
                                        annenInntekt.vedlegg || [];
                                    const index = vedleggList.indexOf(vedlegg);
                                    vedleggList.splice(index, 1);
                                    this.updateVedleggList(vedleggList);
                                }}
                                attachmentType="anneninntektdokumentasjon"
                            />
                        )}
                    />

                    <Knapperad>
                        <Knapp
                            type="standard"
                            onClick={onRequestClose}
                            htmlType="button">
                            <FormattedMessage id="avbryt" />
                        </Knapp>
                        <Hovedknapp>
                            <FormattedMessage id="leggtil" />
                        </Hovedknapp>
                    </Knapperad>
                </form>
            </Modal>
        );
    }
}

export default injectIntl(AnnenInntektModal);
