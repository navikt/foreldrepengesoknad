import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Steg, { StegProps } from 'app/components/layout/Steg';
import FødtBarnPartial from './partials/FødtBarnPartial';
import UfødtBarnPartial from './partials/UfødtBarnPartial';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import Spørsmål from 'common/components/spørsmål/Spørsmål';

import RiktigBarnSpørsmål from '../../../spørsmål/RiktigBarnSpørsmål';
import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';
import { apiActionCreators } from '../../../redux/actions';

import { AppState } from '../../../redux/reducers';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { DispatchProps } from 'common/redux/types';
import Person, { SøkersBarn } from '../../../types/Person';
import { BarnPartial, FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import { HistoryProps } from '../../../types/common';
import Søker from '../../../types/søknad/Søker';

import { StegID } from '../../../util/stegConfig';
import { erFarEllerMedmor } from '../../../util/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface StateProps {
    barn: BarnPartial;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    person?: Person;
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
    stegProps: StegProps;
}

interface OwnProps {
    annetBarn: boolean;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnFødselSteg extends React.Component<Props, OwnProps> {
    static harValgtAnnetBarn(barn: BarnPartial, person?: Person): boolean {
        if (person === undefined) {
            return false;
        }
        return (
            person.barn.every(
                (søkersBarn: SøkersBarn) => !søkersBarn.checked
            ) && barn.erBarnetFødt !== undefined
        );
    }

    static harValgtSøkersBarn(person?: Person): boolean {
        if (person === undefined) {
            return false;
        }
        return person.barn.some((barn: SøkersBarn) => barn.checked);
    }

    constructor(props: Props) {
        super(props);
        const { person, barn } = props;
        this.state = {
            annetBarn: RelasjonTilBarnFødselSteg.harValgtAnnetBarn(barn, person)
        };
    }

    genererRelasjonTilBarn(søkersBarn: SøkersBarn, barn: FødtBarn): void {
        barn.fødselsdatoer.push(new Date(søkersBarn.fødselsdato));
        this.props.dispatch(
            søknadActions.updateBarn({
                erBarnetFødt: true,
                fødselsdatoer: barn.fødselsdatoer,
                antallBarn: barn.fødselsdatoer.length
            })
        );
    }

    slettRelasjonTilBarn(index: number, barn: FødtBarn): void {
        barn.fødselsdatoer.splice(index, 1);
        this.props.dispatch(
            søknadActions.updateBarn({
                fødselsdatoer: barn.fødselsdatoer,
                antallBarn: barn.fødselsdatoer.length,
                erBarnetFødt: barn.fødselsdatoer.length === 0 ? undefined : true
            })
        );
    }

    nullstillRelasjonerTilBarn(): void {
        this.props.dispatch(
            søknadActions.updateBarn({
                fødselsdatoer: [],
                antallBarn: 0,
                erBarnetFødt: undefined,
                termindato: undefined,
                terminbekreftelse: undefined,
                fødselsattest: undefined
            })
        );
    }

    toggleAnnetBarn(person: Person): void {
        const { dispatch } = this.props;
        if (RelasjonTilBarnFødselSteg.harValgtSøkersBarn(person)) {
            this.nullstillRelasjonerTilBarn();
        }

        this.setState({ annetBarn: !this.state.annetBarn }, () => {
            if (this.state.annetBarn === true) {
                person.barn.forEach(
                    (barn: SøkersBarn) => (barn.checked = false)
                );

                dispatch(
                    apiActionCreators.updatePerson({
                        barn: person.barn
                    })
                );
            }
        });
    }

    toggleSøkersBarn(søkersBarn: SøkersBarn, person: Person): void {
        if (this.state.annetBarn) {
            this.nullstillRelasjonerTilBarn();
        }

        this.setState({ annetBarn: false }, () => {
            const barn = this.props.barn as FødtBarn;
            const index = person.barn.indexOf(søkersBarn);
            person.barn[index].checked =
                person.barn[index].checked === true ? false : true;

            søkersBarn.checked === true
                ? this.genererRelasjonTilBarn(søkersBarn, barn)
                : this.slettRelasjonTilBarn(index, barn);
        });
    }

    handleSøkersBarnClick(fødselsnummer: string): void {
        const { person, dispatch } = this.props;
        if (person === undefined) {
            return;
        }

        const søkersBarn = person.barn.find(
            (barn) => barn.fnr === fødselsnummer
        );
        søkersBarn === undefined
            ? this.toggleAnnetBarn(person)
            : this.toggleSøkersBarn(søkersBarn, person);

        dispatch(
            apiActionCreators.updatePerson({
                barn: person.barn
            })
        );
    }

    render() {
        const {
            barn,
            søker,
            annenForelder,
            person,
            fødselsattest,
            terminbekreftelse,
            stegProps,
            dispatch
        } = this.props;

        if (person === undefined) {
            return null;
        }

        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <RiktigBarnSpørsmål
                            onChange={(fødselsnummer: string) =>
                                this.handleSøkersBarnClick(fødselsnummer)
                            }
                            søkersBarn={person.barn}
                            annetBarn={this.state.annetBarn}
                        />
                    )}
                />

                {this.state.annetBarn && (
                    <React.Fragment>
                        <Spørsmål
                            synlig={this.state.annetBarn}
                            render={() => (
                                <ErBarnetFødtSpørsmål
                                    erBarnetFødt={barn.erBarnetFødt}
                                    onChange={(erBarnetFødt: boolean) =>
                                        dispatch(
                                            søknadActions.updateBarn({
                                                erBarnetFødt
                                            })
                                        )
                                    }
                                />
                            )}
                        />
                        {barn.erBarnetFødt === true && (
                            <FødtBarnPartial
                                dispatch={dispatch}
                                barn={barn as FødtBarn}
                                fødselsattest={fødselsattest || []}
                            />
                        )}
                        {barn.erBarnetFødt === false && (
                            <UfødtBarnPartial
                                dispatch={dispatch}
                                barn={barn as UfødtBarn}
                                annenForelder={annenForelder}
                                søker={søker}
                                erFarEllerMedmor={erFarEllerMedmor(
                                    person.kjønn,
                                    søker.rolle
                                )}
                                terminbekreftelse={terminbekreftelse || []}
                            />
                        )}
                    </React.Fragment>
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const barn = state.søknad.barn;
    const person = state.api.person;
    const erBarnetFødt = barn && barn.erBarnetFødt === true;
    const harTerminbekreftelseDato =
        (barn as UfødtBarn).terminbekreftelseDato !== undefined;
    const fødselsattest = (barn as FødtBarn).fødselsattest;
    const terminbekreftelse = (barn as UfødtBarn).terminbekreftelse;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        renderFortsettKnapp:
            (RelasjonTilBarnFødselSteg.harValgtAnnetBarn(barn, person) &&
                ((erBarnetFødt && fødselsattest && fødselsattest.length > 0) ||
                    (harTerminbekreftelseDato &&
                        terminbekreftelse.length > 0))) ||
            (person &&
                person.barn.some(
                    (søkersBarn: SøkersBarn) => søkersBarn.checked
                )),
        history: props.history
    };

    return {
        søker: state.søknad.søker,
        annenForelder: state.søknad.annenForelder,
        person,
        barn,
        terminbekreftelse,
        fødselsattest,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnFødselSteg)
);
