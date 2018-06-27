import * as React from 'react';
import { connect } from 'react-redux';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { UfødtBarn } from '../../../types/søknad/Barn';
import Uttaksplan from 'uttaksplan/main/UttaksplanMain';
import { StegID } from '../../../util/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import { HistoryProps } from '../../../types/common';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { Periode } from 'uttaksplan/types';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import routeConfig from '../../../util/routeConfig';
import Person from '../../../types/Person';

interface UttaksplanStegProps {
    stegProps: StegProps;
    søknad: Søknad;
    person: Person;
    perioder: Periode[];
}

type Props = UttaksplanStegProps & HistoryProps & DispatchProps;

class UttaksplanSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.sendSøknadAndRedirect = this.sendSøknadAndRedirect.bind(this);
    }

    sendSøknadAndRedirect() {
        const { søknad, perioder, dispatch, history } = this.props;
        dispatch(
            apiActionCreators.sendSøknad({
                ...søknad,
                uttaksplan: [...(perioder || [])]
            })
        );
        history.push(`${routeConfig.APP_ROUTE_PREFIX}/søknad-sendt`);
    }

    render() {
        const { søknad, stegProps, person, dispatch } = this.props;
        const { annenForelder } = søknad;
        const barn = søknad.barn as UfødtBarn;
        const { søker } = søknad;

        return (
            <Steg
                {...stegProps}
                onFortsettKnappClick={this.sendSøknadAndRedirect}>
                <Uttaksplan
                    grunnlag={{
                        termindato: (barn as UfødtBarn).termindato,
                        erBarnetFødt: barn.erBarnetFødt,
                        annenForelder:
                            annenForelder.skalHaForeldrepenger ||
                            annenForelder.harRettPåForeldrepenger
                                ? {
                                      etternavn: '',
                                      fornavn: annenForelder.navn
                                  }
                                : undefined,
                        søker: {
                            erAleneOmOmsorg: søker.erAleneOmOmsorg,
                            etternavn: person.etternavn,
                            fornavn: person.fornavn,
                            mellomnavn: person.mellomnavn,
                            kjønn: person.kjønn,
                            rolle: søker.rolle,
                            situasjon: søknad.situasjon
                        },
                        antallBarn: søknad.barn.antallBarn || 0
                    }}
                    onChange={(p) =>
                        dispatch(
                            søknadActions.updateSøknad({
                                uttaksplan: p
                            })
                        )
                    }
                />
            </Steg>
        );
    }
}

export default connect((state: AppState, props: Props) => {
    const { søknad, uttaksplan } = state;
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        history
    };

    return {
        søknad,
        person: state.api.person,
        perioder: uttaksplan.uttaksplan.perioder,
        stegProps,
        ...props
    };
})(UttaksplanSteg);
