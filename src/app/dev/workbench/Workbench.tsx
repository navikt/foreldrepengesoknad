import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Søknad from '../../types/søknad/Søknad';
import { opprettUttaksperioderToForeldreEttBarn } from '../../util/uttaksplan/forslag/toForeldreEttBarn';
import Uttaksoppsummering, { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { getPermisjonsregler } from '../../util/uttaksplan/permisjonsregler';
import { Periode, Periodetype, StønadskontoType } from '../../types/uttaksplan/periodetyper';
import { DispatchProps } from 'common/redux/types';
import Applikasjonsside from '../../connected-components/sider/Applikasjonsside';
import Periodeliste from '../../components/periodeliste/Periodeliste';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import NyPeriodeBolk from '../../bolker/ny-periode-bolk/NyPeriodeBolk';
import { Forelder } from 'common/types';
import UttakIkon from '../../components/uttaksplan-ikon/ikoner/UttakIkon';

interface StateProps {
    søknad: Søknad;
}

type Props = StateProps & DispatchProps;

const perioder = opprettUttaksperioderToForeldreEttBarn(new Date(), '100', 13, 13, getPermisjonsregler());

const mockUttak: Stønadskontouttak[] = [
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dagerGjennstående: 10
    },
    {
        konto: StønadskontoType.Mødrekvote,
        dagerGjennstående: 0,
        forelder: Forelder.FORELDER_1
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dagerGjennstående: 0
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dagerGjennstående: 10,
        forelder: Forelder.FORELDER_2
    }
];

interface State {
    periodetype?: Periodetype;
}

class Workbench extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleOnSubmit(periode: Periode) {
        const { dispatch } = this.props;
        dispatch(søknadActionCreators.uttaksplanAddPeriode(periode));
    }

    render() {
        const navn = {
            navnForelder1: 'Amalie',
            navnForelder2: 'Henrik'
        };
        return (
            <Applikasjonsside visSpråkvelger={true} margin={false}>
                <DocumentTitle title="Workbench" />
                <div className="m-gray-block">
                    <Block margin="m">
                        <Periodeliste perioder={perioder} {...navn} />
                    </Block>

                    <NyPeriodeBolk onSubmit={this.handleOnSubmit} />

                    <Block margin="l">
                        <Uttaksoppsummering uttak={mockUttak} {...navn} />
                    </Block>
                </div>
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    søknad: state.søknad
});

export default connect(mapStateToProps)(Workbench);
