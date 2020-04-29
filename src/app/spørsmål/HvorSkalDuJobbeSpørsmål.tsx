import * as React from 'react';
import { injectIntl, IntlShape, FormattedMessage } from 'react-intl';
import Arbeidsforhold from '../types/Arbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { Arbeidsform } from '../types/uttaksplan/periodetyper';
import { Tidsperiode } from 'common/types';
import { getKunArbeidsforholdForValgtTidsperiode } from 'app/util/domain/arbeidsforhold';
import { RadioProps } from 'nav-frontend-skjema';

interface HvorSkalDuJobbeSpørsmålProps {
    onChange: (orgnr: string[], frilansEllerSelvstendigNæringsdrivende: Arbeidsform[]) => void;
    arbeidsformer: Arbeidsform[];
    arbeidsforhold: Arbeidsforhold[];
    orgnumre: string[];
    tidsperiode: Tidsperiode;
    intl: IntlShape;
}

type Props = HvorSkalDuJobbeSpørsmålProps;

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
        const { arbeidsforhold, tidsperiode, intl } = this.props;

        let kunArbeidsforholdForValgtTidsperiode = [...arbeidsforhold];

        if (tidsperiode && tidsperiode.fom && tidsperiode.tom) {
            kunArbeidsforholdForValgtTidsperiode = getKunArbeidsforholdForValgtTidsperiode(
                arbeidsforhold,
                tidsperiode as Tidsperiode
            );
        }

        const name = 'hvorSkalDuJobbe';

        return [
            ...kunArbeidsforholdForValgtTidsperiode.map((v, i) => ({
                label: v.arbeidsgiverIdType === 'orgnr' ? v.arbeidsgiverNavn : getMessage(intl, 'arbeidsgiver'),
                value: v.arbeidsgiverId,
                name,
            })),
            {
                label: getMessage(intl, 'jegSkalJobbeSomSelvstendigNæringsdrivende'),
                value: Arbeidsform.selvstendignæringsdrivende,
                name,
            },
            { label: getMessage(intl, 'jegSkalJobbeSomFrilans'), value: Arbeidsform.frilans, name },
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
                hjelpetekst={
                    <FormattedMessage
                        id="hvorSkalDuJobbe.spørsmål.gradering.hjelpetekst"
                        values={{ b: (msg: any) => <b>{msg}</b> }}
                    />
                }
            />
        );
    }
}

export default injectIntl(HvorSkalDuJobbeSpørsmål);
