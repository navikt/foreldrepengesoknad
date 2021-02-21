import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Block from 'common/components/block/Block';
import ModalForm from 'common/components/modalForm/ModalForm';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import Input from 'common/components/skjema/wrappers/Input';
import getMessage from 'common/util/i18nUtils';
import { trimNumberFromInput } from 'common/util/numberUtils';
import Landvelger from 'app/components/skjema/landvelger/Landvelger';
import TidsperiodeBolk from '../../../components/skjema/tidsperiodeBolk/TidsperiodeBolk';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';
import ErNæringenRegistrertINorgeSpørsmål from '../../../spørsmål/ErNæringenRegistrertINorgeSpørsmål';
import HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål from '../../../spørsmål/HarDuBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneSpørsmål';
import HarDuRegnskapsførerSpørsmål from '../../../spørsmål/HarDuRegnskapsførerSpørsmål';
import HarDuRevisorSpørsmål from '../../../spørsmål/HarDuRevisorSpørsmål';
import KanInnhenteOpplysningerFraRevisorSpørsmål from '../../../spørsmål/KanInnhenteOpplysningerFraRevisorSpørsmål';
import NæringstypeSpørsmål from '../../../spørsmål/NæringstypeSpørsmål';
import {
    Næring,
    NæringPartial,
    Næringsrelasjon,
    NæringsrelasjonPartial,
    Næringstype,
} from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { default as cleanupNæring } from '../../../util/cleanup/cleanupNæring';
import { removeSpacesFromString } from '../../../util/stringUtils';
import { mapTidsperiodeStringToTidsperiode } from '../../../util/tidsperiodeUtils';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../../util/validation/andreInntekter';
import { erGyldigDato, hasValueRule } from '../../../util/validation/common';
import { getFritekstfeltRules } from '../../../util/validation/fritekstfelt';
import { getOrganisasjonsnummerRegler } from '../../../util/validation/organisasjonsnummer';
import NæringsrelasjonBolk from './næringsrelasjonBolk/NæringsrelasjonBolk';
import VarigEndringAvNæringsinntektBolk from './VarigEndringAvNæringsinntektBolk';
import visibility from './visibility';

export interface SelvstendigNæringsdrivendeModalProps {
    næring?: Næring;
    isOpen: boolean;
    onCancel: () => void;
    onSubmit: (næring: Næring) => void;
    intl: IntlShape;
}

