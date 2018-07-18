import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';

import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Bolk from '../../../../../common/components/bolk/Bolk';
import FødselsnummerSpørsmål from '../../../../spørsmål/FødselsnummerSpørsmål';
import NavnPåAnnenForelderSpørsmål from '../../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import Søker from '../../../../types/søknad/Søker';
import PersonaliaBox from 'common/components/personalia-box/PersonaliaBox';

interface AnnenForelderPersonaliaPartialProps {
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    registrertAnnenForelder: any;
    erFarEllerMedmor: boolean;
}

type Props = AnnenForelderPersonaliaPartialProps &
    InjectedIntlProps &
    DispatchProps;

class AnnenForelderPersonaliaPartial extends React.Component<Props> {
    onKanIkkeOppgis() {
        const { dispatch } = this.props;
        const kanIkkeOppgis = this.props.annenForelder.kanIkkeOppgis
            ? false
            : true;

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
            annenForelder,
            registrertAnnenForelder,
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
                            label={getMessage(
                                intl,
                                'annenForelder.spørsmål.kanOppgis'
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => this.onKanIkkeOppgis()}
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
                            annenForelder={annenForelder}
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

export default injectIntl(AnnenForelderPersonaliaPartial);
