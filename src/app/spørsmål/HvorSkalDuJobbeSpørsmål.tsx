import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Arbeidsforhold from '../types/Arbeidsforhold';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../components/flervalg-spørsmål/FlervalgSpørsmål';
import { Arbeidsform } from '../types/uttaksplan/periodetyper';

interface HvorSkalDuJobbeSpørsmålProps {
    onChange: (orgnr: string | undefined, frilansEllerSelvstendigNæringsdrivende: Arbeidsform | undefined) => void;
    frilansEllerSelvstendig?: Arbeidsform;
    arbeidsforhold: Arbeidsforhold[];
    valgtArbeidsforhold?: string;
}

type Props = HvorSkalDuJobbeSpørsmålProps & InjectedIntlProps;

const erFrilansEllerSelvstendig = (value: string): boolean => {
    return value === Arbeidsform.selvstendignæringsdrivende || value === Arbeidsform.frilans;
};

class HvorSkalDuJobbeSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getRadioOptions = this.getRadioOptions.bind(this);
    }

    handleOnChange(value: string) {
        const { onChange } = this.props;
        if (erFrilansEllerSelvstendig(value)) {
            onChange(undefined, value as Arbeidsform);
        } else {
            onChange(value, Arbeidsform.arbeidstaker);
        }
    }

    getRadioOptions(): RadioProps[] {
        const { arbeidsforhold, intl } = this.props;
        return [
            ...arbeidsforhold.map((v) => ({
                label: v.arbeidsgiverNavn,
                value: v.arbeidsgiverId,
                subtext: `${
                    v.arbeidsgiverIdType === 'orgnr'
                        ? `${getMessage(intl, 'orgnr')}: ${v.arbeidsgiverId}`
                        : v.arbeidsgiverId
                }`
            })),
            {
                label: getMessage(intl, 'jegSkalJobbeSomSelvstendigNæringsdrivende'),
                value: Arbeidsform.selvstendignæringsdrivende
            },
            { label: getMessage(intl, 'jegSkalJobbeSomFrilans'), value: Arbeidsform.frilans }
        ];
    }

    render() {
        const { intl, valgtArbeidsforhold, frilansEllerSelvstendig } = this.props;

        const value = valgtArbeidsforhold !== undefined ? valgtArbeidsforhold : frilansEllerSelvstendig;

        return (
            <FlervalgSpørsmål
                navn="arbeidsgiver"
                alternativer={this.getRadioOptions()}
                valgtVerdi={value}
                toKolonner={true}
                spørsmål={getMessage(intl, 'hvorSkalDuJobbe.spørsmål')}
                onChange={this.handleOnChange}
            />
        );
    }
}

export default injectIntl(HvorSkalDuJobbeSpørsmål);