type Props = SelvstendigNæringsdrivendeModalProps;

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
                    state && state.næring && Object.keys(state.næring).length > 0 ? state.næring : props.næring || {},
            };
        }
    }

    constructor(props: Props) {
        super(props);

        this.state = SelvstendigNæringsdrivendeModal.buildStateFromProps(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.updateNæring = this.updateNæring.bind(this);
        this.toggleNæringstype = this.toggleNæringstype.bind(this);
    }

    updateNæring(næringProperties: NæringPartial): void {
        this.setState({
            næring: {
                ...this.state.næring,
                ...næringProperties,
            },
        });
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

    render() {
        const { intl, isOpen, onCancel } = this.props;
        const { næring } = this.state;
        const tidsperiode = næring.tidsperiode !== undefined ? næring.tidsperiode : {};
        const {
            navnPåNæringen,
            næringstyper,
            næringsinntekt,
            organisasjonsnummer,
            registrertINorge,
            registrertILand,
            harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
            harRegnskapsfører,
            harRevisor,
            kanInnhenteOpplsyningerFraRevisor,
            regnskapsfører,
            revisor,
        } = næring;

        return (
            <ModalForm
                title={intl.formatMessage({
                    id: 'selvstendigNæringsdrivende.modal.tittel',
                })}
                onSubmit={this.onSubmit}
                onRequestClose={onCancel}
                isOpen={isOpen}
                renderFormButtons={visibility.formButtons(næring)}
                submitLabel={getMessage(intl, 'leggtil')}
                cancelLabel={getMessage(intl, 'avbryt')}
                noSummary={true}
            >
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
                                navnPåNæringen: v,
                            })
                        }
                        value={navnPåNæringen || ''}
                        throttled={false}
                        validators={getFritekstfeltRules({ maxLength: 100 }, intl, navnPåNæringen)}
                    />
                </Block>

                <Block
                    margin="xs"
                    visible={
                        navnPåNæringen !== undefined &&
                        navnPåNæringen !== '' &&
                        næring.næringstyper !== undefined &&
                        næring.næringstyper.some((n) => n === Næringstype.FISKER)
                    }
                >
                    <VeilederInfo
                        messages={[
                            {
                                contentIntlKey: 'selvstendigNæringsdrivende.modal.infoboks.forFisker',
                                type: 'normal',
                                values: {
                                    navnPåNæringen,
                                },
                            },
                        ]}
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
                        validators={[hasValueRule(registrertILand, getMessage(intl, 'påkrevd'))]}
                    />
                </Block>

                <Block visible={visibility.organisasjonsnummer(næring)}>
                    <Input
                        name="selvstendigNæringsdrivende-orgnr"
                        label={getMessage(intl, 'selvstendigNæringsdrivende.modal.orgnr')}
                        onChange={(v: string) =>
                            this.updateNæring({
                                organisasjonsnummer: removeSpacesFromString(v),
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
                        pågående={tidsperiode.pågående}
                        visPågåendePeriodeCheckbox={true}
                        onChange={(v) => this.updateNæring({ tidsperiode: v })}
                        datoAvgrensninger={getAndreInntekterTidsperiodeAvgrensninger(
                            mapTidsperiodeStringToTidsperiode(tidsperiode)
                        )}
                        datoInputLabelProps={{
                            fom: getMessage(intl, 'selvstendigNæringsdrivende.tidsperiode.fom', { navnPåNæringen }),
                            tom: getMessage(intl, 'selvstendigNæringsdrivende.tidsperiode.tom', { navnPåNæringen }),
                        }}
                        calendarPosition="fullscreen"
                    />
                </Block>

                <Block visible={visibility.næringsinntekt(næring)}>
                    <Input
                        name="selvstendigNæringsdrivende-næringsinntekt"
                        infotekst={getMessage(intl, 'annenInntekt.spørsmål.næringsinntekt.info')}
                        apneLabel={getMessage(intl, 'annenInntekt.spørsmål.næringsinntekt.info.apneLabel')}
                        label={getMessage(intl, 'annenInntekt.spørsmål.næringsinntekt')}
                        onChange={(v: string) => {
                            const næringPartial: NæringPartial = {
                                næringsinntekt: trimNumberFromInput(v),
                            };
                            this.updateNæring(næringPartial);
                        }}
                        value={næringsinntekt === undefined || isNaN(næringsinntekt) ? '' : næringsinntekt}
                        validators={[
                            hasValueRule(
                                (næringsinntekt && isNaN(næringsinntekt) === false) || '',
                                getMessage(intl, 'valideringsfeil.selvstendignæring.næringsresultatPåkrevd')
                            ),
                        ]}
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
                                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: v,
                            })
                        }
                    />
                </Block>
                <Block visible={visibility.oppstartsdato(næring)}>
                    <DatoInput
                        id="oppstartsdato"
                        name="oppstartsdato"
                        label={getMessage(intl, 'selvstendigNæringsdrivende.modal.oppstartsdato')}
                        onChange={(oppstartsdato) => {
                            this.updateNæring({ oppstartsdato });
                        }}
                        dato={næring.oppstartsdato}
                        calendarSettings={{ position: 'fullscreen' }}
                        validators={[
                            hasValueRule(næring && næring.oppstartsdato, getMessage(intl, 'påkrevd')),
                            erGyldigDato(
                                næring && næring.oppstartsdato,
                                getMessage(
                                    intl,
                                    'valideringsfeil.selvstendigNæringsdrivende.modal.oppstartsdato.gyldigDato'
                                )
                            ),
                        ]}
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
                                        harRegnskapsfører: v,
                                    })
                                }
                            />
                        )}
                        oppfølgingsspørsmålSynlig={harRegnskapsfører === true}
                        næringsrelasjon={regnskapsfører || {}}
                        onChange={(v: NæringsrelasjonPartial) =>
                            this.updateNæring({
                                regnskapsfører: v as Næringsrelasjon,
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
                                        harRevisor: v,
                                    })
                                }
                            />
                        )}
                        oppfølgingsspørsmålSynlig={harRevisor === true}
                        næringsrelasjon={revisor || {}}
                        onChange={(v: NæringsrelasjonPartial) =>
                            this.updateNæring({
                                revisor: v as Næringsrelasjon,
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
                                kanInnhenteOpplsyningerFraRevisor: v,
                            })
                        }
                    />
                </Block>

                <Block visible={visibility.formButtons(næring)} margin="none">
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'selvstendigNæringsdrivende.modal.veileder.blikontaktet',
                            },
                        ]}
                    />
                </Block>
            </ModalForm>
        );
    }
}

export default injectIntl(SelvstendigNæringsdrivendeModal);
