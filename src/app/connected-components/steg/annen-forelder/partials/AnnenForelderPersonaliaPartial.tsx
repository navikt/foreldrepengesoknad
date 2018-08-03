import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { Checkbox } from 'nav-frontend-skjema';

import AnnenForelder, {
    AnnenForelderPartial
} from '../../../../types/søknad/AnnenForelder';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Bolk from '../../../../../common/components/bolk/Bolk';
import FødselsnummerSpørsmål from '../../../../spørsmål/FødselsnummerSpørsmål';
import NavnPåAnnenForelderSpørsmål from '../../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import PersonaliaBox from 'common/components/personalia-box/PersonaliaBox';
import { AppState } from '../../../../redux/reducers';
import Søker from '../../../../types/søknad/Søker';
import Person from '../../../../types/Person';
import { Søkersituasjon } from '../../../../types/søknad/Søknad';

interface AnnenForelderPersonaliaPartialProps {
    søker: Søker;
    annenForelder: AnnenForelder;
    registrertAnnenForelder: any;
    søkersFødselsnummer: string;
    erFarEllerMedmor: boolean;
    situasjon: Søkersituasjon;
}

type Props = AnnenForelderPersonaliaPartialProps &
    InjectedIntlProps &
    DispatchProps;

class AnnenForelderPersonaliaPartial extends React.Component<Props> {
    onKanIkkeOppgis() {
        const { dispatch } = this.props;
        const kanIkkeOppgis = !this.props.annenForelder.kanIkkeOppgis;

        dispatch(
            søknadActions.updateAnnenForelder({
                navn: undefined,
                fnr: undefined,
                utenlandskFnr: undefined,
                kanIkkeOppgis,
                harRettPåForeldrepenger: undefined
            })
        );
        dispatch(
            søknadActions.updateSøker({
                erAleneOmOmsorg: kanIkkeOppgis
            })
        );
    }

    render() {
        const {
            søker,
            søkersFødselsnummer,
            annenForelder,
            registrertAnnenForelder,
            situasjon,
            dispatch,
            intl
        } = this.props;
        const { kanIkkeOppgis, navn } = annenForelder;

        return (
            <React.Fragment>
                <Bolk
                    tittel="Informasjon om den andre forelderen"
                    synlig={registrertAnnenForelder !== undefined}
                    render={() => (
                        <PersonaliaBox personalia={registrertAnnenForelder} />
                    )}
                />

                <Bolk
                    synlig={registrertAnnenForelder === undefined}
                    render={() => (
                        <NavnPåAnnenForelderSpørsmål
                            navn={navn}
                            kanIkkeOppgis={kanIkkeOppgis}
                            onChange={(
                                annenForelderPartial: AnnenForelderPartial
                            ) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(
                                        annenForelderPartial
                                    )
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    render={() => (
                        <Checkbox
                            checked={kanIkkeOppgis || false}
                            label={
                                situasjon === Søkersituasjon.ADOPSJON
                                    ? getMessage(
                                          intl,
                                          'annenForelder.spørsmål.adoptererAlene'
                                      )
                                    : getMessage(
                                          intl,
                                          'annenForelder.spørsmål.kanOppgis'
                                      )
                            }
                            onChange={() => this.onKanIkkeOppgis()}
                        />
                    )}
                />

                <Spørsmål
                    synlig={!kanIkkeOppgis}
                    render={() => (
                        <Checkbox
                            checked={søker.erAleneOmOmsorg || false}
                            label={getMessage(
                                intl,
                                'annenForelder.aleneOmOmsorg'
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        erAleneOmOmsorg: e.target.checked
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={navn !== undefined}
                    render={() => (
                        <FødselsnummerSpørsmål
                            kanIkkeOppgis={kanIkkeOppgis}
                            søkersFødselsnummer={søkersFødselsnummer}
                            fnr={annenForelder.fnr}
                            utenlandskFnr={annenForelder.utenlandskFnr}
                            bostedsland={annenForelder.bostedsland}
                            onChange={(
                                annenForelderPartial: AnnenForelderPartial
                            ) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder(
                                        annenForelderPartial
                                    )
                                )
                            }
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (
    state: AppState
): AnnenForelderPersonaliaPartialProps => ({
    søker: state.søknad.søker,
    søkersFødselsnummer: (state.api.person as Person).fnr,
    annenForelder: state.søknad.annenForelder,
    registrertAnnenForelder: undefined,
    erFarEllerMedmor: true,
    situasjon: state.søknad.situasjon
});

export default connect<AnnenForelderPersonaliaPartialProps, {}, {}>(
    mapStateToProps
)(injectIntl(AnnenForelderPersonaliaPartial));
