import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Arbeidsforhold from '../types/Arbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import { Arbeidsform } from '../types/uttaksplan/periodetyper';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';

interface HvorSkalDuJobbeSpørsmålFlervalgProps {
    onChange: (orgnumre: string[], frilansEllerSelvstendigNæringsdrivende: Arbeidsform[]) => void;
    arbeidsformer: Arbeidsform[];
    arbeidsforhold: Arbeidsforhold[];
    orgnumre: string[];
}

type Props = HvorSkalDuJobbeSpørsmålFlervalgProps & InjectedIntlProps;

const erFrilansEllerSelvstendig = (value: string): boolean => {
    return value === Arbeidsform.selvstendignæringsdrivende || value === Arbeidsform.frilans;
};

class HvorSkalDuJobbeSpørsmålFlervalg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.addArbeidsgiver = this.addArbeidsgiver.bind(this);
        this.removeArbeidsgiver = this.removeArbeidsgiver.bind(this);
    }

    getOptions(orgnumre: string[], arbeidsformer: Arbeidsform[]) {
        const { arbeidsforhold, intl } = this.props;
        return [
            ...arbeidsforhold.map((v) => ({
                label: v.arbeidsgiverNavn,
                value: v.arbeidsgiverId,
                checked: orgnumre.includes(v.arbeidsgiverId)
            })),
            {
                label: getMessage(intl, 'jegSkalJobbeSomSelvstendigNæringsdrivende'),
                value: Arbeidsform.selvstendignæringsdrivende,
                checked: arbeidsformer.includes(Arbeidsform.selvstendignæringsdrivende)
            },
            {
                label: getMessage(intl, 'jegSkalJobbeSomFrilans'),
                value: Arbeidsform.frilans,
                checked: arbeidsformer.includes(Arbeidsform.frilans)
            }
        ];
    }

    addArbeidsgiver(orgnr: string, arbeidsforhold: string[]) {
        arbeidsforhold.push(orgnr);
    }

    removeArbeidsgiver(orgnr: string, arbeidsforhold: string[]) {
        arbeidsforhold.splice(arbeidsforhold.indexOf(orgnr), 1);
    }

    addArbeidsform(value: Arbeidsform, arbeidsformer: Arbeidsform[]) {
        arbeidsformer.push(value);
    }

    removeArbeidsform(value: Arbeidsform, arbeidsformer: Arbeidsform[]) {
        arbeidsformer.splice(arbeidsformer.indexOf(value), 1);
    }

    handleOnChange(e: any, value: Arbeidsform | string, orgnumre: string[], arbeidsformer: Arbeidsform[]) {
        const { onChange } = this.props;
        const checked = e.target.checked;

        if (erFrilansEllerSelvstendig(value)) {
            if (checked) {
                this.addArbeidsform(value as Arbeidsform, arbeidsformer);
            } else {
                this.removeArbeidsform(value as Arbeidsform, arbeidsformer);
            }

            onChange(orgnumre, arbeidsformer);
        } else {
            if (checked) {
                this.addArbeidsgiver(value, orgnumre);
                this.addArbeidsform(Arbeidsform.arbeidstaker, arbeidsformer);
            } else {
                this.removeArbeidsgiver(value, orgnumre);
                this.removeArbeidsform(Arbeidsform.arbeidstaker, arbeidsformer);
            }

            onChange(orgnumre, arbeidsformer);
        }
    }

    render() {
        const { orgnumre, arbeidsformer, intl } = this.props;

        return (
            <CheckboksPanelGruppeResponsive
                twoColumns={true}
                legend={getMessage(intl, 'hvorSkalDuJobbe.spørsmål')}
                onChange={(e: any, value: Arbeidsform | string) =>
                    this.handleOnChange(e, value, orgnumre, arbeidsformer)
                }
                checkboxes={this.getOptions(orgnumre, arbeidsformer)}
                infoboksTekst="test"
            />
        );
    }
}

export default injectIntl(HvorSkalDuJobbeSpørsmålFlervalg);
