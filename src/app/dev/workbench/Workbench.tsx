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
import { Knapp } from 'nav-frontend-knapper';
import Knapperad from 'common/components/knapperad/Knapperad';
import NyPeriodeForm from '../../components/ny-periode-form/NyPeriodeForm';
import søknadActionCreators from '../../redux/actions/søknad/søknadActionCreators';

interface StateProps {
    søknad: Søknad;
}

type Props = StateProps & DispatchProps;

const perioder = opprettUttaksperioderToForeldreEttBarn(new Date(), '100%', 13, 13, getPermisjonsregler());

const mockUttak: Stønadskontouttak[] = [
    {
        konto: StønadskontoType.ForeldrepengerFørFødsel,
        dagerGjennstående: 10
    },
    {
        konto: StønadskontoType.Mødrekvote,
        dagerGjennstående: 0,
        forelder: 'forelder1'
    },
    {
        konto: StønadskontoType.Fellesperiode,
        dagerGjennstående: 0
    },
    {
        konto: StønadskontoType.Fedrekvote,
        dagerGjennstående: 10,
        forelder: 'forelder2'
    }
];

interface State {
    periodetype?: Periodetype;
    formIsOpen: boolean;
}

class Workbench extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.openForm = this.openForm.bind(this);
        this.openNyUttaksperiodeForm = this.openNyUttaksperiodeForm.bind(this);
        this.openNyUtsettelsesperiodeForm = this.openNyUtsettelsesperiodeForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.renderPeriodeForm = this.renderPeriodeForm.bind(this);

        this.state = {
            formIsOpen: false
        };
    }

    openForm(periodetype: Periodetype) {
        this.setState({
            formIsOpen: true,
            periodetype
        });
    }

    openNyUtsettelsesperiodeForm() {
        this.openForm(Periodetype.Utsettelse);
    }

    openNyUttaksperiodeForm() {
        this.openForm(Periodetype.Uttak);
    }

    closeForm() {
        this.setState({
            formIsOpen: false,
            periodetype: undefined
        });
    }

    handleOnSubmit(periode: Periode) {
        const { dispatch } = this.props;
        dispatch(søknadActionCreators.uttaksplanAddPeriode(periode));
    }

    renderPeriodeForm() {
        const { periodetype, formIsOpen } = this.state;
        if (formIsOpen && periodetype !== undefined) {
            return <NyPeriodeForm periodetype={periodetype} onSubmit={this.handleOnSubmit} onCancel={this.closeForm} />;
        }
        return null;
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
                    <Block margin="l">
                        <Periodeliste perioder={perioder} {...navn} />
                        {this.renderPeriodeForm()}
                    </Block>
                    <Block margin="l">
                        <Uttaksoppsummering uttak={mockUttak} {...navn} />
                    </Block>
                    <Block>
                        <Knapperad>
                            <Knapp onClick={this.openNyUtsettelsesperiodeForm} htmlType="button">
                                Utsett ditt uttak
                            </Knapp>
                            <Knapp onClick={this.openNyUttaksperiodeForm} htmlType="button">
                                Legg til periode med foreldrepenger
                            </Knapp>
                        </Knapperad>
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
