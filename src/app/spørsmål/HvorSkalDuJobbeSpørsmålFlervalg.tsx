import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Arbeidsforhold from '../types/Arbeidsforhold';
import getMessage from 'common/util/i18nUtils';
import { Arbeidsform } from '../types/uttaksplan/periodetyper';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';

interface HvorSkalDuJobbeSpørsmålFlervalgProps {
    onChange: (orgnummere: string[], frilansEllerSelvstendigNæringsdrivende: Arbeidsform[]) => void;
    arbeidsformer: Arbeidsform[];
    arbeidsforhold: Arbeidsforhold[];
    orgnummere: string[];
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

    getOptions(orgnummere: string[], arbeidsformer: Arbeidsform[]) {
        const { arbeidsforhold, intl } = this.props;
        return [
            ...arbeidsforhold.map((v) => ({
                label: v.arbeidsgiverNavn,
                value: v.arbeidsgiverId,
                checked: orgnummere.includes(v.arbeidsgiverId)
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

    handleOnChange(e: any, value: Arbeidsform | string, orgnummere: string[], arbeidsformer: Arbeidsform[]) {
        const { onChange } = this.props;
        const checked = e.target.checked;

        if (erFrilansEllerSelvstendig(value)) {
            if (checked) {
                this.addArbeidsform(value as Arbeidsform, arbeidsformer);
            } else {
                this.removeArbeidsform(value as Arbeidsform, arbeidsformer);
            }

            onChange(orgnummere, arbeidsformer);
        } else {
            if (checked) {
                this.addArbeidsgiver(value, orgnummere);
                this.addArbeidsform(Arbeidsform.arbeidstaker, arbeidsformer);
            } else {
                this.removeArbeidsgiver(value, orgnummere);
                this.removeArbeidsform(Arbeidsform.arbeidstaker, arbeidsformer);
            }

            onChange(orgnummere, arbeidsformer);
        }
    }

    render() {
        const { orgnummere, arbeidsformer, intl } = this.props;

        return (
            <CheckboksPanelGruppeResponsive
                twoColumns={true}
                legend={getMessage(intl, 'hvorSkalDuJobbe.spørsmål')}
                onChange={(e: any, value: Arbeidsform | string) =>
                    this.handleOnChange(e, value, orgnummere, arbeidsformer)
                }
                checkboxes={this.getOptions(orgnummere, arbeidsformer)}
            />
        );
    }
}

export default injectIntl(HvorSkalDuJobbeSpørsmålFlervalg);
