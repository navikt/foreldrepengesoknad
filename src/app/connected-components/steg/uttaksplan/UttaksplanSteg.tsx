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
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import { mapAttachmentTilSøknadsvedlegginfo } from '../../../util/vedleggUtil';
import { Attachment } from 'storage/attachment/types/Attachment';
import routeConfig from '../../../util/routeConfig';

interface UttaksplanStegProps {
    stegProps: StegProps;
    søknad: Søknad;
    perioder: Periode[];
    attachments: Attachment[];
}

type Props = UttaksplanStegProps & HistoryProps & DispatchProps;

class UttaksplanSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.sendSøknadAndRedirect = this.sendSøknadAndRedirect.bind(this);
    }

    sendSøknadAndRedirect() {
        const { attachments, søknad, perioder, dispatch, history } = this.props;
        const vedlegg = (attachments || []).map((a: Attachment) =>
            mapAttachmentTilSøknadsvedlegginfo(a)
        );
        dispatch(
            apiActionCreators.sendSøknad({
                ...søknad,
                uttaksplan: [...(perioder || [])],
                vedlegg
            })
        );
        history.push(`${routeConfig.APP_ROUTE_PREFIX}/søknad-sendt`);
    }

    render() {
        const { søknad, perioder, stegProps, dispatch } = this.props;
        const { annenForelder } = søknad;
        const barn = søknad.barn as UfødtBarn;

        return (
            <Steg
                {...stegProps}
                onFortsettKnappClick={this.sendSøknadAndRedirect}>
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
    const { søknad, attachments, uttaksplan } = state;
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN,
        renderFortsettKnapp: true,
        history
    };

    return {
        søknad,
        attachments,
        perioder: uttaksplan.periode.perioder,
        stegProps,
        ...props
    };
})(UttaksplanSteg);
