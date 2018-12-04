import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { NæringsrelasjonPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import ErNærVennEllerFamilieAvPersonSpørsmål from '../../spørsmål/ErNærVennEllerFamilieAvPersonSpørsmål';
import visibility from './visibility';
import Input from 'common/components/skjema/wrappers/Input';
import { getFritekstfeltRules } from '../../util/validation/fritekstfelt';

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
                                name="næringsrelasjon-navn"
                                label={getMessage(intl, 'næringsrelasjon.navn', { næringsrelasjonsType })}
                                onChange={(v: string) =>
                                    this.handleOnChange({
                                        navn: v
                                    })
                                }
                                validators={getFritekstfeltRules({ maxLength: 100 }, intl, navn)}
                            />
                        </Block>
                        <Block visible={visibility.tlfnr(næringsrelasjon)}>
                            <Input
                                value={telefonnummer || ''}
                                name="telefonnr"
                                label={getMessage(intl, 'næringsrelasjon.tlfnr', { næringsrelasjonsType })}
                                onChange={(v: string) =>
                                    this.handleOnChange({
                                        telefonnummer: v
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
