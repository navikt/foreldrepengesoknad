import * as React from 'react';
import { connect } from 'react-redux';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { UfødtBarn, FødtBarn } from '../../../types/søknad/Barn';
import Uttaksplan from 'uttaksplan/main/UttaksplanMain';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { Periode } from 'uttaksplan/types';
import Person from '../../../types/Person';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    person: Person;
    perioder: Periode[];
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

class UttaksplanSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { søknad, stegProps, person, dispatch } = this.props;
        const annenForelder =
            søknad.annenForelder.skalHaForeldrepenger || søknad.annenForelder.harRettPåForeldrepenger
                ? {
                      etternavn: '',
                      fornavn: søknad.annenForelder.navn
                  }
                : undefined;

        const barn = søknad.barn;
        const { søker } = søknad;

        return (
            <Steg {...stegProps}>
                <Uttaksplan
                    grunnlag={{
                        familiehendelsedato: (barn as UfødtBarn).termindato || (barn as FødtBarn).fødselsdatoer[0],
                        erBarnetFødt: barn.erBarnetFødt,
                        erDeltPermisjon: annenForelder !== undefined,
                        annenForelder,
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

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps): StateProps => {
    const { søknad, uttaksplan } = state;
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        history
    };

    return {
        søknad,
        person: props.søkerinfo.person,
        perioder: uttaksplan.uttaksplan.perioder,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
