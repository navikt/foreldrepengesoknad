import * as React from 'react';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Arbeidsforhold from '../types/Arbeidsforhold';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import { InputChangeEvent } from '../types/dom/Events';
import getMessage from 'common/util/i18nUtils';
import Input from 'common/components/skjema/wrappers/Input';

interface HvorSkalDuJobbeSpørsmålProps {
    onChange: (orgnr: string) => void;
    arbeidsforhold: Arbeidsforhold[];
    valgtArbeidsforhold?: string;
}

type Props = HvorSkalDuJobbeSpørsmålProps & InjectedIntlProps;

interface State {
    selvstendigNæringsdrivendeValgt: boolean;
    frilansValgt: boolean;
}

const næringValue = 'NÆRING';
const frilansValue = 'FRILANS';

class HvorSkalDuJobbeSpørsmål extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selvstendigNæringsdrivendeValgt: false,
            frilansValgt: false
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.getRadioOptions = this.getRadioOptions.bind(this);
        this.getCheckedValue = this.getCheckedValue.bind(this);
    }

    getCheckedValue() {
        const { valgtArbeidsforhold } = this.props;
        const { selvstendigNæringsdrivendeValgt, frilansValgt } = this.state;
        if (selvstendigNæringsdrivendeValgt) {
            return næringValue;
        }
        if (frilansValgt) {
            return frilansValue;
        }
        return valgtArbeidsforhold;
    }

    handleOnChange(e: InputChangeEvent, value: string) {
        const { onChange } = this.props;

        this.setState({
            selvstendigNæringsdrivendeValgt: value === næringValue,
            frilansValgt: value === frilansValue
        });

        if (value !== næringValue && value !== frilansValue) {
            onChange(value);
        } else {
            onChange('');
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
            { label: getMessage(intl, 'jegSkalJobbeSomSelvstendigNæringsdrivende'), value: næringValue },
            { label: getMessage(intl, 'jegSkalJobbeSomFrilans'), value: frilansValue }
        ];
    }

    render() {
        const { valgtArbeidsforhold, onChange, intl } = this.props;
        const { selvstendigNæringsdrivendeValgt } = this.state;

        return (
            <>
                <RadioPanelGruppeResponsive
                    checked={this.getCheckedValue()}
                    radios={this.getRadioOptions()}
                    name="arbeidsgiver"
                    onChange={this.handleOnChange}
                    legend={getMessage(intl, 'hvorSkalDuJobbe.spørsmål')}
                />

                {selvstendigNæringsdrivendeValgt && (
                    <Input
                        label="Hva er organisasjonsnummeret på næringen?"
                        onChange={(e: InputChangeEvent) => onChange(e.target.value)}
                        value={valgtArbeidsforhold}
                    />
                )}
            </>
        );
    }
}

export default injectIntl(HvorSkalDuJobbeSpørsmål);
