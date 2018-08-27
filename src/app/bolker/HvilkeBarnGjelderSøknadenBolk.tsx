import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Block from 'common/components/block/Block';
import { VelgbartRegistrertBarn } from '../types/Person';
import GjelderSøknadenNoenAvDisseBarnaSpørsmål from '../spørsmål/GjelderSøknadenNoenAvDisseBarnaSpørsmål';
import Checkbox from 'nav-frontend-skjema/lib/checkbox';
import getMessage from 'common/util/i18nUtils';

interface BarnBolkProps {
    gjelderAnnetBarn: boolean;
    registrerteBarn: VelgbartRegistrertBarn[];
    onGjelderRegistrertBarnChange: (fødselsdato: string) => void;
    onGjelderAnnetBarnChange: () => void;
}

type Props = BarnBolkProps & InjectedIntlProps;

class BarnBolk extends React.Component<Props> {
    render() {
        const {
            registrerteBarn,
            gjelderAnnetBarn,
            onGjelderRegistrertBarnChange,
            onGjelderAnnetBarnChange,
            intl
        } = this.props;

        return (
            <React.Fragment>
                <Block>
                    <GjelderSøknadenNoenAvDisseBarnaSpørsmål
                        registrerteBarn={registrerteBarn}
                        onChange={(id: string) => {
                            onGjelderRegistrertBarnChange(id);
                        }}
                        disabled={gjelderAnnetBarn || false}
                    />
                </Block>

                <Block>
                    <Checkbox
                        label={getMessage(
                            intl,
                            'søknadenGjelderAnnetBarn.spørsmål'
                        )}
                        checked={gjelderAnnetBarn}
                        onChange={onGjelderAnnetBarnChange}
                    />
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(BarnBolk);
