import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Select } from 'nav-frontend-skjema';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import Block from 'common/components/block/Block';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import getMessage from 'common/util/i18nUtils';

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

type Props = OwnProps & InjectedIntlProps;

type AntallBarnVerdi = '1' | '2' | '3';

class AntallBarnBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onRadioChange(antall: AntallBarnVerdi) {
        this.props.onChange(parseInt(antall, 10));
    }

    onSelectChange(antall: number) {
        this.props.onChange(antall);
    }

    render() {
        const { spørsmål, inputName, feil, antallBarn, intl } = this.props;
        const antallBarnVerdi: AntallBarnVerdi | undefined =
            antallBarn !== undefined
                ? (`${Math.min(antallBarn, 3)}` as AntallBarnVerdi)
                : undefined;

        return (
            <React.Fragment>
                <Block>
                    <RadioPanelGruppeResponsive
                        legend={spørsmål}
                        name={inputName}
                        feil={feil}
                        onChange={(
                            event: React.SyntheticEvent<EventTarget>,
                            value: string
                        ) => this.onRadioChange(value as AntallBarnVerdi)}
                        checked={antallBarnVerdi}
                        radios={[
                            {
                                inputProps: { id: 'js-ettBarn' },
                                label: getMessage(
                                    intl,
                                    'antallBarn.alternativ.ettbarn'
                                ),
                                value: '1'
                            },
                            {
                                inputProps: { id: 'js-tvillinger' },
                                label: getMessage(
                                    intl,
                                    'antallBarn.alternativ.tvillinger'
                                ),
                                value: '2'
                            },
                            {
                                inputProps: { id: 'js-flereBarn' },
                                label: getMessage(
                                    intl,
                                    'antallBarn.alternativ.flere'
                                ),
                                value: '3'
                            }
                        ]}
                    />
                </Block>
                <Block visible={antallBarnVerdi === '3'}>
                    <Select
                        bredde="xs"
                        label={<Labeltekst intlId="antallBarn.select.tekst" />}
                        onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                            this.onSelectChange(parseInt(evt.target.value, 10))
                        }>
                        {antallBarn === undefined && (
                            <option
                                value=""
                                selected={antallBarn === undefined}>
                                {intl.formatMessage({
                                    id: 'antallBarn.select.velg'
                                })}
                            </option>
                        )}
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
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(AntallBarnBolk);
