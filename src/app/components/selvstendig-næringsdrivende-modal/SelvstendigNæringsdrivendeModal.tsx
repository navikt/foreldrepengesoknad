import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
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
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import ErNæringenRegistrertINorgeSpørsmål from '../../spørsmål/ErNæringenRegistrertINorgeSpørsmål';
import Landvelger from '../landvelger/Landvelger';
import { erMindreEnn4ÅrSidenOppstart } from '../../util/domain/næringer';
import HeltNyIArbeidslivetSpørsmål from '../../spørsmål/HeltNyIArbeidslivetSpørsmål';
import VarigEndringAvNæringsinntektBolk from '../../bolker/VarigEndringAvNæringsinntektBolk';
import NæringsrelasjonBolk from '../../bolker/NæringsrelasjonBolk';
import HarDuRegnskapsførerSpørsmål from '../../spørsmål/HarDuRegnskapsførerSpørsmål';
import HarDuRevisorSpørsmål from '../../spørsmål/HarDuRevisorSpørsmål';
import KanInnhenteOpplysningerOmReviorSpørsmål from '../../spørsmål/KanInnhenteOpplysningerFraRevisorSpørsmål';
import moment from 'moment';
import { InputChangeEvent } from '../../types/dom/Events';
import { date4YearsAgo } from '../../util/validation/values';
import { getAndreInntekterTidsperiodeAvgrensninger } from '../../util/validation/fields/andreInntekter';
import { getStillingsprosentRegler } from '../../util/validation/fields/stillingsprosent';
import ModalForm from 'common/components/modalForm/ModalForm';

export interface SelvstendigNæringsdrivendeModalProps {
    næring?: Næring;
    editMode: boolean;
    isOpen: boolean;
    onCancel: () => void;
    onAdd: (næring: Næring) => void;
    onEdit: (næring: Næring) => void;
}

type Props = SelvstendigNæringsdrivendeModalProps & InjectedIntlProps;

interface State {
    næring: NæringPartial;
}

class SelvstendigNæringsdrivendeModal extends React.Component<Props, State> {
    static getDerivedStateFromProps(props: Props, state: State) {
        return SelvstendigNæringsdrivendeModal.buildStateFromProps(
            props,
            state
        );
    }

