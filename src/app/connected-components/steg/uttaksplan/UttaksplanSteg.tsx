import * as React from 'react';
import { connect } from 'react-redux';
import { StegID } from '../../../util/routing/stegConfig';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Person from '../../../types/Person';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import isAvailable from '../util/isAvailable';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Uttaksplanlegger from '../../../components/uttaksplanlegger/Uttaksplanlegger';
import Block from 'common/components/block/Block';
import Spinner from 'nav-frontend-spinner';

interface StateProps {
    stegProps: StegProps;
    søknad: Søknad;
    person: Person;
    perioder: Periode[];
    isLoadingTilgjengeligeStønadskontoer: boolean;
}

type Props = StateProps & DispatchProps & SøkerinfoProps & HistoryProps;

class UttaksplanSteg extends React.Component<Props> {
    render() {
        const { søknad, søkerinfo, isLoadingTilgjengeligeStønadskontoer, dispatch } = this.props;
        const navn = {
            navnForelder1: søkerinfo.person.fornavn,
            navnForelder2: søknad.annenForelder ? søknad.annenForelder.navn : undefined
        };

        return (
            <Steg {...this.props.stegProps}>
                {isLoadingTilgjengeligeStønadskontoer === true ? (
                    <Spinner type="XXL" />
                ) : (
                    <React.Fragment>
                        <Veilederinfo maxWidth="30">
                            Her velger du hvordan du ønsker å legge opp ditt uttak.
                        </Veilederinfo>
                        <Block>
                            <Uttaksplanlegger
                                søkersituasjon={søknad.situasjon}
                                barn={søknad.barn}
                                uttaksplan={søknad.uttaksplan}
                                onAdd={(periode) => dispatch(søknadActions.uttaksplanAddPeriode(periode))}
                                onRequestReset={() => dispatch(søknadActions.uttaksplanSetPerioder([]))}
                                {...navn}
                            />
                        </Block>
                    </React.Fragment>
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: HistoryProps & SøkerinfoProps): StateProps => {
    const { søknad } = state;
    const { søkerinfo, history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        renderFormTag: false,
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN, søknad, søkerinfo)
    };

    return {
        søknad,
        person: props.søkerinfo.person,
        stegProps,
        perioder: søknad.uttaksplan,
        isLoadingTilgjengeligeStønadskontoer: state.api.isLoadingTilgjengeligeStønadskontoer
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(UttaksplanSteg);
