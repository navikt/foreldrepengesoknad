import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AnnenForelderPartial } from '../../../../types/s\u00F8knad/AnnenForelder';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { Checkbox } from 'nav-frontend-skjema';
import Søknad from '../../../../types/s\u00F8knad/S\u00F8knad';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import Spørsmål from 'common/components/sp\u00F8rsm\u00E5l/Sp\u00F8rsm\u00E5l';
import FødselsnummerPåAnnenForelderSpørsmål from '../../../../sp\u00F8rsm\u00E5l/F\u00F8dselsnummerP\u00E5AnnenForelderSp\u00F8rsm\u00E5l';
import NavnPåAnnenForelderSpørsmål from '../../../../sp\u00F8rsm\u00E5l/NavnP\u00E5AnnenForelderSp\u00F8rsm\u00E5l';
import Bolk from '../../../../components/layout/Bolk';
import PersonaliaBox from 'common/components/personalia-box/PersonaliaBox';

interface AnnenForelderUkjentProps {
    søknad: Søknad;
    annenForelder: AnnenForelderPartial;
    erFarEllerMedmor: boolean;
}

type Props = AnnenForelderUkjentProps & InjectedIntlProps & DispatchProps;

class AnnenForelderUkjent extends React.Component<Props> {
    render() {
        const { søknad, annenForelder, dispatch, intl } = this.props;
        const { kanIkkeOppgis, navn, fnr, utenlandskFnr } = annenForelder;
        const annenForelderPågåendeSaker = true;

        return (
            <React.Fragment>
                {!annenForelderPågåendeSaker && (
                    <Spørsmål
                        render={() => (
                            <NavnPåAnnenForelderSpørsmål
                                navn={navn}
                                kanIkkeOppgis={kanIkkeOppgis}
                                onChange={(
                                    annenForelderPartial: AnnenForelderPartial
                                ) => {
                                    dispatch(
                                        søknadActions.updateAnnenForelder(
                                            annenForelderPartial
                                        )
                                    );
                                }}
                            />
                        )}
                    />
                )}

                {annenForelderPågåendeSaker && (
                    <Bolk
                        render={() => (
                            <PersonaliaBox personalia={{ test: 'test' }} />
                        )}
                    />
                )}

                <Spørsmål
                    synlig={!kanIkkeOppgis}
                    render={() => (
                        <Checkbox
                            checked={søknad.aleneOmOmsorg || false}
                            label={getMessage(
                                intl,
                                'annenForelder.label.aleneOmOmsorg'
                            )}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        aleneOmOmsorg: e.target.checked
                                    })
                                )
                            }
                        />
                    )}
                />

                {
                    <Spørsmål
                        synlig={navn !== undefined && navn.length > 0}
                        render={() => (
                            <FødselsnummerPåAnnenForelderSpørsmål
                                fnr={fnr}
                                utenlandskFnr={utenlandskFnr}
                                onChange={(test) =>
                                    dispatch(
                                        søknadActions.updateAnnenForelder(test)
                                    )
                                }
                            />
                        )}
                    />
                }
            </React.Fragment>
        );
    }
}

export default injectIntl(AnnenForelderUkjent);
