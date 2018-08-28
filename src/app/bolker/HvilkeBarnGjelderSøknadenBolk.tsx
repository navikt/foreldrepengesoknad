import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Block from 'common/components/block/Block';
import { RegistrertBarn } from '../types/Person';
import GjelderSøknadenNoenAvDisseBarnaSpørsmål from '../spørsmål/GjelderSøknadenNoenAvDisseBarnaSpørsmål';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import getMessage from 'common/util/i18nUtils';
import { SøknadenGjelderBarnValg } from '../types/s\u00F8knad/S\u00F8knad';

interface BarnBolkProps {
    søknadenGjelderBarnValg: SøknadenGjelderBarnValg;
    registrerteBarn: RegistrertBarn[];
    onChange: (søknadenGjelder: SøknadenGjelderBarnValg) => void;
}

type Props = BarnBolkProps & InjectedIntlProps;

class BarnBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onGjelderRegistrertBarnChange = this.onGjelderRegistrertBarnChange.bind(
            this
        );
        this.onGjelderAnnetBarnChange = this.onGjelderAnnetBarnChange.bind(
            this
        );
    }
    onGjelderAnnetBarnChange(checked: boolean) {
        this.props.onChange({
            gjelderAnnetBarn: checked,
            valgteBarn: []
        });
    }
    onGjelderRegistrertBarnChange(barn: RegistrertBarn, checked: boolean) {
        const { valgteBarn } = this.props.søknadenGjelderBarnValg;
        this.props.onChange({
            gjelderAnnetBarn: false,
            valgteBarn: checked
                ? [...valgteBarn, barn]
                : valgteBarn.filter((b) => b.fnr !== barn.fnr)
        });
    }
    render() {
        const { søknadenGjelderBarnValg, registrerteBarn, intl } = this.props;

        return (
            <React.Fragment>
                <Block>
                    <GjelderSøknadenNoenAvDisseBarnaSpørsmål
                        registrerteBarn={registrerteBarn}
                        valgteBarn={søknadenGjelderBarnValg.valgteBarn}
                        onChange={this.onGjelderRegistrertBarnChange}
                        disabled={
                            søknadenGjelderBarnValg.gjelderAnnetBarn || false
                        }
                    />
                </Block>

                <Block>
                    <Checkbox
                        label={getMessage(
                            intl,
                            'søknadenGjelderAnnetBarn.spørsmål'
                        )}
                        checked={
                            søknadenGjelderBarnValg.gjelderAnnetBarn === true
                        }
                        onChange={(evt) =>
                            this.onGjelderAnnetBarnChange(evt.target.checked)
                        }
                    />
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(BarnBolk);
