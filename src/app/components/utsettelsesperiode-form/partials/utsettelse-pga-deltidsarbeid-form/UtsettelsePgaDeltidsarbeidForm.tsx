import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { InputChangeEvent } from '../../../../types/dom/Events';
import Input from 'common/components/skjema/wrappers/Input';
import Block from 'common/components/block/Block';
import { StønadskontoType, TilgjengeligStønadskonto } from '../../../../types/uttaksplan/periodetyper';
import { getFloatFromString } from 'common/util/numberUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers/index';
import Søknad from '../../../../types/søknad/Søknad';
import { getVelgbareStønadskontotyper } from '../../../../util/uttaksplan/aktuelleStønadskontoer';
import SkalDereHaGradertUttakSamtidigSpørsmål from '../../../../spørsmål/SkalDereHaGradertUttakSamtidigSpørsmål';
import visibility from './visibility';
import HvorSkalDuJobbeSpørsmål from '../../../../spørsmål/HvorSkalDuJobbeSpørsmål';
import Arbeidsforhold from '../../../../types/Arbeidsforhold';

export interface UtsettelsePgaDeltidsarbeidSkjemadata {
    stillingsprosent?: string;
    konto?: StønadskontoType;
    samtidigGradertUttak?: boolean;
    orgnr?: string;
    skalJobbeSomFrilansEllerSelvstendigNæringsdrivende?: boolean;
}

interface UtsettelsePgaArbeidFormProps {
    onChange: (v: UtsettelsePgaDeltidsarbeidSkjemadata) => void;
    skjemadata: UtsettelsePgaDeltidsarbeidSkjemadata;
    arbeidsforhold: Arbeidsforhold[];
}

interface StateProps {
    søknad: Søknad;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
}

type Props = UtsettelsePgaArbeidFormProps & StateProps & InjectedIntlProps;

class UtsettelsePgaDeltidsarbeidForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleStillingsprosentBlur = this.handleStillingsprosentBlur.bind(this);
    }

    handleStillingsprosentBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { onChange } = this.props;
        const pst = getFloatFromString(e.target.value);
        onChange({
            stillingsprosent: pst ? pst.toFixed(1) : e.target.value
        });
    }

    render() {
        const { skjemadata, søknad, arbeidsforhold, tilgjengeligeStønadskontoer, intl, onChange } = this.props;
        const { stillingsprosent, konto, samtidigGradertUttak, orgnr } = skjemadata;

        const velgbareStønadskontoer = getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer);
        const harFlereVelgbareKontoer = velgbareStønadskontoer.length > 1;

        return (
            <React.Fragment>
                <Block>
                    <Input
                        bredde="XS"
                        label={getMessage(intl, 'stillingsprosent')}
                        onChange={(e: InputChangeEvent) =>
                            onChange({
                                stillingsprosent: e.target.value,
                                konto: harFlereVelgbareKontoer === false ? velgbareStønadskontoer[0] : undefined
                            })
                        }
                        onBlur={this.handleStillingsprosentBlur}
                        value={stillingsprosent || ''}
                        maxLength={4}
                    />
                </Block>

                <Block visible={visibility.hvilkenKvoteSkalBenyttes(skjemadata)}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskonto: StønadskontoType) => {
                            onChange({ konto: stønadskonto });
                        }}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={konto}
                    />
                </Block>

                <Block visible={visibility.skalDereHaGradertUttakSamtidig(skjemadata, søknad)}>
                    <SkalDereHaGradertUttakSamtidigSpørsmål
                        onChange={(v: boolean) => {
                            onChange({ samtidigGradertUttak: v });
                        }}
                        samtidigGradertUttak={samtidigGradertUttak}
                    />
                </Block>

                <Block visible={visibility.hvorSkalDuJobbe(skjemadata, søknad)}>
                    <HvorSkalDuJobbeSpørsmål
                        arbeidsforhold={arbeidsforhold}
                        onChange={(orgnrValue: string, skalJobbeSomFrilansEllerSelvstendigNæringsdrivende: boolean) =>
                            onChange({
                                orgnr: orgnrValue,
                                skalJobbeSomFrilansEllerSelvstendigNæringsdrivende
                            })
                        }
                        valgtArbeidsforhold={orgnr}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer
    };
};
export default connect(mapStateToProps)(injectIntl(UtsettelsePgaDeltidsarbeidForm));
