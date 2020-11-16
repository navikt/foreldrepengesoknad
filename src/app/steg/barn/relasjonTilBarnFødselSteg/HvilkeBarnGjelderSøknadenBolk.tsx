import * as React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import Block from 'common/components/block/Block';
import { RegistrertBarn } from '../../../types/Person';
import GjelderSøknadenNoenAvDisseBarnaSpørsmål from '../../../spørsmål/GjelderSøknadenNoenAvDisseBarnaSpørsmål';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import getMessage from 'common/util/i18nUtils';
import { SøknadenGjelderBarnValg } from '../../../types/søknad/Søknad';
import Fieldset from 'app/temp-components/Fieldset';
interface BarnBolkProps {
    søknadenGjelderBarnValg: SøknadenGjelderBarnValg;
    registrerteBarn: RegistrertBarn[];
    onChange: (søknadenGjelder: SøknadenGjelderBarnValg) => void;
    intl: IntlShape;
}

type Props = BarnBolkProps;
class BarnBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onGjelderRegistrertBarnChange = this.onGjelderRegistrertBarnChange.bind(this);
        this.onGjelderAnnetBarnChange = this.onGjelderAnnetBarnChange.bind(this);
    }

    onGjelderAnnetBarnChange(checked: boolean): void {
        this.props.onChange({
            gjelderAnnetBarn: checked,
            valgteBarn: [],
        });
    }

    onGjelderRegistrertBarnChange(barn: RegistrertBarn, checked: boolean): void {
        const { valgteBarn } = this.props.søknadenGjelderBarnValg;
        this.props.onChange({
            gjelderAnnetBarn: false,
            valgteBarn: checked ? [...valgteBarn, barn] : valgteBarn.filter((b) => b.fnr !== barn.fnr),
        });
    }

    render() {
        const { søknadenGjelderBarnValg, registrerteBarn, intl } = this.props;
        const ettBarn = registrerteBarn.length === 1;

        return (
            <Fieldset
                legend={
                    <span style={{ display: 'inline-block', marginBottom: '.75rem', fontSize: '1.125rem' }}>
                        <FormattedMessage
                            tagName="span"
                            id={
                                ettBarn
                                    ? 'hvilketBarnGjelderSøknaden.spørsmål.ettBarn'
                                    : 'hvilketBarnGjelderSøknaden.spørsmål'
                            }
                        />
                    </span>
                }
            >
                <Block margin="s">
                    <GjelderSøknadenNoenAvDisseBarnaSpørsmål
                        registrerteBarn={registrerteBarn}
                        valgteBarn={søknadenGjelderBarnValg.valgteBarn}
                        onChange={this.onGjelderRegistrertBarnChange}
                        disabled={søknadenGjelderBarnValg.gjelderAnnetBarn || false}
                    />
                </Block>

                <Block>
                    <Checkbox
                        label={getMessage(intl, 'søknadenGjelderAnnetBarn.spørsmål')}
                        checked={søknadenGjelderBarnValg.gjelderAnnetBarn === true}
                        onChange={(evt) => this.onGjelderAnnetBarnChange(evt.target.checked)}
                    />
                </Block>
            </Fieldset>
        );
    }
}

export default injectIntl(BarnBolk);
