import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { InputChangeEvent } from '../../../../types/dom/Events';
import Input from 'common/components/skjema/wrappers/Input';
import Block from 'common/components/block/Block';
import {
    StønadskontoType,
    TilgjengeligStønadskonto,
    UtsettelsePgaArbeid,
    Uttaksperiode
} from '../../../../types/uttaksplan/periodetyper';
import { getFloatFromString } from 'common/util/numberUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RecursivePartial } from '../../../../types/Partial';
import HvilkenKvoteSkalBenyttesSpørsmål from '../../../../spørsmål/HvilkenKvoteSkalBenyttesSpørsmål';
import { connect } from 'react-redux';
import { AppState } from '../../../../redux/reducers/index';
import Søknad from '../../../../types/søknad/Søknad';
import { getVelgbareStønadskontotyper } from '../../../../util/uttaksplan/aktuelleStønadskontoer';
import SkalDereHaGradertUttakSamtidigSpørsmål from '../../../../spørsmål/SkalDereHaGradertUttakSamtidigSpørsmål';
import visibility from './visibility';
import { Søkerinfo } from '../../../../types/søkerinfo';
import HvorSkalDuJobbeSpørsmål from '../../../../spørsmål/HvorSkalDuJobbeSpørsmål';

type PeriodePartial = RecursivePartial<UtsettelsePgaArbeid> | RecursivePartial<Uttaksperiode>;

interface UtsettelsePgaArbeidFormProps {
    onChange: (v: PeriodePartial) => void;
    periode: PeriodePartial;
}

interface StateProps {
    søknad: Søknad;
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    søkerinfo: Søkerinfo;
}

type Props = UtsettelsePgaArbeidFormProps & StateProps & InjectedIntlProps;

class UtsettelsePgaArbeidForm extends React.Component<Props> {
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
        const { periode, søknad, søkerinfo, tilgjengeligeStønadskontoer, intl, onChange } = this.props;

        const utsettelsePgaArbeidPeriode = periode as UtsettelsePgaArbeid;
        const { stillingsprosent, samtidigGradertUttak } = utsettelsePgaArbeidPeriode;
        const { arbeidsforhold } = søkerinfo;

        const uttaksperiode = periode as Uttaksperiode;
        const { konto } = uttaksperiode;

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
                                konto: harFlereVelgbareKontoer === false ? velgbareStønadskontoer[0] : null
                            })
                        }
                        onBlur={this.handleStillingsprosentBlur}
                        value={stillingsprosent || ''}
                        maxLength={4}
                    />
                </Block>

                <Block visible={visibility.hvilkenKvoteSkalBenyttes(periode)}>
                    <HvilkenKvoteSkalBenyttesSpørsmål
                        onChange={(stønadskonto: StønadskontoType) => {
                            onChange({ konto: stønadskonto });
                        }}
                        velgbareStønadskontoer={velgbareStønadskontoer}
                        stønadskonto={konto}
                    />
                </Block>

                <Block visible={visibility.skalDereHaGradertUttakSamtidig(periode, søknad)}>
                    <SkalDereHaGradertUttakSamtidigSpørsmål
                        onChange={(v: boolean) => {
                            onChange({ samtidigGradertUttak: v });
                        }}
                        samtidigGradertUttak={samtidigGradertUttak}
                    />
                </Block>

                <Block>
                    <HvorSkalDuJobbeSpørsmål
                        arbeidsforhold={arbeidsforhold}
                        onChange={(v: string) => onChange({ orgnr: v })}
                        valgtArbeidsforhold={utsettelsePgaArbeidPeriode.orgnr}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        søknad: state.søknad,
        søkerinfo: state.api.søkerinfo!,
        tilgjengeligeStønadskontoer: state.api.tilgjengeligeStønadskontoer
    };
};
export default connect(mapStateToProps)(injectIntl(UtsettelsePgaArbeidForm));
