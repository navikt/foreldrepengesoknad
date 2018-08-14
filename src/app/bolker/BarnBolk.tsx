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
    onRegistrertBarnChange: (fødselsdato: string) => void;
    onAnnetBarnChange: () => void;
}

type Props = BarnBolkProps & InjectedIntlProps;

class BarnBolk extends React.Component<Props> {
    render() {
        const {
            registrerteBarn,
            gjelderAnnetBarn,
            onRegistrertBarnChange,
            onAnnetBarnChange,
            intl
        } = this.props;

        return (
            <React.Fragment>
                <Block
                    render={() => (
                        <GjelderSøknadenNoenAvDisseBarnaSpørsmål
                            registrerteBarn={registrerteBarn}
                            onChange={(id: string) => {
                                onRegistrertBarnChange(id);
                            }}
                            disabled={gjelderAnnetBarn || false}
                        />
                    )}
                />

                <Block
                    render={() => (
                        <Checkbox
                            label={getMessage(
                                intl,
                                'søknadenGjelderAnnetBarn.spørsmål'
                            )}
                            checked={gjelderAnnetBarn}
                            onChange={onAnnetBarnChange}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

export default injectIntl(BarnBolk);
