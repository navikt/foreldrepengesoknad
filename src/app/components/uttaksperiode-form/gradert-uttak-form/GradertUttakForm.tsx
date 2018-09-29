import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Input from 'common/components/skjema/wrappers/Input';
import Block from 'common/components/block/Block';
import { getFloatFromString } from 'common/util/numberUtils';
import { InputChangeEvent } from '../../../types/dom/Events';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import JaNeiSpørsmål from '../../ja-nei-spørsmål/JaNeiSpørsmål';
import { Uttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { GradertUttakSpørsmålKeys, getGradertUttakSpørsmålVisibility } from './gradertUttakFormVisibility';
import { RecursivePartial } from '../../../types/Partial';
import SkalDereHaGradertUttakSamtidigSpørsmål from '../../../spørsmål/SkalDereHaGradertUttakSamtidigSpørsmål';
import HvorSkalDuJobbeSpørsmål from '../../../spørsmål/HvorSkalDuJobbeSpørsmål';

interface OwnProps {
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
    periode: RecursivePartial<Uttaksperiode>;
    annenForelderHarRettPåForeldrepenger: boolean;
    erAleneOmOmsorg: boolean;
    arbeidsforhold?: Arbeidsforhold[];
}

type Props = OwnProps & InjectedIntlProps;

class GradertUttakForm extends React.Component<Props> {
    handleStillingsprosentChange(stillingsprosent: string) {
        const { onChange } = this.props;
        const pst = getFloatFromString(stillingsprosent);
        onChange({
            stillingsprosent: pst ? pst.toFixed(1) : stillingsprosent
        });
    }

    render() {
        const {
            erAleneOmOmsorg,
            annenForelderHarRettPåForeldrepenger,
            periode,
            arbeidsforhold,
            intl,
            onChange
        } = this.props;

        const visibility = getGradertUttakSpørsmålVisibility(
            periode as Uttaksperiode,
            annenForelderHarRettPåForeldrepenger,
            erAleneOmOmsorg
        );

        return (
            <>
                <Block>
                    <JaNeiSpørsmål
                        navn="ønskerDuGradertUttak"
                        spørsmål={getMessage(intl, 'uttaksperiode.gradert.skalDuHarGradering')}
                        valgtVerdi={periode.gradert}
                        onChange={(ønskerGradering) => onChange({ gradert: ønskerGradering })}
                    />
                </Block>

                <Block visible={visibility.isVisible(GradertUttakSpørsmålKeys.stillingsprosent)}>
                    <Input
                        name="utsettelse-stillingsprosent"
                        bredde="XS"
                        label={getMessage(intl, 'stillingsprosent')}
                        onChange={(e: InputChangeEvent) =>
                            onChange({
                                stillingsprosent: e.target.value
                            })
                        }
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                            this.handleStillingsprosentChange(e.target.value)
                        }
                        value={periode.stillingsprosent || ''}
                        maxLength={4}
                    />
                </Block>

                <Block visible={visibility.isVisible(GradertUttakSpørsmålKeys.hvorSkalDuJobbe)}>
                    <HvorSkalDuJobbeSpørsmål
                        arbeidsforhold={arbeidsforhold || []}
                        onChange={(orgnr, selvstendigNæringsdrivendeEllerFrilans) =>
                            onChange({
                                orgnr,
                                selvstendigNæringsdrivendeEllerFrilans
                            })
                        }
                        frilansEllerSelvstendig={periode.selvstendigNæringsdrivendeEllerFrilans}
                        valgtArbeidsforhold={periode.orgnr}
                    />
                </Block>
                <Block visible={visibility.isVisible(GradertUttakSpørsmålKeys.samtidigGradertUttak)}>
                    <SkalDereHaGradertUttakSamtidigSpørsmål
                        onChange={(ønskerSamtidigUttak: boolean) => {
                            onChange({ ønskerSamtidigUttak });
                        }}
                        samtidigGradertUttak={periode.ønskerSamtidigUttak}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(GradertUttakForm);