    static buildStateFromProps(props: Props, state?: State) {
        const { isOpen } = props;

        if (!isOpen) {
            return { næring: props.næring || {} };
        } else {
            return {
                næring:
                    state &&
                    state.næring &&
                    Object.keys(state.næring).length > 0
                        ? state.næring
                        : props.næring || {}
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
                ...næringProperties
            }
        });
    }

    onSubmit(): void {
        const { onAdd, onEdit, editMode } = this.props;
        const { næring } = this.state;
        if (editMode) {
            onEdit(næring as Næring);
        } else {
            onAdd(næring as Næring);
        }
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

    shouldAskForNæringsinntekt(): boolean {
        const næringFomDato =
            this.state.næring &&
            this.state.næring.tidsperiode &&
            this.state.næring.tidsperiode.fom;

        return næringFomDato
            ? moment(næringFomDato, moment.ISO_8601) > date4YearsAgo
            : false;
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
            stillingsprosent,
            nyIArbeidslivet,
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
                renderFormButtons={true}
                submitLabel={getMessage(intl, 'leggtil')}
                cancelLabel={getMessage(intl, 'avbryt')}>
                <Block>
                    <NæringstypeSpørsmål
                        næringstyper={næringstyper || []}
                        onChange={this.toggleNæringstype}
                    />
                </Block>

                <Block
                    visible={
                        næringstyper !== undefined && næringstyper.length > 0
                    }>
                    <Input
                        label={getMessage(
                            intl,
                            'selvstendigNæringsdrivende.modal.navn'
                        )}
                        onChange={(e: InputChangeEvent) =>
                            this.updateNæring({
                                navnPåNæringen: e.target.value
                            })
                        }
                        value={navnPåNæringen || ''}
                    />
                </Block>

                <Block visible={navnPåNæringen !== undefined}>
                    <Input
                        label={getMessage(
                            intl,
                            'selvstendigNæringsdrivende.modal.orgnr'
                        )}
                        onChange={(e: InputChangeEvent) =>
                            this.updateNæring({
                                organisasjonsnummer: e.target.value
                            })
                        }
                        value={organisasjonsnummer || ''}
                    />
                </Block>

                <Block
                    visible={organisasjonsnummer !== undefined}
                    margin="none">
                    <TidsperiodeBolk
                        tidsperiode={tidsperiode || {}}
                        onChange={(v: TidsperiodeMedValgfriSluttdato) =>
                            this.updateNæring({ tidsperiode: v })
                        }
                        sluttdatoDisabled={pågående}
                        datoAvgrensninger={getAndreInntekterTidsperiodeAvgrensninger(
                            tidsperiode
                        )}
                    />
                </Block>

                <Block visible={organisasjonsnummer !== undefined}>
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

                <Block visible={this.shouldAskForNæringsinntekt()}>
                    <Input
                        label={getMessage(
                            intl,
                            'annenInntekt.spørsmål.næringsinntekt'
                        )}
                        onChange={(e: InputChangeEvent) => {
                            const næringPartial: NæringPartial = {
                                næringsinntekt: e.target.value
                            };
                            this.updateNæring(næringPartial);
                        }}
                        value={næringsinntekt || ''}
                    />
                </Block>

                <Block visible={organisasjonsnummer !== undefined}>
                    <ErNæringenRegistrertINorgeSpørsmål
                        registrertINorge={registrertINorge}
                        onChange={(v: boolean) =>
                            this.updateNæring({ registrertINorge: v })
                        }
                    />
                </Block>

                <Block visible={registrertINorge === false}>
                    <Landvelger
                        onChange={(v: string) =>
                            this.updateNæring({ registrertILand: v })
                        }
                        label={getMessage(
                            intl,
                            'selvstendigNæringsdrivende.modal.registrertILand'
                        )}
                        defaultValue={registrertILand}
                    />
                </Block>

                <Block
                    visible={
                        registrertINorge === true ||
                        (registrertINorge === false &&
                            registrertILand !== undefined)
                    }>
                    <Input
                        bredde="XS"
                        label={getMessage(
                            intl,
                            'selvstendigNæringsdrivende.modal.stillingsprosent'
                        )}
                        onChange={(e: InputChangeEvent) =>
                            this.updateNæring({
                                stillingsprosent: e.target.value
                            })
                        }
                        value={stillingsprosent || ''}
                        validators={getStillingsprosentRegler(
                            stillingsprosent || '',
                            intl
                        )}
                    />
                </Block>

                <Block
                    visible={
                        stillingsprosent !== undefined &&
                        tidsperiode &&
                        tidsperiode.fom &&
                        erMindreEnn4ÅrSidenOppstart(næring as Næring)
                    }>
                    <HeltNyIArbeidslivetSpørsmål
                        nyIArbeidslivet={nyIArbeidslivet}
                        onChange={(v: boolean) =>
                            this.updateNæring({
                                nyIArbeidslivet: v
                            })
                        }
                    />
                </Block>
                <Block
                    visible={
                        stillingsprosent !== undefined &&
                        tidsperiode &&
                        tidsperiode.fom &&
                        !erMindreEnn4ÅrSidenOppstart(næring as Næring)
                    }>
                    <VarigEndringAvNæringsinntektBolk
                        næring={næring as Næring}
                        onChange={(changedProps: NæringPartial) =>
                            this.updateNæring(changedProps)
                        }
                    />
                </Block>

                <Block visible={stillingsprosent !== undefined}>
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
                    />
                </Block>

                <Block
                    visible={
                        stillingsprosent !== undefined &&
                        harRegnskapsfører === false
                    }>
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
                    />
                </Block>

                <Block
                    visible={
                        harRegnskapsfører === false && harRevisor === true
                    }>
                    <KanInnhenteOpplysningerOmReviorSpørsmål
                        hentOpplysningerOmRevisor={
                            kanInnhenteOpplsyningerFraRevisor
                        }
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
