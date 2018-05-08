import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Select } from 'nav-frontend-skjema';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import Spørsmål from '../components/spørsmål/Spørsmål';
import Labeltekst from '../components/labeltekst/Labeltekst';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import getMessage from '../util/i18nUtils';

export interface OwnProps {
    /** Spørsmålstekst */
    spørsmål: string;
    /** Navn på inputfelt */
    inputName: string;
    /** Kalles når verdi endres av bruker */
    onChange: (antall: number) => void;
    /** Antall barn som er valgt */
    antallBarn?: number;
    /** Valideringsfeilmelding */
    feil?: SkjemaelementFeil;
}

export interface State {
    antallBarnVerdi: AntallBarnVerdi;
}
type Props = OwnProps & InjectedIntlProps;

type AntallBarnVerdi = 'ett' | 'tvillinger' | 'flere' | undefined;

const getAntallBarnVerdiFraTall = (
    antall: number | undefined
): AntallBarnVerdi => {
    switch (antall) {
        case 1:
            return 'ett';
        case 2:
            return 'tvillinger';
        case undefined:
            return undefined;
        default:
            return 'flere';
    }
};

class AntallBarnSpørsmål extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            antallBarnVerdi: getAntallBarnVerdiFraTall(props.antallBarn)
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            antallBarnVerdi: getAntallBarnVerdiFraTall(nextProps.antallBarn)
        });
    }

    onRadioChange(antall: AntallBarnVerdi) {
        this.setState({
            antallBarnVerdi: antall
        });
        if (antall === 'ett' || antall === 'tvillinger') {
            this.props.onChange(antall === 'ett' ? 1 : 2);
            return;
        }
    }

    onSelectChange(antall: number) {
        this.props.onChange(antall);
    }

    render() {
        const { spørsmål, inputName, feil, antallBarn, intl } = this.props;
        const { antallBarnVerdi } = this.state;

        return (
            <div>
                <Spørsmål>
                    <RadioPanelGruppeResponsive
                        legend={spørsmål}
                        name={inputName}
                        feil={feil}
                        onChange={(event: any, value: string) =>
                            this.onRadioChange(value as AntallBarnVerdi)
                        }
                        checked={antallBarnVerdi}
                        radios={[
                            {
                                inputProps: { id: 'js-ettBarn' },
                                label: getMessage(
                                    intl,
                                    'antallBarn.alternativ.ettbarn'
                                ),
                                value: 'ett'
                            },
                            {
                                inputProps: { id: 'js-tvillinger' },
                                label: getMessage(
                                    intl,
                                    'antallBarn.alternativ.tvillinger'
                                ),
                                value: 'tvillinger'
                            },
                            {
                                inputProps: { id: 'js-flereBarn' },
                                label: getMessage(
                                    intl,
                                    'antallBarn.alternativ.flere'
                                ),
                                value: 'flere'
                            }
                        ]}
                    />
                </Spørsmål>
                <Spørsmål visible={antallBarnVerdi === 'flere'}>
                    <Select
                        bredde="xs"
                        label={<Labeltekst intlId="antallBarn.select.tekst" />}
                        onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                            this.onSelectChange(parseInt(evt.target.value, 10))
                        }>
                        <option value={3} selected={antallBarn === 3}>
                            3
                        </option>
                        <option value={4} selected={antallBarn === 4}>
                            4
                        </option>
                        <option value={5} selected={antallBarn === 5}>
                            5
                        </option>
                        <option value={6} selected={antallBarn === 6}>
                            6
                        </option>
                        <option value={7} selected={antallBarn === 7}>
                            7
                        </option>
                        <option value={8} selected={antallBarn === 8}>
                            8
                        </option>
                        <option value={9} selected={antallBarn === 9}>
                            9
                        </option>
                    </Select>
                </Spørsmål>
            </div>
        );
    }
}

export default injectIntl(AntallBarnSpørsmål);
