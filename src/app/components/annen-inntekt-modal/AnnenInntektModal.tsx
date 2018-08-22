import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import {
    AnnenInntekt,
    AnnenInntektPartial,
    AnnenInntektType,
    JobbIUtlandetInntekt,
    JobbIUtlandetInntektPartial
} from '../../types/søknad/AnnenInntekt';
import InntektstypeVelger from '../inntektstype-velger/InntektstypeVelger';
import { Checkbox, Input } from 'nav-frontend-skjema';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import Landvelger from '../landvelger/Landvelger';
import ErArbeidsgiverNærVennEllerFamilie from '../../spørsmål/ErArbeidsgiverNærVennEllerFamilieSpørsmål';
import { AttachmentType, Skjemanummer } from '../../types/søknad/Søknad';
import { InputChangeEvent } from '../../types/dom/Events';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../util/validation/fields/andreInntekter';
import { DispatchProps } from 'common/redux/types';
import AnnenInntektVedleggInfo from './AnnenInntektVedleggInfo';
import ModalForm from 'common/components/modalForm/ModalForm';

export interface AnnenInntektModalProps {
    annenInntekt?: AnnenInntekt;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (annenInntekt: AnnenInntekt) => void;
}

type Props = AnnenInntektModalProps & InjectedIntlProps & DispatchProps;

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

    findSkjemanummer(): Skjemanummer {
        const { annenInntekt } = this.state;

        switch (annenInntekt.type) {
            case AnnenInntektType.MILITÆRTJENESTE:
                return Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE;
            case AnnenInntektType.JOBB_I_UTLANDET:
                return Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG;
            case AnnenInntektType.VENTELØNN:
                return Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
            case AnnenInntektType.SLUTTPAKKE:
                return Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG;
            case AnnenInntektType.LØNN_VED_VIDEREUTDANNING:
                return Skjemanummer.INNTEKTSOPPLYSNINGER;
            default:
                return Skjemanummer.ANNET;
        }
    }

    onSubmit() {
        this.props.onSubmit(this.state.annenInntekt as AnnenInntekt);
    }

    render() {
        const { intl, isOpen, onCancel, dispatch } = this.props;
        const { annenInntekt } = this.state;
        const gjelderJobbIUtlandet =
            annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET;

        const visTidsperiode = annenInntekt.type !== undefined;
        return (
            <ModalForm
                isOpen={isOpen}
                title={getMessage(intl, 'annenInntekt.modal.tittel')}
                onSubmit={this.onSubmit}
                onRequestClose={onCancel}
                renderFormButtons={true}
                dialogSize="medium"
                submitLabel={getMessage(intl, 'leggtil')}
                cancelLabel={getMessage(intl, 'avbryt')}>
                <Block>
                    <InntektstypeVelger
                        label={
                            <Labeltekst intlId="annenInntekt.modal.select.spørsmål" />
                        }
                        onChange={(type: AnnenInntektType) =>
                            this.updateAnnenInntekt({ type })
                        }
                        defaultValue={annenInntekt.type}
                    />
                </Block>
                <Block visible={gjelderJobbIUtlandet}>
                    <Landvelger
                        defaultValue={
                            (annenInntekt as JobbIUtlandetInntekt).land
                        }
                        label={getMessage(intl, 'annenInntekt.modal.land')}
                        onChange={(v: string) => {
                            const utlandInntekt: JobbIUtlandetInntektPartial = {
                                land: v
                            };
                            this.updateAnnenInntekt(utlandInntekt);
                        }}
                    />
                </Block>
                <Block
                    visible={
                        (annenInntekt as JobbIUtlandetInntekt).land !==
                        undefined
                    }>
                    <Input
                        label={getMessage(
                            intl,
                            'annenInntekt.spørsmål.arbeidsgiver'
                        )}
                        onChange={(e: InputChangeEvent) => {
                            const utlandInntekt: JobbIUtlandetInntektPartial = {
                                arbeidsgiverNavn: e.target.value
                            };
                            this.updateAnnenInntekt(utlandInntekt);
                        }}
                        value={
                            (annenInntekt as JobbIUtlandetInntekt)
                                .arbeidsgiverNavn || ''
                        }
                    />
                </Block>
                <Block
                    visible={
                        gjelderJobbIUtlandet &&
                        (annenInntekt as JobbIUtlandetInntekt)
                            .arbeidsgiverNavn !== undefined
                    }>
                    <ErArbeidsgiverNærVennEllerFamilie
                        erArbeidsgiverNærVennEllerFamilie={
                            (annenInntekt as JobbIUtlandetInntekt)
                                .erNærVennEllerFamilieMedArbeidsgiver
                        }
                        onChange={(v: boolean) => {
                            const utlandInntekt: JobbIUtlandetInntektPartial = {
                                erNærVennEllerFamilieMedArbeidsgiver: v
                            };
                            this.updateAnnenInntekt(utlandInntekt);
                        }}
                    />
                </Block>
                <Block visible={visTidsperiode}>
                    <TidsperiodeBolk
                        tidsperiode={annenInntekt.tidsperiode || {}}
                        onChange={(
                            tidsperiode: TidsperiodeMedValgfriSluttdato
                        ) => this.updateAnnenInntekt({ tidsperiode })}
                        sluttdatoDisabled={annenInntekt.pågående}
                        datoAvgrensninger={getAndreInntekterTidsperiodeAvgrensninger(
                            annenInntekt.tidsperiode
                        )}
                    />
                    <Checkbox
                        checked={annenInntekt.pågående || false}
                        label={getMessage(intl, 'annenInntekt.modal.pågående')}
                        onChange={() => {
                            this.updateAnnenInntekt({
                                pågående: !annenInntekt.pågående,
                                tidsperiode: {
                                    ...annenInntekt.tidsperiode,
                                    tom: undefined
                                }
                            });
                        }}
                    />
                </Block>
                <Block
                    visible={
                        annenInntekt.type !== undefined &&
                        annenInntekt.type !==
                            AnnenInntektType.LØNN_VED_VIDEREUTDANNING
                    }>
                    <AnnenInntektVedleggInfo type={annenInntekt.type} />
                    <AttachmentsUploader
                        attachments={annenInntekt.vedlegg || []}
                        onFilesUploadStart={(attachments: Attachment[]) => {
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
                            const vedleggList = annenInntekt.vedlegg || [];
                            const index = vedleggList.indexOf(vedlegg);
                            vedleggList.splice(index, 1);
                            this.updateVedleggList(vedleggList);
                        }}
                        attachmentType={
                            AttachmentType.ANNEN_INNTEKT_DOKUMENTASJON
                        }
                        skjemanummer={this.findSkjemanummer()}
                        dispatch={dispatch}
                    />
                </Block>
            </ModalForm>
        );
    }
}

export default injectIntl(AnnenInntektModal);
