import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Steg, { StegProps } from 'app/components/steg/Steg';
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
import Barn, {
    BarnPartial,
    FødtBarn,
    UfødtBarn
} from '../../../types/søknad/Barn';
import { HistoryProps } from '../../../types/common';
import Søker from '../../../types/søknad/Søker';

import { StegID } from '../../../util/routing/stegConfig';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';

interface StateProps {
    person: Person;
    barn: Barn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
    stegProps: StegProps;
}

interface OwnProps {
    annetBarn: boolean;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class RelasjonTilBarnFødselSteg extends React.Component<Props, OwnProps> {
    static harValgtAnnetBarn(barn: BarnPartial, person: Person): boolean {
        return (
            person.barn.every(
                (søkersBarn: SøkersBarn) => !søkersBarn.checked
            ) && barn.erBarnetFødt !== undefined
        );
    }

    static harValgtSøkersBarn(person: Person): boolean {
        return person.barn.some((barn: SøkersBarn) => barn.checked);
    }

    constructor(props: Props) {
        super(props);
        const { person, barn } = props;
        this.state = {
            annetBarn:
                person && person.barn
                    ? RelasjonTilBarnFødselSteg.harValgtAnnetBarn(barn, person)
                    : false
        };
    }

    genererRelasjonTilBarn(checkedSøkersBarn: SøkersBarn): void {
        const barn = this.props.barn as FødtBarn;
        const fødselsdato = new Date(checkedSøkersBarn.fødselsdato);
        if (
            barn.fødselsdatoer.length === 0 ||
            barn.fødselsdatoer[0] < fødselsdato
        ) {
            barn.fødselsdatoer[0] = fødselsdato;
        }

        this.props.dispatch(
            søknadActions.updateBarn({
                erBarnetFødt: true,
                fødselsdatoer: barn.fødselsdatoer,
                antallBarn: this.props.person.barn.filter(
                    (søkersBarn) => søkersBarn.checked
                ).length
            })
        );
    }

    slettRelasjonTilBarn(): void {
        const barn = this.props.barn as FødtBarn;
        const person = this.props.person;
        const valgteBarn = person.barn.filter(
            (søkersBarn) => søkersBarn.checked
        );

        if (valgteBarn.length > 0) {
            barn.fødselsdatoer[0] = new Date(
                valgteBarn
                    .map((e) => e.fødselsdato)
                    .sort()
                    .reverse()[0]
            );
        } else {
            barn.fødselsdatoer.splice(0, 1);
        }

        this.props.dispatch(
            søknadActions.updateBarn({
                fødselsdatoer: barn.fødselsdatoer,
                antallBarn: valgteBarn.length,
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
            const index = person.barn.indexOf(søkersBarn);
            person.barn[index].checked =
                person.barn[index].checked === true ? false : true;

            søkersBarn.checked === true
                ? this.genererRelasjonTilBarn(søkersBarn)
                : this.slettRelasjonTilBarn();
        });
    }

    handleSøkersBarnClick(fødselsnummer: string): void {
        const { person } = this.props;
        const søkersBarn = person.barn.find(
            (barn) => barn.fnr === fødselsnummer
        );
        søkersBarn === undefined
            ? this.toggleAnnetBarn(person)
            : this.toggleSøkersBarn(søkersBarn, person);
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
                    synlig={person.barn !== undefined && person.barn.length > 0}
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

                {(this.state.annetBarn || person.barn === undefined) && (
                    <React.Fragment>
                        <Spørsmål
                            synlig={
                                this.state.annetBarn ||
                                person.barn === undefined
                            }
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
    const person = state.api.person as Person;
    const barn = state.søknad.barn;
    const fødselsattest = (barn as FødtBarn).fødselsattest;
    const terminbekreftelse = (barn as UfødtBarn).terminbekreftelse;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        renderFortsettKnapp: true,
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
