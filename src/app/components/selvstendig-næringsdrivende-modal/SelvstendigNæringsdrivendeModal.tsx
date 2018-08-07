import * as React from 'react';
import Modal, { ModalProps } from 'nav-frontend-modal';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Knapp, { Hovedknapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import getMessage from 'common/util/i18nUtils';
import Knapperad from 'common/components/knapperad/Knapperad';
import BEMHelper from 'common/util/bem';
import { Checkbox, Input } from 'nav-frontend-skjema';
import {
    Næring,
    NæringPartial,
    Næringsrelasjon,
    NæringsrelasjonPartial,
    Næringstype
} from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import NæringstypeSpørsmål from '../../spørsmål/NæringstypeSpørsmål';
import './selvstendigNæringsdrivendeModal.less';
import { TidsperiodeMedValgfriSluttdato } from 'common/types';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import Bolk from '../../../common/components/bolk/Bolk';
import ErNæringenRegistrertINorgeSpørsmål from '../../spørsmål/ErNæringenRegistrertINorgeSpørsmål';
import Landvelger from '../landvelger/Landvelger';
import { erMindreEnn4ÅrSidenOppstart } from '../../util/domain/næringer';
import HeltNyIArbeidslivetSpørsmål from '../../spørsmål/HeltNyIArbeidslivetSpørsmål';
import VarigEndringAvNæringsinntektBolk from '../../bolker/VarigEndringAvNæringsinntektBolk';
import NæringsrelasjonBolk from '../../bolker/NæringsrelasjonBolk';
import HarDuRegnskapsførerSpørsmål from '../../spørsmål/HarDuRegnskapsførerSpørsmål';
import HarDuRevisorSpørsmål from '../../spørsmål/HarDuRevisorSpørsmål';

export interface SelvstendigNæringsdrivendeModalProps extends ModalProps {
    næring?: Næring;
    editMode: boolean;
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

    updateNæring(næringProperties: NæringPartial) {
        this.setState({
            næring: {
                ...this.state.næring,
                ...næringProperties
            }
        });
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        const { onAdd, onEdit, editMode } = this.props;
        const { næring } = this.state;

        if (editMode) {
            onEdit(næring as Næring);
        } else {
            onAdd(næring as Næring);
        }
    }

    toggleNæringstype(næringstype: Næringstype) {
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
        const { intl, onRequestClose, ...modalProps } = this.props;
        const { næring } = this.state;
        const {
            navnPåNæringen,
            næringstyper,
            tidsperiode,
            pågående,
            organisasjonsnummer,
            registrertINorge,
            registrertILand,
            stillingsprosent,
            nyIArbeidslivet,
            harRegnskapsfører,
            harRevisor,
            regnskapsfører,
            revisor
        } = næring;

        const cls = BEMHelper('selvstendigNæringsdrivendeModal');

        return (
            <Modal
                className={cls.className}
                onRequestClose={onRequestClose}
                {...modalProps}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className={cls.element('title')}>
                        <FormattedMessage id="selvstendigNæringsdrivende.modal.tittel" />
                    </Undertittel>

                    <Spørsmål
                        render={() => (
                            <NæringstypeSpørsmål
                                næringstyper={næringstyper || []}
                                onChange={this.toggleNæringstype}
                            />
                        )}
                    />

                    <Bolk
                        render={() => (
                            <TidsperiodeBolk
                                tidsperiode={tidsperiode || {}}
                                onChange={(v: TidsperiodeMedValgfriSluttdato) =>
                                    this.updateNæring({ tidsperiode: v })
                                }
                                sluttdatoDisabled={pågående}
                            />
                        )}
                    />

                    <Spørsmål
                        render={() => (
                            <Checkbox
                                checked={pågående || false}
                                label={getMessage(
                                    intl,
                                    'annenInntekt.modal.pågående'
                                )}
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
                        )}
                    />

                    <Spørsmål
                        synlig={næringstyper !== undefined}
                        render={() => (
                            <Input
                                label={getMessage(
                                    intl,
                                    'selvstendigNæringsdrivende.modal.navn'
                                )}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    this.updateNæring({
                                        navnPåNæringen: e.target.value
                                    })
                                }
                                value={navnPåNæringen || ''}
                            />
                        )}
                    />

                    <Spørsmål
                        synlig={navnPåNæringen !== undefined}
                        render={() => (
                            <Input
                                label={getMessage(
                                    intl,
                                    'selvstendigNæringsdrivende.modal.orgnr'
                                )}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    this.updateNæring({
                                        organisasjonsnummer: e.target.value
                                    })
                                }
                                value={organisasjonsnummer || ''}
                            />
                        )}
                    />

                    <Spørsmål
                        synlig={organisasjonsnummer !== undefined}
                        render={() => (
                            <ErNæringenRegistrertINorgeSpørsmål
                                registrertINorge={registrertINorge}
                                onChange={(v: boolean) =>
                                    this.updateNæring({ registrertINorge: v })
                                }
                            />
                        )}
                    />

                    <Spørsmål
                        synlig={registrertINorge === false}
                        render={() => (
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
                        )}
                    />

                    <Spørsmål
                        synlig={
                            registrertINorge === true ||
                            (registrertINorge === false &&
                                registrertILand !== undefined)
                        }
                        render={() => (
                            <Input
                                bredde="XS"
                                label={getMessage(
                                    intl,
                                    'selvstendigNæringsdrivende.modal.stillingsprosent'
                                )}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                    this.updateNæring({
                                        stillingsprosent: e.target.value
                                    })
                                }
                                value={stillingsprosent || ''}
                            />
                        )}
                    />

                    <Bolk
                        synlig={
                            stillingsprosent !== undefined &&
                            tidsperiode &&
                            tidsperiode.fom &&
                            erMindreEnn4ÅrSidenOppstart(næring as Næring)
                        }
                        render={() => (
                            <React.Fragment>
                                <Spørsmål
                                    render={() => (
                                        <HeltNyIArbeidslivetSpørsmål
                                            nyIArbeidslivet={nyIArbeidslivet}
                                            onChange={(v: boolean) =>
                                                this.updateNæring({
                                                    nyIArbeidslivet: v
                                                })
                                            }
                                        />
                                    )}
                                />
                            </React.Fragment>
                        )}
                    />

                    <Bolk
                        synlig={
                            stillingsprosent !== undefined &&
                            tidsperiode &&
                            tidsperiode.fom &&
                            !erMindreEnn4ÅrSidenOppstart(næring as Næring)
                        }
                        render={() => (
                            <VarigEndringAvNæringsinntektBolk
                                næring={næring as Næring}
                                onChange={(changedProps: NæringPartial) =>
                                    this.updateNæring(changedProps)
                                }
                            />
                        )}
                    />

                    <Bolk
                        synlig={stillingsprosent !== undefined}
                        render={() => (
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
                                oppfølgingsspørsmålSynlig={
                                    harRegnskapsfører === true
                                }
                                næringsrelasjon={regnskapsfører || {}}
                                onChange={(v: NæringsrelasjonPartial) =>
                                    this.updateNæring({
                                        regnskapsfører: v as Næringsrelasjon
                                    })
                                }
                            />
                        )}
                    />

                    <Bolk
                        synlig={stillingsprosent !== undefined}
                        render={() => (
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

export default injectIntl(SelvstendigNæringsdrivendeModal);
