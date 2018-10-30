import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { NæringsrelasjonPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import Block from 'common/components/block/Block';
import Input from 'nav-frontend-skjema/lib/input';
import { InputChangeEvent } from '../../types/dom/Events';
import getMessage from 'common/util/i18nUtils';
import ErNærVennEllerFamilieAvPersonSpørsmål from '../../spørsmål/ErNærVennEllerFamilieAvPersonSpørsmål';
import visibility from './visibility';

interface NæringsrelasjonBolkProps {
    næringsrelasjon: NæringsrelasjonPartial;
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmålSynlig: boolean;
    onChange: (updatedProps: NæringsrelasjonPartial) => void;
    næringsrelasjonsType: 'revisor' | 'regnskapsfører';
}

type Props = NæringsrelasjonBolkProps & InjectedIntlProps;

class NæringsrelasjonBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(partial: NæringsrelasjonPartial) {
        const { næringsrelasjon, onChange } = this.props;
        onChange({
            ...næringsrelasjon,
            ...partial
        });
    }

    render() {
        const { næringsrelasjon, renderSpørsmål, oppfølgingsspørsmålSynlig, næringsrelasjonsType, intl } = this.props;
        const { navn, telefonnummer, erNærVennEllerFamilie } = næringsrelasjon;

        return (
            <React.Fragment>
                <Block margin={oppfølgingsspørsmålSynlig ? 'm' : 'none'}>{renderSpørsmål()}</Block>
                {oppfølgingsspørsmålSynlig && (
                    <React.Fragment>
                        <Block>
                            <Input
                                value={navn || ''}
                                label={getMessage(intl, 'næringsrelasjon.navn', { næringsrelasjonsType })}
                                onChange={(e: InputChangeEvent) =>
                                    this.handleOnChange({
                                        navn: e.target.value
                                    })
                                }
                            />
                        </Block>
                        <Block visible={visibility.tlfnr(næringsrelasjon)}>
                            <Input
                                value={telefonnummer || ''}
                                label={getMessage(intl, 'næringsrelasjon.tlfnr', { næringsrelasjonsType })}
                                onChange={(e: InputChangeEvent) =>
                                    this.handleOnChange({
                                        telefonnummer: e.target.value
                                    })
                                }
                            />
                        </Block>
                        <Block visible={visibility.erNærVennEllerFamilie(næringsrelasjon)}>
                            <ErNærVennEllerFamilieAvPersonSpørsmål
                                erNærVennEllerFamilieAvPerson={erNærVennEllerFamilie}
                                onChange={(v: boolean) =>
                                    this.handleOnChange({
                                        erNærVennEllerFamilie: v
                                    })
                                }
                            />
                        </Block>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default injectIntl(NæringsrelasjonBolk);
