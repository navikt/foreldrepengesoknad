import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Steg, { StegProps } from 'app/components/steg/Steg';
import FødtBarnPartial from './partials/FødtBarnPartial';
import UfødtBarnPartial from './partials/UfødtBarnPartial';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';

import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';

import { AppState } from '../../../redux/reducers';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { DispatchProps } from 'common/redux/types';
import Person, {
    RegistrertBarn,
    VelgbartRegistrertBarn
} from '../../../types/Person';
import Barn, { FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import Søker from '../../../types/søknad/Søker';

import { StegID } from '../../../util/routing/stegConfig';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import BarnBolk from '../../../bolker/BarnBolk';
import { guid } from 'nav-frontend-js-utils';
import { findDateMostDistantInPast } from '../../../util/dates/dates';
import isAvailable from '../isAvailable';
import { barnErGyldig } from '../../../util/validation/steg/barn';
import { Søkersituasjon } from '../../../types/søknad/Søknad';
import { harAktivtArbeidsforhold } from '../../../util/domain/arbeidsforhold';
import DateValues from '../../../util/validation/values';
import Block from 'common/components/block/Block';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';

interface RelasjonTilBarnFødselStegProps {
    person?: Person;
    barn: Barn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    registrerteBarn?: RegistrertBarn[];
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
    stegProps: StegProps;
    situasjon: Søkersituasjon;
    skalLasteOppTerminbekreftelse: boolean;
}

interface RelasjonTilBarnFødselStegState {
    gjelderAnnetBarn: boolean;
    valgbartRegistrertBarn: VelgbartRegistrertBarn[];
}

type Props = RelasjonTilBarnFødselStegProps &
    InjectedIntlProps &
    DispatchProps &
    SøkerinfoProps &
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
    ): RelasjonTilBarnFødselStegState {
        const harRegistrerteBarn =
            state &&
            state.valgbartRegistrertBarn &&
            state.valgbartRegistrertBarn.length > 0;
        if (harRegistrerteBarn) {
            return state;
        }

        const { registrerteBarn } = props;
        return {
            gjelderAnnetBarn: (state && state.gjelderAnnetBarn) || false,
            valgbartRegistrertBarn: (registrerteBarn || []).map(
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
            valgbartRegistrertBarn: []
        });

        this.findBarnInState = this.findBarnInState.bind(this);
        this.updateBarnInState = this.updateBarnInState.bind(this);
        this.updateGjelderAnnetBarnInState = this.updateGjelderAnnetBarnInState.bind(
            this
        );
        this.hasCheckedRegistrertBarn = this.hasCheckedRegistrertBarn.bind(
            this
        );
    }

    findBarnInState(id: string): VelgbartRegistrertBarn | undefined {
        const { valgbartRegistrertBarn } = this.state;
        return valgbartRegistrertBarn.find(
            (registrertBarn: VelgbartRegistrertBarn) => id === registrertBarn.id
        );
    }

    updateFødselsdatoInReduxState() {
        const { dispatch } = this.props;
        const { valgbartRegistrertBarn } = this.state;

        const valgteBarn = valgbartRegistrertBarn.filter((b) => b.checked);
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
            const { valgbartRegistrertBarn } = this.state;
            const index = valgbartRegistrertBarn.indexOf(registrertBarn);
            valgbartRegistrertBarn[index].checked = !valgbartRegistrertBarn[
                index
            ].checked;
            this.setState(
                {
                    valgbartRegistrertBarn
                },
                this.updateFødselsdatoInReduxState
            );
        }
    }

    updateGjelderAnnetBarnInState() {
        const { gjelderAnnetBarn, valgbartRegistrertBarn } = this.state;
        this.setState(
            {
                gjelderAnnetBarn: !gjelderAnnetBarn,
                valgbartRegistrertBarn: valgbartRegistrertBarn.map(
                    (barn: VelgbartRegistrertBarn) => ({
                        ...barn,
                        checked: false
                    })
                )
            },
            this.updateFødselsdatoInReduxState
        );
    }

    hasCheckedRegistrertBarn() {
        const { valgbartRegistrertBarn } = this.state;
        return valgbartRegistrertBarn.some(
            (barn: VelgbartRegistrertBarn) => barn.checked === true
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
            situasjon,
            stegProps,
            skalLasteOppTerminbekreftelse,
            dispatch
        } = this.props;

        if (person === undefined) {
            return null;
        }

        const { valgbartRegistrertBarn, gjelderAnnetBarn } = this.state;
        return (
            <Steg
                {...stegProps}
                renderFortsettKnapp={
                    this.hasCheckedRegistrertBarn() ||
                    barnErGyldig(barn, situasjon, skalLasteOppTerminbekreftelse)
                }>
                <Block
                    visible={valgbartRegistrertBarn.length > 0}
                    margin="none">
                    <BarnBolk
                        gjelderAnnetBarn={gjelderAnnetBarn}
                        registrerteBarn={valgbartRegistrertBarn}
                        onRegistrertBarnChange={(id: string) =>
                            this.updateBarnInState(id)
                        }
                        onAnnetBarnChange={this.updateGjelderAnnetBarnInState}
                    />
                </Block>
                <Block
                    margin="none"
                    hasChildBlocks={true}
                    visible={
                        gjelderAnnetBarn || valgbartRegistrertBarn.length === 0
                    }>
                    <Block>
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
                    </Block>
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
                            skalLasteOppTerminbekreftelse={
                                skalLasteOppTerminbekreftelse
                            }
                            søker={søker}
                            erFarEllerMedmor={erFarEllerMedmor(
                                person.kjønn,
                                søker.rolle
                            )}
                            terminbekreftelse={terminbekreftelse || []}
                        />
                    )}
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (
    state: AppState,
    props: Props
): RelasjonTilBarnFødselStegProps => {
    const { person, registrerteBarn, arbeidsforhold } = props.søkerinfo;
    const barn = state.søknad.barn;
    const fødselsattest = (barn as FødtBarn).fødselsattest;
    const terminbekreftelse = (barn as UfødtBarn).terminbekreftelse;
    const skalLasteOppTerminbekreftelse: boolean =
        barn.erBarnetFødt === false &&
        !harAktivtArbeidsforhold(arbeidsforhold, DateValues.today.toDate());

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        history: props.history,
        isAvailable: isAvailable(
            StegID.RELASJON_TIL_BARN_FØDSEL,
            state.søknad,
            props.søkerinfo
        )
    };

    return {
        søker: state.søknad.søker,
        situasjon: state.søknad.situasjon,
        annenForelder: state.søknad.annenForelder,
        person,
        registrerteBarn,
        barn,
        terminbekreftelse,
        fødselsattest,
        skalLasteOppTerminbekreftelse,
        stegProps
    };
};

export default connect<RelasjonTilBarnFødselStegProps, {}, {}>(mapStateToProps)(
    injectIntl(RelasjonTilBarnFødselSteg)
);
