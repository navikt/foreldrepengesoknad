import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchProps } from '../../../redux/types';
import { AppState } from '../../../redux/reducers';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Applikasjonsside from '../../sider/Applikasjonsside';
import SøkerrolleSpørsmål from '../../../spørsmål/SøkerrolleSpørsmål';
import { getSøkerrollerForBruker } from '../../../util/søkerrollerUtils';
import { StegID } from '../../../util/stegConfig';
import { søknadStegPath } from '../../steg/StegRoutes';
import FortsettKnapp from '../../../components/fortsett-knapp/FortsettKnapp';
import getMessage from '../../../util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BekreftCheckboksPanel from 'nav-frontend-skjema/lib/bekreft-checkboks-panel';
import { HistoryProps } from '../../../types/common';

export interface StateProps {
    situasjon?: Søkersituasjon;
    visSpørsmålOmSøkerrolle?: boolean;
    harGodkjentVilkår: boolean;
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
    nesteStegRoute?: StegID;
}

export type Props = DispatchProps &
    StateProps &
    HistoryProps &
    InjectedIntlProps;

class Inngangsside extends React.Component<Props, {}> {
    render() {
        const {
            roller,
            situasjon,
            rolle,
            harGodkjentVilkår,
            history,
            visSpørsmålOmSøkerrolle,
            dispatch,
            nesteStegRoute,
            intl
        } = this.props;

        return (
            <Applikasjonsside>
                <Spørsmål
                    render={() => (
                        <SøkersituasjonSpørsmål
                            situasjon={situasjon}
                            onChange={(value) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        situasjon: value
                                    })
                                )
                            }
                        />
                    )}
                />
                <Spørsmål
                    synlig={visSpørsmålOmSøkerrolle !== undefined}
                    render={() =>
                        visSpørsmålOmSøkerrolle ? (
                            <SøkerrolleSpørsmål
                                rolle={rolle}
                                roller={roller}
                                onChange={(nyRolle: SøkerRolle) =>
                                    dispatch(
                                        søknadActions.updateSøknad({
                                            søkerRolle: nyRolle
                                        })
                                    )
                                }
                            />
                        ) : (
                            undefined
                        )
                    }
                />

                <Spørsmål
                    synlig={rolle !== undefined}
                    animert={false}
                    render={() => (
                        <BekreftCheckboksPanel
                            checked={harGodkjentVilkår}
                            label={getMessage(intl, 'samtykke')}
                            onChange={() => {
                                dispatch(
                                    søknadActions.updateSøknad({
                                        harGodkjentVilkår: !harGodkjentVilkår
                                    })
                                );
                            }}
                        />
                    )}
                />

                {harGodkjentVilkår === true && (
                    <FortsettKnapp
                        history={history}
                        location={søknadStegPath(nesteStegRoute)}>
                        {getMessage(intl, 'begynnsøknad.label')}
                    </FortsettKnapp>
                )}
            </Applikasjonsside>
        );
    }
}

const resolveNesteSteg = (state: AppState): StegID | undefined => {
    const { situasjon } = state.søknad;
    if (situasjon === Søkersituasjon.STEBARN) {
        return StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON;
    } else if (situasjon === Søkersituasjon.ADOPSJON) {
        return StegID.RELASJON_TIL_BARN_ADOPSJON;
    } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        return StegID.RELASJON_TIL_BARN_FORELDREANSVAR;
    } else if (situasjon === Søkersituasjon.FØDSEL) {
        return StegID.RELASJON_TIL_BARN_FØDSEL;
    }
    return;
};

const mapStateToProps = (state: AppState): StateProps => {
    const kjønn = state.api.person ? state.api.person.kjønn : undefined;
    const situasjon = state.søknad.situasjon;
    const roller =
        kjønn && situasjon
            ? getSøkerrollerForBruker(kjønn, situasjon)
            : undefined;

    return {
        visSpørsmålOmSøkerrolle: roller !== undefined,
        rolle: state.søknad.søkerRolle,
        harGodkjentVilkår: state.søknad.harGodkjentVilkår,
        nesteStegRoute: resolveNesteSteg(state),
        situasjon,
        roller
    };
};

export default connect(mapStateToProps)(injectIntl(Inngangsside));
