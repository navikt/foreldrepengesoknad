import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import AnnenForelderPersonaliaPartial from './partials/AnnenForelderPersonaliaPartial';
import AnnenForelderErKjentPartial from './partials/AnnenForelderErKjentPartial';

import Steg, { StegProps } from '../../../components/steg/Steg';
import { StegID } from '../../../util/routing/stegConfig';

import { AppState } from '../../../redux/reducers';
import AnnenForelder, {
    RegistrertAnnenForelder
} from '../../../types/søknad/AnnenForelder';
import { BarnPartial, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../../types/common';
import Person from '../../../types/Person';
import Søker from '../../../types/søknad/Søker';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import isAvailable from '../isAvailable';
import { annenForelderErGyldig } from '../../../util/validation/steg/annenForelder';

interface StateProps {
    person: Person;
    barn: BarnPartial;
    søker: Søker;
    registrertAnnenForelder: RegistrertAnnenForelder;
    annenForelder: AnnenForelder;
    visInformasjonVedOmsorgsovertakelse: boolean;
    stegProps: StegProps;
}

type Props = StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class AnnenForelderSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    shouldRenderAnnenForelderErKjentPartial() {
        const { annenForelder, registrertAnnenForelder } = this.props;
        return (
            (annenForelder.navn && annenForelder.fnr) || registrertAnnenForelder
        );
    }

    render() {
        const {
            person,
            barn,
            søker,
            annenForelder,
            registrertAnnenForelder,
            visInformasjonVedOmsorgsovertakelse,
            dispatch,
            stegProps
        } = this.props;

        if (person) {
            const erSøkerFarEllerMedmor = erFarEllerMedmor(
                person.kjønn,
                søker.rolle
            );

            return (
                <Steg {...stegProps}>
                    <React.Fragment>
                        <AnnenForelderPersonaliaPartial />
                        {this.shouldRenderAnnenForelderErKjentPartial() && (
                            <AnnenForelderErKjentPartial
                                barn={barn as ForeldreansvarBarn}
                                annenForelder={annenForelder}
                                søker={søker}
                                registrertAnnenForelder={
                                    registrertAnnenForelder
                                }
                                erFarEllerMedmor={erSøkerFarEllerMedmor}
                                visInformasjonVedOmsorgsovertakelse={
                                    visInformasjonVedOmsorgsovertakelse
                                }
                                dispatch={dispatch}
                            />
                        )}
                    </React.Fragment>
                </Steg>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const person = state.api.person as Person;
    const registrertAnnenForelder = state.api
        .registrertAnnenForelder as RegistrertAnnenForelder;
    const barn = state.søknad.barn as ForeldreansvarBarn;
    const søker = state.søknad.søker;
    const annenForelder = state.søknad.annenForelder;

    const stegProps = {
        id: StegID.ANNEN_FORELDER,
        renderFortsettKnapp: annenForelderErGyldig(
            state.søknad,
            person,
            registrertAnnenForelder
        ),
        history: props.history,
        isAvailable: isAvailable(StegID.ANNEN_FORELDER, state)
    };

    return {
        stegProps,
        person,
        registrertAnnenForelder,
        barn,
        søker,
        annenForelder,
        visInformasjonVedOmsorgsovertakelse:
            barn.omsorgsovertakelse && barn.omsorgsovertakelse.length > 0
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(
    injectIntl(AnnenForelderSteg)
);
