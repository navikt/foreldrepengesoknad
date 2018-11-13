import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { Checkbox } from 'nav-frontend-skjema';
import Input from 'common/components/skjema/wrappers/Input';
import {
    Næring,
    NæringPartial,
    Næringsrelasjon,
    NæringsrelasjonPartial,
    Næringstype
} from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import NæringstypeSpørsmål from '../../spørsmål/NæringstypeSpørsmål';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import ErNæringenRegistrertINorgeSpørsmål from '../../spørsmål/ErNæringenRegistrertINorgeSpørsmål';
import Landvelger from '../landvelger/Landvelger';
import VarigEndringAvNæringsinntektBolk from '../../bolker/VarigEndringAvNæringsinntektBolk';
import NæringsrelasjonBolk from '../../bolker/næringsrelasjon-bolk/NæringsrelasjonBolk';
import HarDuRegnskapsførerSpørsmål from '../../spørsmål/HarDuRegnskapsførerSpørsmål';
import HarDuRevisorSpørsmål from '../../spørsmål/HarDuRevisorSpørsmål';
import KanInnhenteOpplysningerFraRevisorSpørsmål from '../../spørsmål/KanInnhenteOpplysningerFraRevisorSpørsmål';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../util/validation/andreInntekter';
import ModalForm from 'common/components/modalForm/ModalForm';
import { getFloatFromString } from 'common/util/numberUtils';
import { getOrganisasjonsnummerRegler } from '../../util/validation/organisasjonsnummer';
import visibility from './visibility';
import { default as cleanupNæring } from '../../util/cleanup/cleanupNæring';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Skjemanummer } from '../../types/søknad/Søknad';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål from '../../spørsmål/HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål';
import { removeSpacesFromString } from '../../util/stringUtils';
import { hasValueRule } from '../../util/validation/common';
import { dateIs15YearsAnd3MonthsAgoOrLess } from '../../util/dates/dates';

export interface SelvstendigNæringsdrivendeModalProps {
    næring?: Næring;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (næring: Næring) => void;
}

type Props = SelvstendigNæringsdrivendeModalProps & InjectedIntlProps;

interface State {
    næring: NæringPartial;
}

class SelvstendigNæringsdrivendeModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props, state: State) {
        return SelvstendigNæringsdrivendeModal.buildStateFromProps(props, state);
    }

    static buildStateFromProps(props: Props, state?: State) {
        const { isOpen } = props;

        if (!isOpen) {
            return { næring: props.næring || {} };
        } else {
            return {
                næring:
                    state && state.næring && Object.keys(state.næring).length > 0 ? state.næring : props.næring || {}
            };
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = SelvstendigNæringsdrivendeModal.buildStateFromProps(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.updateNæring = this.updateNæring.bind(this);
        this.toggleNæringstype = this.toggleNæringstype.bind(this);
        this.handleStillingsprosentBlur = this.handleStillingsprosentBlur.bind(this);
    }

    updateNæring(næringProperties: NæringPartial): void {
        this.setState({
            næring: {
                ...this.state.næring,
                ...næringProperties
            }
        });
    }

    updateVedleggList(vedlegg: Attachment[]) {
        const { næring } = this.state;
        this.setState({
            næring: {
                ...næring,
                vedlegg
            }
        });
    }

    updateVedleggItem(vedlegg: Attachment) {
        const { næring } = this.state;
        if (næring && næring.vedlegg) {
            const index = næring.vedlegg.indexOf(vedlegg);
            næring.vedlegg[index] = vedlegg;
            this.setState({
                næring: {
                    ...næring,
                    vedlegg: næring.vedlegg
                }
            });
        }
    }

    onSubmit(): void {
        this.props.onSubmit(cleanupNæring(this.state.næring as Næring));
    }

    toggleNæringstype(næringstype: Næringstype): void {
        const { næring } = this.state;
        const newNæringstyper = ((næring && næring.næringstyper) || []).slice();
        const indexOfNæringstype = newNæringstyper.indexOf(næringstype);

        if (indexOfNæringstype >= 0) {
            newNæringstyper.splice(indexOfNæringstype, 1);
        } else {
            newNæringstyper.push(næringstype);
        }

        this.updateNæring({ næringstyper: newNæringstyper });
    }

    handleStillingsprosentBlur(e: React.FocusEvent<HTMLInputElement>) {
        const pst = getFloatFromString(e.target.value);
        this.updateNæring({
            stillingsprosent: pst ? pst.toFixed(1) : e.target.value
        });
    }

    render() {
        const { intl, isOpen, onCancel } = this.props;
        const { næring } = this.state;
        const {
            navnPåNæringen,
            næringstyper,
            næringsinntekt,
            tidsperiode,
            pågående,
            organisasjonsnummer,
            registrertINorge,
            registrertILand,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
            harRegnskapsfører,
            harRevisor,
            kanInnhenteOpplsyningerFraRevisor,
            regnskapsfører,
            revisor
        } = næring;

        return (
            <ModalForm
                title={intl.formatMessage({
                    id: 'selvstendigNæringsdrivende.modal.tittel'
                })}
                onSubmit={this.onSubmit}
                onRequestClose={onCancel}
                isOpen={isOpen}
                renderFormButtons={visibility.formButtons(næring)}
                submitLabel={getMessage(intl, 'leggtil')}
                cancelLabel={getMessage(intl, 'avbryt')}>
                <Block>
                    <NæringstypeSpørsmål næringstyper={næringstyper || []} onChange={this.toggleNæringstype} />
                </Block>

                <Block visible={visibility.navnPåNæringen(næring)}>
                    <Input
                        name="selvstendigNæringsdrivende-navn"
                        label={getMessage(intl, 'selvstendigNæringsdrivende.modal.navn')}
                        required={true}
                        onChange={(v: string) =>
                            this.updateNæring({
                                navnPåNæringen: v
                            })
                        }
                        value={navnPåNæringen || ''}
                        throttled={false}
                    />
                </Block>

                <Block visible={visibility.organisasjonsnummer(næring)}>
                    <Input
                        name="selvstendigNæringsdrivende-orgnr"
                        label={getMessage(intl, 'selvstendigNæringsdrivende.modal.orgnr')}
                        onChange={(v: string) =>
                            this.updateNæring({
                                organisasjonsnummer: removeSpacesFromString(v)
                            })
                        }
                        required={true}
                        value={organisasjonsnummer || ''}
                        validators={getOrganisasjonsnummerRegler(organisasjonsnummer || '', registrertINorge, intl)}
                        throttled={false}
                    />
                </Block>

                <Block visible={visibility.tidsperiode(næring)} margin="xxs">
                    <TidsperiodeBolk
                        tidsperiode={tidsperiode || {}}
                        onChange={(v: TidsperiodeMedValgfriSluttdato) => this.updateNæring({ tidsperiode: v })}
                        sluttdatoDisabled={pågående}
                        datoAvgrensninger={getAndreInntekterTidsperiodeAvgrensninger(tidsperiode)}
                        datoInputLabelProps={{
                            fom: getMessage(intl, 'selvstendigNæringsdrivende.tidsperiode.fom', { navnPåNæringen }),
                            tom: getMessage(intl, 'selvstendigNæringsdrivende.tidsperiode.tom', { navnPåNæringen })
                        }}
                        kalenderplassering="fullskjerm"
                    />
                </Block>

                <Block visible={visibility.tidsperiode(næring)}>
                    <Checkbox
                        checked={pågående || false}
                        label={getMessage(intl, 'annenInntekt.modal.pågående')}
                        onChange={() => {
                            this.updateNæring({
                                pågående: !pågående,
                                tidsperiode: {
                                    ...tidsperiode,
                                    tom: undefined
                                }
                            });
                        }}
                    />
                </Block>

                <Block visible={visibility.næringsinntekt(næring)}>
                    <Input
                        name="selvstendigNæringsdrivende-næringsinntekt"
                        label={getMessage(intl, 'annenInntekt.spørsmål.næringsinntekt')}
                        onChange={(v: string) => {
                            const næringPartial: NæringPartial = {
                                næringsinntekt: v.replace(/ /g, '')
                            };
                            this.updateNæring(næringPartial);
                        }}
                        value={næringsinntekt || ''}
                        validators={[
                            hasValueRule(næringsinntekt, getMessage(intl, 'påkrevd')),
                            {
                                test: () => Number.isInteger(Number(næringsinntekt)),
                                failText: getMessage(intl, 'valideringsfeil.selvstendigNæringsdrivende.næringsinntekt')
                            }
                        ]}
                    />
                </Block>

                <Block visible={visibility.dokumentasjonAvInntektSisteÅr(næring)}>
                    <Veilederinfo>
                        Du må legge ved dokumentasjon av inntekten din for det siste året. Dette kan for eksempel være
                        kopi personinntektsskjema, næringsoppgave eller resultatregnskap.
                    </Veilederinfo>
                    <AttachmentsUploader
                        attachments={næring.vedlegg || []}
                        onFilesUploadStart={(attachments: Attachment[]) => {
                            this.updateVedleggList([...(næring.vedlegg || []), ...attachments]);
                        }}
                        onFileUploadFinish={(vedlegg: Attachment) => this.updateVedleggItem(vedlegg)}
                        onFileDeleteStart={(vedlegg: Attachment) => {
                            this.updateVedleggItem(vedlegg);
                        }}
                        onFileDeleteFinish={(vedlegg: Attachment) => {
                            const vedleggList = næring.vedlegg || [];
                            const index = vedleggList.indexOf(vedlegg);
                            vedleggList.splice(index, 1);
                            this.updateVedleggList(vedleggList);
                        }}
                        attachmentType={AttachmentType.SELVSTENDIGNÆRINGSDRIVENDE}
                        skjemanummer={Skjemanummer.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG}
                    />
                </Block>

                <Block visible={visibility.næringRegistrertINorge(næring)}>
                    <ErNæringenRegistrertINorgeSpørsmål
                        navnPåNæringen={this.state.næring.navnPåNæringen || ''}
                        registrertINorge={registrertINorge}
                        onChange={(v: boolean) => this.updateNæring({ registrertINorge: v })}
                    />
                </Block>

                <Block visible={visibility.næringRegistrertILand(næring)}>
                    <Landvelger
                        onChange={(v: string) => this.updateNæring({ registrertILand: v })}
                        label={getMessage(intl, 'selvstendigNæringsdrivende.modal.registrertILand')}
                        defaultValue={registrertILand}
                    />
                </Block>

                <Block visible={visibility.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(næring)}>
                    <HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål
                        spørsmålstekst={getMessage(intl, 'blittYrkesaktivSiste3År.spørsmål')}
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene={
                            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                        }
                        onChange={(v: boolean) =>
                            this.updateNæring({
                                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: v
                            })
                        }
                    />
                </Block>
                <Block visible={visibility.oppstartsdato(næring)}>
                    <DatoInput
                        id="oppstartsdato"
                        name="oppstartsdato"
                        label={getMessage(intl, 'selvstendigNæringsdrivende.modal.oppstartsdato')}
                        onChange={(oppstartsdato: Date) => {
                            this.updateNæring({ oppstartsdato });
                        }}
                        dato={næring.oppstartsdato}
                        kalender={{ plassering: 'fullskjerm' }}
                    />
                </Block>
                <Block visible={visibility.varigEndringAvNæringsinntekt(næring)}>
                    <VarigEndringAvNæringsinntektBolk
                        næring={næring as Næring}
                        onChange={(changedProps: NæringPartial) => this.updateNæring(changedProps)}
                    />
                </Block>

                <Block visible={visibility.regnskapsførerBolk(næring)}>
                    <NæringsrelasjonBolk
                        renderSpørsmål={() => (
                            <HarDuRegnskapsførerSpørsmål
                                harRegnskapsfører={harRegnskapsfører}
                                onChange={(v: boolean) =>
                                    this.updateNæring({
                                        harRegnskapsfører: v
                                    })
                                }
                            />
                        )}
                        oppfølgingsspørsmålSynlig={harRegnskapsfører === true}
                        næringsrelasjon={regnskapsfører || {}}
                        onChange={(v: NæringsrelasjonPartial) =>
                            this.updateNæring({
                                regnskapsfører: v as Næringsrelasjon
                            })
                        }
                        næringsrelasjonsType="regnskapsfører"
                    />
                </Block>

                <Block visible={visibility.revisorBolk(næring)}>
                    <NæringsrelasjonBolk
                        renderSpørsmål={() => (
                            <HarDuRevisorSpørsmål
                                harRevisor={harRevisor}
                                onChange={(v: boolean) =>
                                    this.updateNæring({
                                        harRevisor: v
                                    })
                                }
                            />
                        )}
                        oppfølgingsspørsmålSynlig={harRevisor === true}
                        næringsrelasjon={revisor || {}}
                        onChange={(v: NæringsrelasjonPartial) =>
                            this.updateNæring({
                                revisor: v as Næringsrelasjon
                            })
                        }
                        næringsrelasjonsType="revisor"
                    />
                </Block>

                <Block visible={visibility.kanInnhenteOpplysningerFraRevisor(næring)}>
                    <KanInnhenteOpplysningerFraRevisorSpørsmål
                        kanInnhenteOpplysningerFraRevisor={kanInnhenteOpplsyningerFraRevisor}
                        onChange={(v: boolean) =>
                            this.updateNæring({
                                kanInnhenteOpplsyningerFraRevisor: v
                            })
                        }
                    />
                </Block>
            </ModalForm>
        );
    }
}

export default injectIntl(SelvstendigNæringsdrivendeModal);
