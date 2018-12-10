import * as React from 'react';
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Input from 'common/components/skjema/wrappers/Input';
import Block from 'common/components/block/Block';
import { getFloatFromString } from 'common/util/numberUtils';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import JaNeiSpørsmål from '../../ja-nei-spørsmål/JaNeiSpørsmål';
import { Arbeidsform, Uttaksperiode, Periode } from '../../../types/uttaksplan/periodetyper';
import { RecursivePartial } from '../../../types/Partial';
import HvorSkalDuJobbeSpørsmål from '../../../spørsmål/HvorSkalDuJobbeSpørsmål';
import { UttakSpørsmålKeys, UttakSpørsmålVisibility } from '../uttakFormConfig';
import { getStillingsprosentRegler } from '../../../util/validation/stillingsprosent';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { getVarighetString } from 'common/util/intlUtils';
import { finnAntallDagerÅTrekke } from '../../../util/uttaksPlanStatus';
import { Perioden } from '../../../util/uttaksplan/Perioden';

interface OwnProps {
    onChange: (periode: RecursivePartial<Uttaksperiode>) => void;
    periode: RecursivePartial<Uttaksperiode>;
    visibility: UttakSpørsmålVisibility;
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
        const { periode, arbeidsforhold, visibility, intl, onChange } = this.props;

        const pst = getFloatFromString(periode.stillingsprosent || '');
        const uttaksdager = Perioden(periode as Periode).getAntallUttaksdager();
        const varighet =
            pst && uttaksdager
                ? getMessage(intl, 'gradert.uttak.varighet', {
                      varighet: getVarighetString(finnAntallDagerÅTrekke(uttaksdager, periode as Periode), intl)
                  })
                : undefined;

        return (
            <>
                <Block>
                    <JaNeiSpørsmål
                        navn="ønskerDuGradertUttak"
                        spørsmål={getMessage(intl, 'uttaksperiode.gradert.skalDuHarGradering')}
                        valgtVerdi={periode.gradert}
                        onChange={(ønskerGradering) =>
                            onChange({ gradert: ønskerGradering, erArbeidstaker: ønskerGradering ? false : undefined })
                        }
                        hjelpetekst={<FormattedHTMLMessage id="uttaksperiode.gradert.skalDuHarGradering.hjelpetekst" />}
                    />
                </Block>

                <Block visible={visibility.isVisible(UttakSpørsmålKeys.stillingsprosent)}>
                    <Block margin={varighet ? 'xxs' : 'none'}>
                        <Input
                            name="utsettelse-stillingsprosent"
                            bredde="XS"
                            label={getMessage(intl, 'stillingsprosent')}
                            onChange={(v: string) =>
                                onChange({
                                    stillingsprosent: v
                                })
                            }
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                                this.handleStillingsprosentChange(e.target.value)
                            }
                            value={periode.stillingsprosent || ''}
                            maxLength={4}
                            validators={getStillingsprosentRegler(false, periode.stillingsprosent || '', intl)}
                        />
                    </Block>
                </Block>

                <Block visible={visibility.isVisible(UttakSpørsmålKeys.hvorSkalDuJobbe)}>
                    <HvorSkalDuJobbeSpørsmål
                        arbeidsforhold={arbeidsforhold || []}
                        onChange={(orgnr, arbeidsform) =>
                            onChange({
                                orgnr,
                                arbeidsform,
                                erArbeidstaker: arbeidsform === Arbeidsform.arbeidstaker
                            })
                        }
                        frilansEllerSelvstendig={periode.arbeidsform}
                        valgtArbeidsforhold={periode.orgnr}
                    />
                </Block>
                <Block
                    visible={
                        periode.erArbeidstaker === true ||
                        periode.arbeidsform === Arbeidsform.frilans ||
                        periode.arbeidsform === Arbeidsform.selvstendignæringsdrivende
                    }>
                    <Veilederinfo>
                        <FormattedHTMLMessage
                            id={
                                periode.erArbeidstaker
                                    ? 'vedlegg.veileder.dokumentasjonAvArbeidVedGradering'
                                    : 'uttaksplan.infoTilFrilansOgSelvstendig'
                            }
                        />
                    </Veilederinfo>
                </Block>
            </>
        );
    }
}

export default injectIntl(GradertUttakForm);
