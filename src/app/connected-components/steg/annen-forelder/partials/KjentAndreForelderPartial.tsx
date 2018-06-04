import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { ForeldreansvarBarn } from '../../../../types/s\u00F8knad/Barn';
import { AnnenForelderPartial } from '../../../../types/søknad/AnnenForelder';
import { Skjemadata } from '../../../../types/s\u00F8knad/S\u00F8knad';
import RettPåForeldrepengerSpørsmål from '../../../../sp\u00F8rsm\u00E5l/RettP\u00E5ForeldrepengerSp\u00F8rsm\u00E5l';
import ErMorUførSpørsmål from '../../../../sp\u00F8rsm\u00E5l/ErMorUf\u00F8rSp\u00F8rsm\u00E5l';

import søknadActions from '../../../../redux/actions/søknad/søknadActionCreators';
import { DispatchProps } from 'common/redux/types';
import Spørsmål from 'common/components/sp\u00F8rsm\u00E5l/Sp\u00F8rsm\u00E5l';
import ErDenAndreForelderenInformertSpørsmål from '../../../../sp\u00F8rsm\u00E5l/ErDenAndreForelderenInformertSp\u00F8rsm\u00E5l';
import SkalFarEllerMedmorHaForeldrepengerSpørsmål from '../../../../sp\u00F8rsm\u00E5l/SkalFarEllerMedmorHaForeldrepengerSp\u00F8rsm\u00E5l';
import DatoInput from 'common/components/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import Søknadsvedlegg from '../../../../components/s\u00F8knadsvedlegg/S\u00F8knadsvedlegg';

interface AnnenForelderKjentProps {
    barn: ForeldreansvarBarn;
    annenForelder: AnnenForelderPartial;
    erFarEllerMedmor: boolean;
    søknad: Skjemadata;
}

type Props = AnnenForelderKjentProps & InjectedIntlProps & DispatchProps;

class KjentAndreForelderPartial extends React.Component<Props> {
    render() {
        const {
            barn,
            annenForelder,
            søknad,
            erFarEllerMedmor,
            dispatch,
            intl
        } = this.props;
        return (
            <React.Fragment>
                <Spørsmål
                    render={() => (
                        <RettPåForeldrepengerSpørsmål
                            harAnnenForelderRettPåForeldrepenger={
                                annenForelder.harRettPåForeldrepenger
                            }
                            onChange={(harRettPåForeldrepenger: boolean) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder({
                                        harRettPåForeldrepenger
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={
                        annenForelder.harRettPåForeldrepenger === false &&
                        erFarEllerMedmor
                    }
                    render={() => (
                        <ErMorUførSpørsmål
                            erMorUfør={søknad.erMorUfør}
                            onChange={(erMorUfør: boolean) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        erMorUfør
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={
                        søknad.aleneOmOmsorg !== true &&
                        annenForelder.harRettPåForeldrepenger !== undefined
                    }
                    render={() => (
                        <ErDenAndreForelderenInformertSpørsmål
                            erInformertOmSøknaden={
                                annenForelder.erInformertOmSøknaden
                            }
                            onChange={(erInformertOmSøknaden: boolean) =>
                                dispatch(
                                    søknadActions.updateAnnenForelder({
                                        erInformertOmSøknaden
                                    })
                                )
                            }
                        />
                    )}
                />

                <Spørsmål
                    synlig={
                        !erFarEllerMedmor &&
                        søknad.aleneOmOmsorg === true &&
                        (søknad.erMorUfør !== undefined ||
                            annenForelder.harRettPåForeldrepenger === true)
                    }
                    render={() => (
                        <SkalFarEllerMedmorHaForeldrepengerSpørsmål
                            skalFarEllerMedmorHaForeldrepenger={
                                annenForelder.skalFarEllerMedmorHaForeldrepenger
                            }
                            onChange={(
                                skalFarEllerMedmorHaForeldrepenger: boolean
                            ) => {
                                dispatch(
                                    søknadActions.updateAnnenForelder({
                                        skalFarEllerMedmorHaForeldrepenger
                                    })
                                );
                            }}
                        />
                    )}
                />

                {erFarEllerMedmor && (
                    <React.Fragment>
                        <Spørsmål
                            synlig={søknad.aleneOmOmsorg !== undefined}
                            render={() => (
                                <DatoInput
                                    id="omsorgsovertakelseDato"
                                    label={getMessage(
                                        intl,
                                        'omsorgsovertakelseDato.spørsmål'
                                    )}
                                    onChange={(foreldreansvarsdato: Date) => {
                                        dispatch(
                                            søknadActions.updateBarn({
                                                foreldreansvarsdato
                                            })
                                        );
                                    }}
                                    dato={barn.foreldreansvarsdato}
                                />
                            )}
                        />

                        <Spørsmål
                            animert={true}
                            synlig={barn.foreldreansvarsdato !== undefined}
                            render={() => (
                                <Søknadsvedlegg type="omsorgsovertakelse" />
                            )}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default injectIntl(KjentAndreForelderPartial);
