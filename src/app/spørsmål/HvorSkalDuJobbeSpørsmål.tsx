import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedHTMLMessage } from 'react-intl';
import Arbeidsforhold from '../types/Arbeidsforhold';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { Arbeidsform } from '../types/uttaksplan/periodetyper';

interface HvorSkalDuJobbeSpørsmålProps {
    onChange: (orgnr: string[], frilansEllerSelvstendigNæringsdrivende: Arbeidsform[]) => void;
    arbeidsformer: Arbeidsform[];
    arbeidsforhold: Arbeidsforhold[];
    orgnumre: string[];
}

type Props = HvorSkalDuJobbeSpørsmålProps & InjectedIntlProps;

const erFrilansEllerSelvstendig = (value: string): boolean => {
    return value === Arbeidsform.selvstendignæringsdrivende || value === Arbeidsform.frilans;
};

const getValgtVerdi = (orgnumre: string[], arbeidsformer: Arbeidsform[]) => {
    if (orgnumre.length > 0) {
        return orgnumre[0];
    } else if (arbeidsformer.length > 0) {
        return arbeidsformer[0];
    } else {
        return undefined;
    }
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
            onChange([], [value as Arbeidsform]);
        } else {
            onChange([value], [Arbeidsform.arbeidstaker]);
        }
    }

    getRadioOptions(): RadioProps[] {
        const { arbeidsforhold, intl } = this.props;
        return [
            ...arbeidsforhold.map((v) => ({
                label: v.arbeidsgiverIdType === 'orgnr' ? v.arbeidsgiverNavn : getMessage(intl, 'arbeidsgiver'),
                value: v.arbeidsgiverId
            })),
            {
                label: getMessage(intl, 'jegSkalJobbeSomSelvstendigNæringsdrivende'),
                value: Arbeidsform.selvstendignæringsdrivende
            },
            { label: getMessage(intl, 'jegSkalJobbeSomFrilans'), value: Arbeidsform.frilans }
        ];
    }

    render() {
        const { intl, orgnumre, arbeidsformer } = this.props;

        return (
            <FlervalgSpørsmål
                navn="arbeidsgiver"
                alternativer={this.getRadioOptions()}
                valgtVerdi={getValgtVerdi(orgnumre, arbeidsformer)}
                toKolonner={true}
                spørsmål={getMessage(intl, 'hvorSkalDuJobbe.spørsmål')}
                onChange={this.handleOnChange}
                hjelpetekst={<FormattedHTMLMessage id="hvorSkalDuJobbe.spørsmål.gradering.hjelpetekst" />}
            />
        );
    }
}

export default injectIntl(HvorSkalDuJobbeSpørsmål);
