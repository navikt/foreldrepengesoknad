import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { Kjønn, Søkerinfo } from 'app/types/Søkerinfo';
import FetchState, { FetchStatus } from 'app/types/FetchState';

import { ApiActionTypes } from 'app/redux/types/ApiAction';
import { getData, getErrorCode } from 'app/utils/fromFetchState';
import { State } from 'app/redux/store';
import Action from 'app/redux/types/Action';
import Environment from 'app/Environment';
import Feil from 'app/components/Feil';
import FormikWrapper from '../formik-wrapper/FormikWrapper';
import getMessage from 'common/util/i18nUtils';
import Kvittering from 'app/types/Kvittering';
import Loading from 'app/components/loading/Loading';
import SøknadRoutes from '../søknad-routes/SøknadRoutes';

interface Props {
    søkerinfo: FetchState<Søkerinfo>;
    kvittering: FetchState<Kvittering>;
    requestSøkerinfo: () => void;
}

const Svangerskapspengesøknad: React.FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { søkerinfo, kvittering, requestSøkerinfo } = props;

    useEffect(() => {
        if (søkerinfo.status === FetchStatus.UNFETCHED) {
            requestSøkerinfo();
        }

        if (getErrorCode(søkerinfo) === 401 || getErrorCode(søkerinfo) === 403) {
            redirectToLogin();
        }
    });

    const redirectToLogin = () => {
        window.location.href = Environment.LOGIN_URL + '?redirect=' + window.location.href;
    };

    const søker = getData(søkerinfo, {}).søker;
    const isLoading =
        søkerinfo.status === FetchStatus.IN_PROGRESS ||
        søkerinfo.status === FetchStatus.UNFETCHED ||
        kvittering.status === FetchStatus.IN_PROGRESS ||
        getErrorCode(søkerinfo) === 401;

    if (isLoading) {
        return <Loading />;
    } else if (søker && søker.kjønn === Kjønn.MANN) {
        return (
            <Feil
                tittel={getMessage(intl, 'feilside.mann.tittel')}
                melding={getMessage(intl, 'feilside.mann.melding')}
            />
        );
    } else if (kvittering.status === FetchStatus.FAILURE && getErrorCode(kvittering) !== 401) {
        return (
            <Feil
                tittel={getMessage(intl, 'feilside.innsending.tittel')}
                melding={
                    <FormattedMessage
                        id={'feilside.innsending.melding'}
                        values={{
                            a: (msg: any) => (
                                <a
                                    href="https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Teknisk+brukerstotte/hjelp-til-personbruker?kap=398749"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="lenke"
                                >
                                    {msg}
                                </a>
                            ),
                        }}
                    />
                }
            />
        );
    } else if (søkerinfo.status === FetchStatus.FAILURE && getErrorCode(søkerinfo) !== 401) {
        return (
            <Feil
                tittel={getMessage(intl, 'feilside.ikkeTilgjengelig.tittel')}
                melding={getMessage(intl, 'feilside.ikkeTilgjengelig.melding')}
            />
        );
    } else {
        return (
            <FormikWrapper
                contentRenderer={(formikProps) => (
                    <SøknadRoutes
                        formikProps={formikProps}
                        harSendtSøknad={kvittering.status !== FetchStatus.UNFETCHED}
                    />
                )}
            />
        );
    }
};

const mapStateToProps = (state: State) => ({
    søkerinfo: state.api.søkerinfo,
    kvittering: state.api.kvittering,
});

const mapDispatchToProps = (dispatch: (action: Action) => void) => ({
    requestSøkerinfo: () => {
        dispatch({ type: ApiActionTypes.GET_SØKERINFO_REQUEST });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Svangerskapspengesøknad);
