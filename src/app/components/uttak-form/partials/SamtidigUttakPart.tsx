import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';
import Block from 'common/components/block/Block';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';
import { UttakSpørsmålKeys, UttakSpørsmålVisibility } from '../uttakFormConfig';
import { trimNumberFromInput } from 'common/util/numberUtils';
import { Perioden } from 'app/util/uttaksplan/Perioden';
import { Periode, Uttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { RecursivePartial } from 'app/types/Partial';
import getMessage from 'common/util/i18nUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { finnAntallDagerÅTrekke } from 'app/util/uttaksPlanStatus';
import Input from 'common/components/skjema/wrappers/Input';
import { getStillingsprosentRegler } from 'app/util/validation/stillingsprosent';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';
import { NavnISøknaden } from 'app/selectors/types';

export interface OwnProps {
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
    ønskerSamtidigUttak: boolean | undefined;
    periode: RecursivePartial<Uttaksperiode>;
    visibility: UttakSpørsmålVisibility;
    navn: NavnISøknaden;
    erFlerbarnssøknad: boolean;
    søkerErMor: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class SamtidigUttakPart extends React.Component<Props> {
    handleSamtidigUttakProsentChange(samtidigUttakProsent: string) {
        const { onChange } = this.props;

        onChange({
            samtidigUttakProsent: trimNumberFromInput(samtidigUttakProsent)
        });
    }

    render() {
        const {
            onChange,
            ønskerSamtidigUttak,
            intl,
            visibility,
            periode,
            navn,
            erFlerbarnssøknad,
            søkerErMor
        } = this.props;

        const ønskerFlerbarnsuker = periode.ønskerFlerbarnsdager;
        const morFlerbarnssøknad = søkerErMor && erFlerbarnssøknad;
        const uttaksdager = Perioden(periode as Periode).getAntallUttaksdager();
        const varighet =
            periode.samtidigUttakProsent && uttaksdager
                ? getMessage(intl, 'samtidig.uttak.varighet', {
                      varighet: getVarighetString(finnAntallDagerÅTrekke(uttaksdager, periode as Periode), intl)
                  })
                : undefined;

        return (
            <>
                <Block margin={ønskerSamtidigUttak ? 'xs' : 'm'}>
                    <SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål
                        onChange={(øs) => onChange({ ønskerSamtidigUttak: øs })}
                        ønskerSamtidigUttak={ønskerSamtidigUttak}
                        navnAnnenForelder={navn.annenForelder.fornavn}
                    />
                </Block>
                <Block visible={ønskerSamtidigUttak === true} margin="none">
                    <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                        <VeilederpanelInnhold
                            messages={[
                                {
                                    type: 'normal',
                                    contentIntlKey:
                                        ønskerFlerbarnsuker || morFlerbarnssøknad
                                            ? 'egenDelUttakForm.samtidigUttak.flerBarnsuker.veiledertekst'
                                            : 'egenDelUttakForm.samtidigUttak.veiledertekst',
                                    values: {
                                        link: (
                                            <Lenke href={lenker.fleksibeltuttak}>
                                                <FormattedMessage id="egenDelUttakForm.samtidigUttak.veiledertekst.lenke" />
                                            </Lenke>
                                        ),
                                        navn: navn.annenForelder.fornavn,
                                        navnMor: navn.mor.fornavn,
                                        navnFar: navn.farMedmor.fornavn
                                    }
                                }
                            ]}
                        />
                    </Veilederpanel>
                </Block>
                <Block visible={visibility.isVisible(UttakSpørsmålKeys.samtidigUttakProsent)}>
                    <Block margin={varighet ? 'xxs' : 'none'}>
                        <Input
                            name="utsettelse-samtidigUttakProsent"
                            bredde="XS"
                            label={getMessage(intl, 'samtidigUttakProsent')}
                            onChange={(v: string) =>
                                onChange({
                                    samtidigUttakProsent: trimNumberFromInput(v)
                                })
                            }
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                this.handleSamtidigUttakProsentChange(e.target.value)
                            }
                            value={periode.samtidigUttakProsent || ''}
                            maxLength={3}
                            validators={getStillingsprosentRegler(true, periode.samtidigUttakProsent || 0, intl)}
                        />
                    </Block>
                </Block>
            </>
        );
    }
}

export default injectIntl(SamtidigUttakPart);
