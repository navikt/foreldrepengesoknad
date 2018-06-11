import * as React from 'react';
import { connect } from 'react-redux';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import { UfødtBarn } from '../../../types/søknad/Barn';
import Uttaksplan from 'uttaksplan/main/UttaksplanMain';
import { StegID } from '../../../util/stegConfig';
import { default as Steg, StegProps } from '../../../components/layout/Steg';
import { AppState } from '../../../redux/reducers';
import { HistoryProps } from '../../../types/common';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import { Periode } from 'uttaksplan/types';

interface UttaksplanStegProps {
    stegProps: StegProps;
    søknad: Søknad;
    perioder: Periode[];
}

type Props = UttaksplanStegProps & HistoryProps & DispatchProps;

class UttaksplanSteg extends React.Component<Props> {
    render() {
        const { søknad, perioder, stegProps, dispatch } = this.props;
        const { annenForelder } = søknad;
        const barn = søknad.barn as UfødtBarn;

        return (
            <Steg {...stegProps}>
                <Uttaksplan
                    termindato={(barn as UfødtBarn).termindato}
                    navnForelder1="Mor"
                    navnForelder2={
                        annenForelder && annenForelder.navn
                            ? annenForelder.navn
                            : 'Forelder 2'
                    }
                    perioder={perioder}
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
    const { søknad } = state;
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        history
    };

    return {
        søknad,
        stegProps,
        ...props,
        perioder: søknad.uttaksplan
    };
})(UttaksplanSteg);
