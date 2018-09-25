import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Input from 'common/components/skjema/wrappers/Input';
import Block from 'common/components/block/Block';
import { getFloatFromString } from 'common/util/numberUtils';
import { InputChangeEvent } from '../../../types/dom/Events';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import JaNeiSpørsmål from '../../ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';
import { Uttaksperiode } from '../../../types/uttaksplan/periodetyper';
import { GradertUttakSpørsmålVisibility, GradertUttakSpørsmålKeys } from './visibility';
import { RecursivePartial } from '../../../types/Partial';
import SkalDereHaGradertUttakSamtidigSpørsmål from '../../../sp\u00F8rsm\u00E5l/SkalDereHaGradertUttakSamtidigSp\u00F8rsm\u00E5l';
import HvorSkalDuJobbeSpørsmål from '../../../sp\u00F8rsm\u00E5l/HvorSkalDuJobbeSp\u00F8rsm\u00E5l';

interface OwnProps {
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
    periode: RecursivePartial<Uttaksperiode>;
    arbeidsforhold?: Arbeidsforhold[];
    visibility: GradertUttakSpørsmålVisibility;
}

type Props = OwnProps & InjectedIntlProps;

class GraderingFormPart extends React.Component<Props> {
    handleStillingsprosentChange(stillingsprosent: string) {
        const { onChange } = this.props;
        const pst = getFloatFromString(stillingsprosent);
        onChange({
            stillingsprosent: pst ? pst.toFixed(1) : stillingsprosent
        });
    }

    render() {
        const { visibility, periode, arbeidsforhold, intl, onChange } = this.props;

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

                <Block visible={visibility.isVisible(GradertUttakSpørsmålKeys.samtidigGradertUttak)}>
                    <SkalDereHaGradertUttakSamtidigSpørsmål
                        onChange={(ønskerSamtidigUttak: boolean) => {
                            onChange({ ønskerSamtidigUttak });
                        }}
                        samtidigGradertUttak={periode.ønskerSamtidigUttak}
                    />
                </Block>

                <Block visible={visibility.isVisible(GradertUttakSpørsmålKeys.hvorSkalDuJobbe)}>
                    <HvorSkalDuJobbeSpørsmål
                        arbeidsforhold={arbeidsforhold || []}
                        onChange={(orgnrValue: string, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean) =>
                            onChange({
                                orgnr: orgnrValue,
                                skalJobbeSomFrilansEllerSelvstendigNæringsdrivende
                            })
                        }
                        valgtArbeidsforhold={periode.orgnr}
                    />
                </Block>
            </>
        );
    }
}

// const mapStateToProps = (state: AppState): StateProps => {
//     return {
//         søknad: state.søknad
//     };
// };

export default injectIntl(GraderingFormPart);
