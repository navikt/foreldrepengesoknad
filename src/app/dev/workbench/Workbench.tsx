import * as React from 'react';
import DocumentTitle from 'react-document-title';
import Søknad from '../../types/søknad/Søknad';
import Uttaksoppsummering, { Stønadskontouttak } from '../../components/uttaksoppsummering/Uttaksoppsummering';
import { Periode, Periodetype, StønadskontoType, TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { DispatchProps } from 'common/redux/types';
import Applikasjonsside from '../../connected-components/sider/Applikasjonsside';
import Periodeliste from '../../components/periodeliste/Periodeliste';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import Block from 'common/components/block/Block';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';
import NyPeriodeBolk from '../../bolker/ny-periode-bolk/NyPeriodeBolk';
import { Forelder } from 'common/types';
import { opprettUttaksperioderToForeldreEttBarnMor } from '../../util/uttaksplan/forslag/toForeldreEttBarnMor';

interface StateProps {
    søknad: Søknad;
}

type Props = StateProps & DispatchProps;

const tilgjengligStønadskontoer: TilgjengeligStønadskonto[] = [
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dager: 15
    },
    {
        konto: StønadskontoType.Mødrekvote,
        dager: 75
    }
];

const perioder = opprettUttaksperioderToForeldreEttBarnMor(new Date(), 13, tilgjengligStønadskontoer);

const mockUttak: Stønadskontouttak[] = [
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dagerGjenstående: 10
    },
    {
        konto: StønadskontoType.Mødrekvote,
        dagerGjenstående: 0,
        forelder: Forelder.MOR
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dagerGjenstående: 0
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dagerGjenstående: 10,
        forelder: Forelder.FARMEDMOR
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
            navnMor: 'Amalie',
            navnFarMedmor: 'Henrik'
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
