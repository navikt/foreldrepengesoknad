import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import visibility from './visibility';
import Input from 'common/components/skjema/wrappers/Input';
import { NæringsrelasjonPartial } from 'app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import ErNærVennEllerFamilieAvPersonSpørsmål from 'app/spørsmål/ErNærVennEllerFamilieAvPersonSpørsmål';
import { getFritekstfeltRules } from 'app/util/validation/fritekstfelt';
import { hasValueRule, noIllegalCharactersRule } from 'app/util/validation/common';
import { getIllegalCharsErrorMessage } from 'app/validation/fieldValidations';

interface NæringsrelasjonBolkProps {
    næringsrelasjon: NæringsrelasjonPartial;
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmålSynlig: boolean;
    onChange: (updatedProps: NæringsrelasjonPartial) => void;
    næringsrelasjonsType: 'revisor' | 'regnskapsfører';
    intl: IntlShape;
}

type Props = NæringsrelasjonBolkProps;

class NæringsrelasjonBolk extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(partial: NæringsrelasjonPartial) {
        const { næringsrelasjon, onChange } = this.props;
        onChange({
            ...næringsrelasjon,
            ...partial,
        });
    }

    render() {
        const { næringsrelasjon, renderSpørsmål, oppfølgingsspørsmålSynlig, næringsrelasjonsType, intl } = this.props;
        const { navn, telefonnummer, erNærVennEllerFamilie } = næringsrelasjon;
        const næringsrelasjonNavnLabel = getMessage(intl, 'næringsrelasjon.navn', { næringsrelasjonsType });
        const næringsrelasjonTelefonNrLabel = getMessage(intl, 'næringsrelasjon.tlfnr', { næringsrelasjonsType });
        return (
            <React.Fragment>
                <Block margin={oppfølgingsspørsmålSynlig ? 'm' : 'none'}>{renderSpørsmål()}</Block>
                {oppfølgingsspørsmålSynlig && (
                    <React.Fragment>
                        <Block>
                            <Input
                                value={navn || ''}
                                name="næringsrelasjon-navn"
                                label={næringsrelasjonNavnLabel}
                                onChange={(v: string) =>
                                    this.handleOnChange({
                                        navn: v,
                                    })
                                }
                                validators={getFritekstfeltRules(
                                    { maxLength: 100 },
                                    næringsrelasjonNavnLabel,
                                    intl,
                                    navn
                                )}
                            />
                        </Block>
                        <Block visible={visibility.tlfnr(næringsrelasjon)}>
                            <Input
                                value={telefonnummer || ''}
                                name="telefonnr"
                                label={næringsrelasjonTelefonNrLabel}
                                onChange={(v: string) =>
                                    this.handleOnChange({
                                        telefonnummer: v,
                                    })
                                }
                                validators={[
                                    hasValueRule(
                                        telefonnummer,
                                        getMessage(intl, 'næringsrelasjon.tlfnr.påkrevd', { næringsrelasjonsType })
                                    ),
                                    noIllegalCharactersRule(
                                        telefonnummer,
                                        getIllegalCharsErrorMessage(telefonnummer, næringsrelasjonTelefonNrLabel, intl)
                                    ),
                                ]}
                            />
                        </Block>
                        <Block visible={visibility.erNærVennEllerFamilie(næringsrelasjon)}>
                            <ErNærVennEllerFamilieAvPersonSpørsmål
                                erNærVennEllerFamilieAvPerson={erNærVennEllerFamilie}
                                onChange={(v: boolean) =>
                                    this.handleOnChange({
                                        erNærVennEllerFamilie: v,
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
