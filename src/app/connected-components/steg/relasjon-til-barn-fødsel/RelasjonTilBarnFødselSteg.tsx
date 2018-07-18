import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Steg, { StegProps } from 'app/components/steg/Steg';
import FødtBarnPartial from './partials/FødtBarnPartial';
import UfødtBarnPartial from './partials/UfødtBarnPartial';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';
import Spørsmål from 'common/components/spørsmål/Spørsmål';

import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';

import { AppState } from '../../../redux/reducers';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { DispatchProps } from 'common/redux/types';
import Person, {
    RegistrertBarn,
    VelgbartRegistrertBarn
} from '../../../types/Person';
import Barn, { FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import { HistoryProps } from '../../../types/common';
import Søker from '../../../types/søknad/Søker';

import { StegID } from '../../../util/routing/stegConfig';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Bolk from 'common/components/bolk/Bolk';
import BarnBolk from '../../../bolker/BarnBolk';
import { guid } from 'nav-frontend-js-utils';
import { findDateMostDistantInPast } from '../../../util/dates/dates';
import isAvailable from '../../../util/routing/isAvailable';
import { barnErGyldig } from '../../../util/validation/barn';

interface RelasjonTilBarnFødselStegProps {
    person: Person;
    barn: Barn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
    stegProps: StegProps;
}

interface RelasjonTilBarnFødselStegState {
    gjelderAnnetBarn: boolean;
    registrerteBarn: VelgbartRegistrertBarn[];
}

type Props = RelasjonTilBarnFødselStegProps &
    InjectedIntlProps &
    DispatchProps &
    HistoryProps;

class RelasjonTilBarnFødselSteg extends React.Component<
    Props,
    RelasjonTilBarnFødselStegState
> {
    static getDerivedStateFromProps(
        props: Props,
        state: RelasjonTilBarnFødselStegState
    ) {
        return RelasjonTilBarnFødselSteg.buildStateFromProps(props, state);
    }

    static buildStateFromProps(
        props: Props,
        state: RelasjonTilBarnFødselStegState
    ) {
        const harRegistrerteBarn =
            state && state.registrerteBarn && state.registrerteBarn.length > 0;
        if (harRegistrerteBarn) {
            return state;
        }

        const { person } = props;
        return {
            gjelderAnnetBarn: (state && state.gjelderAnnetBarn) || false,
            registrerteBarn: (person.registrerteBarn || []).map(
                (registrertBarn: RegistrertBarn) => {
                    const velgbartBarn = registrertBarn as VelgbartRegistrertBarn;
                    velgbartBarn.id = guid();
                    return velgbartBarn;
                }
            )
        };
    }

    constructor(props: Props) {
        super(props);

        this.state = RelasjonTilBarnFødselSteg.buildStateFromProps(props, {
            gjelderAnnetBarn: false,
            registrerteBarn: []
        });

        this.findBarnInState = this.findBarnInState.bind(this);
        this.updateBarnInState = this.updateBarnInState.bind(this);
        this.updateGjelderAnnetBarnInState = this.updateGjelderAnnetBarnInState.bind(
            this
        );
    }

    findBarnInState(id: string): VelgbartRegistrertBarn | undefined {
        const { registrerteBarn } = this.state;
        return registrerteBarn.find(
            (registrertBarn: VelgbartRegistrertBarn) => id === registrertBarn.id
        );
    }

    updateFødselsdatoInReduxState() {
        const { dispatch } = this.props;
        const { registrerteBarn } = this.state;

        const valgteBarn = registrerteBarn.filter((b) => b.checked);
        const fødselsdatoMostDistantInPast = findDateMostDistantInPast(
            valgteBarn.map((b) => b.fødselsdato)
        );

        dispatch(
            søknadActions.updateBarn({
                antallBarn:
                    valgteBarn.length > 0 ? valgteBarn.length : undefined,
                erBarnetFødt: valgteBarn.length > 0 ? true : undefined,
                fødselsdatoer: fødselsdatoMostDistantInPast
                    ? [fødselsdatoMostDistantInPast]
                    : []
            })
        );
    }

    updateBarnInState(id: string) {
        const registrertBarn = this.findBarnInState(id);
        if (registrertBarn) {
            const { registrerteBarn } = this.state;
            const index = registrerteBarn.indexOf(registrertBarn);
            registrerteBarn[index].checked = !registrerteBarn[index].checked;
            this.setState(
                {
                    registrerteBarn
                },
                this.updateFødselsdatoInReduxState
            );
        }
    }

    updateGjelderAnnetBarnInState() {
        const { gjelderAnnetBarn, registrerteBarn } = this.state;
        this.setState(
            {
                gjelderAnnetBarn: !gjelderAnnetBarn,
                registrerteBarn: registrerteBarn.map(
                    (barn: VelgbartRegistrertBarn) => ({
                        ...barn,
                        checked: false
                    })
                )
            },
            this.updateFødselsdatoInReduxState
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

        const { registrerteBarn, gjelderAnnetBarn } = this.state;

        return (
            <Steg {...stegProps}>
                <Bolk
                    synlig={registrerteBarn.length > 0}
                    render={() => (
                        <BarnBolk
                            gjelderAnnetBarn={gjelderAnnetBarn}
                            registrerteBarn={registrerteBarn}
                            onRegistrertBarnChange={(id: string) =>
                                this.updateBarnInState(id)
                            }
                            onAnnetBarnChange={
                                this.updateGjelderAnnetBarnInState
                            }
                        />
                    )}
                />

                {(gjelderAnnetBarn || registrerteBarn.length === 0) && (
                    <Bolk
                        render={() => (
                            <React.Fragment>
                                <Spørsmål
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
                                        terminbekreftelse={
                                            terminbekreftelse || []
                                        }
                                    />
                                )}
                            </React.Fragment>
                        )}
                    />
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (
    state: AppState,
    props: Props
): RelasjonTilBarnFødselStegProps => {
    const person = state.api.person as Person;
    const barn = state.søknad.barn;
    const fødselsattest = (barn as FødtBarn).fødselsattest;
    const terminbekreftelse = (barn as UfødtBarn).terminbekreftelse;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        renderFortsettKnapp: barnErGyldig(barn, state.søknad.situasjon),
        history: props.history,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_FØDSEL, state)
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

export default connect<RelasjonTilBarnFødselStegProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnFødselSteg)
);
