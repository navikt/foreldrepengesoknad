import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål from '../../../spørsmål/SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';
import { UttakSpørsmålKeys, UttakSpørsmålVisibility } from '../uttakFormConfig';
import { getFloatFromString } from 'common/util/numberUtils';
import { Perioden } from 'app/util/uttaksplan/Perioden';
import { Periode, Uttaksperiode, StønadskontoType } from 'app/types/uttaksplan/periodetyper';
import { RecursivePartial } from 'app/types/Partial';
import getMessage from 'common/util/i18nUtils';
import { getVarighetString } from 'common/util/intlUtils';
import { finnAntallDagerÅTrekke } from 'app/util/uttaksPlanStatus';
import Input from 'common/components/skjema/wrappers/Input';
import { getStillingsprosentRegler } from 'app/util/validation/stillingsprosent';

export interface OwnProps {
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
    ønskerSamtidigUttak: boolean | undefined;
    periode: RecursivePartial<Uttaksperiode>;
    visibility: UttakSpørsmålVisibility;
    navnAnnenForelder: string;
}

type Props = OwnProps & InjectedIntlProps;

class SamtidigUttakPart extends React.Component<Props> {
    handleSamtidigUttakProsentChange(samtidigUttakProsent: string) {
        const { onChange } = this.props;
        const pst = getFloatFromString(samtidigUttakProsent);
        onChange({
            samtidigUttakProsent: pst ? pst.toFixed(1) : samtidigUttakProsent
        });
    }

    render() {
        const { onChange, ønskerSamtidigUttak, intl, visibility, periode, navnAnnenForelder } = this.props;

        const erFlerbarnsUker = periode.konto === StønadskontoType.Flerbarnsdager;
        const pst = getFloatFromString(periode.samtidigUttakProsent || '');
        const uttaksdager = Perioden(periode as Periode).getAntallUttaksdager();
        const varighet =
            pst && uttaksdager
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
                    />
                </Block>
                <Block visible={ønskerSamtidigUttak === true} margin="none">
                    <Veilederinfo>
                        <FormattedMessage
                            id={
                                erFlerbarnsUker
                                    ? 'egenDelUttakForm.samtidigUttak.flernBarnsuker.veiledertekst'
                                    : 'egenDelUttakForm.samtidigUttak.veiledertekst'
                            }
                            values={{
                                link: (
                                    <Lenke href={lenker.fleksibeltuttak}>
                                        <FormattedMessage id="egenDelUttakForm.samtidigUttak.veiledertekst.lenke" />
                                    </Lenke>
                                ),
                                navn: navnAnnenForelder
                            }}
                        />
                    </Veilederinfo>
                </Block>
                <Block visible={visibility.isVisible(UttakSpørsmålKeys.samtidigUttakProsent)}>
                    <Block margin={varighet ? 'xxs' : 'none'}>
                        <Input
                            name="utsettelse-samtidigUttakProsent"
                            bredde="XS"
                            label={getMessage(intl, 'samtidigUttakProsent')}
                            onChange={(v: string) =>
                                onChange({
                                    samtidigUttakProsent: v
                                })
                            }
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                this.handleSamtidigUttakProsentChange(e.target.value)
                            }
                            value={periode.samtidigUttakProsent || ''}
                            maxLength={4}
                            validators={getStillingsprosentRegler(true, periode.samtidigUttakProsent || '', intl)}
                        />
                    </Block>
                    {varighet && <div className="comment">{varighet}</div>}
                </Block>
            </>
        );
    }
}

export default injectIntl(SamtidigUttakPart);
