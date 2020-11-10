import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import * as countries from 'i18n-iso-countries';
import Block from 'common/components/block/Block';
import ModalForm from 'common/components/modalForm/ModalForm';
import Input from 'common/components/skjema/wrappers/Input';
import getMessage from 'common/util/i18nUtils';
import Landvelger from 'app/components/skjema/landvelger/Landvelger';
import AttachmentsUploader from 'app/components/storage/attachment/components/AttachmentUploader';
import { getSkjemanummerForAndreInntekter } from 'app/components/storage/attachment/components/util';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import TidsperiodeBolk from '../../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';
import InntektstypeSpørsmål from '../../../spørsmål/InntektstypeSpørsmål';
import {
    AnnenInntekt,
    AnnenInntektPartial,
    AnnenInntektType,
    JobbIUtlandetInntekt,
    JobbIUtlandetInntektPartial,
} from '../../../types/søknad/AnnenInntekt';
import { mapTidsperiodeStringToTidsperiode } from '../../../util/tidsperiodeUtils';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../../util/validation/andreInntekter';
import { hasValueRule } from '../../../util/validation/common';
import AnnenInntektVedleggInfo from './AnnenInntektVedleggInfo';
import visibility from './visibility';

export interface AnnenInntektModalProps {
    annenInntekt?: AnnenInntekt;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (annenInntekt: AnnenInntekt) => void;
    intl: IntlShape;
}

type Props = AnnenInntektModalProps;

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
                    state && state.annenInntekt && Object.keys(state.annenInntekt).length > 0
                        ? state.annenInntekt
                        : props.annenInntekt || {},
            };
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = AnnenInntektModal.buildStateFromProps(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateAnnenInntekt(annenInntektProperties: AnnenInntektPartial): void {
        this.setState({
            annenInntekt: {
                ...this.state.annenInntekt,
                ...annenInntektProperties,
            },
        });
    }

    updateVedleggList(vedlegg: Attachment[]): void {
        const { annenInntekt } = this.state;
        this.setState({
            annenInntekt: {
                ...annenInntekt,
                vedlegg,
            },
        });
    }

    updateVedleggItem(vedlegg: Attachment): void {
        const { annenInntekt } = this.state;
        if (annenInntekt && annenInntekt.vedlegg) {
            const index = annenInntekt.vedlegg.indexOf(vedlegg);
            annenInntekt.vedlegg[index] = vedlegg;
            this.setState({
                annenInntekt: {
                    ...annenInntekt,
                    vedlegg: annenInntekt.vedlegg,
                },
            });
        }
    }

    onSubmit(): void {
        this.props.onSubmit(this.state.annenInntekt as AnnenInntekt);
    }

    render() {
        const { intl, isOpen, onCancel } = this.props;
        const { annenInntekt } = this.state;
        const tidsperiode = annenInntekt.tidsperiode !== undefined ? annenInntekt.tidsperiode : {};

        return (
            <ModalForm
                isOpen={isOpen}
                title={getMessage(intl, 'annenInntekt.modal.tittel')}
                onSubmit={this.onSubmit}
                noSummary={true}
                onRequestClose={onCancel}
                renderFormButtons={true}
                dialogSize="medium"
                submitLabel={getMessage(intl, 'leggtil')}
                cancelLabel={getMessage(intl, 'avbryt')}
            >
                <Block>
                    <InntektstypeSpørsmål
                        inntektstype={annenInntekt.type}
                        onChange={(type: AnnenInntektType) => this.updateAnnenInntekt({ type })}
                    />
                </Block>

                <Block visible={visibility.land(annenInntekt)}>
                    <Landvelger
                        defaultValue={(annenInntekt as JobbIUtlandetInntekt).land}
                        label={getMessage(intl, 'annenInntekt.modal.land')}
                        onChange={(v: string) => {
                            const utlandInntekt: JobbIUtlandetInntektPartial = {
                                land: v,
                            };
                            this.updateAnnenInntekt(utlandInntekt);
                        }}
                        visBareEuOgEftaLand={true}
                        validators={[
                            hasValueRule(annenInntekt && (annenInntekt as JobbIUtlandetInntekt).land, 'påkrevd'),
                        ]}
                    />
                </Block>

                <Block visible={visibility.arbeidsgiverNavn(annenInntekt)}>
                    <Input
                        name="arbeidsgiverNavn"
                        label={getMessage(intl, 'annenInntekt.spørsmål.arbeidsgiver')}
                        onChange={(arbeidsgiverNavn: string) => {
                            const utlandInntekt: JobbIUtlandetInntektPartial = {
                                arbeidsgiverNavn,
                            };
                            this.updateAnnenInntekt(utlandInntekt);
                        }}
                        value={(annenInntekt as JobbIUtlandetInntekt).arbeidsgiverNavn || ''}
                        validators={[
                            hasValueRule(
                                annenInntekt && (annenInntekt as JobbIUtlandetInntekt).arbeidsgiverNavn,
                                'påkrevd'
                            ),
                        ]}
                    />
                </Block>
                <Block>
                    <TidsperiodeBolk
                        tidsperiode={tidsperiode}
                        pågående={tidsperiode.pågående}
                        visPågåendePeriodeCheckbox={true}
                        onChange={(changedTidsperiode) => this.updateAnnenInntekt({ tidsperiode: changedTidsperiode })}
                        datoAvgrensninger={
                            annenInntekt.tidsperiode
                                ? getAndreInntekterTidsperiodeAvgrensninger(
                                      mapTidsperiodeStringToTidsperiode(annenInntekt.tidsperiode)
                                  )
                                : undefined
                        }
                        calendarPosition="fullscreen"
                    />
                </Block>
                <Block visible={visibility.vedlegg(annenInntekt)}>
                    <AnnenInntektVedleggInfo type={annenInntekt.type} />
                    <AttachmentsUploader
                        attachments={annenInntekt.vedlegg || []}
                        onFilesUploadStart={(attachments: Attachment[]) => {
                            this.updateVedleggList([...(annenInntekt.vedlegg || []), ...attachments]);
                        }}
                        onFileUploadFinish={(vedlegg: Attachment) => this.updateVedleggItem(vedlegg)}
                        onFileDelete={(vedlegg: Attachment) => {
                            const vedleggList = annenInntekt.vedlegg || [];
                            const index = vedleggList.indexOf(vedlegg);
                            vedleggList.splice(index, 1);
                            this.updateVedleggList(vedleggList);
                        }}
                        attachmentType={AttachmentType.ANNEN_INNTEKT}
                        skjemanummer={getSkjemanummerForAndreInntekter(annenInntekt.type!)}
                    />
                </Block>
                <Block visible={annenInntekt.type === AnnenInntektType.JOBB_I_UTLANDET}>
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'inntektstype.jobb_i_utlandet_info',
                                values: {
                                    land:
                                        (annenInntekt as JobbIUtlandetInntekt).land !== undefined
                                            ? countries.getName(
                                                  (annenInntekt as JobbIUtlandetInntekt).land,
                                                  intl.locale
                                              )
                                            : 'annet land',
                                },
                            },
                        ]}
                    />
                </Block>
            </ModalForm>
        );
    }
}

export default injectIntl(AnnenInntektModal);
