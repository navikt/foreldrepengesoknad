import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { NæringsrelasjonPartial } from '../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Input from 'nav-frontend-skjema/lib/input';
import { InputChangeEvent } from '../types/dom/Events';
import getMessage from 'common/util/i18nUtils';
import ErNærVennEllerFamilieAvPersonSpørsmål from '../spørsmål/ErNærVennEllerFamilieAvPersonSpørsmål';

interface NæringsrelasjonBolkProps {
    næringsrelasjon: NæringsrelasjonPartial;
    renderSpørsmål: () => JSX.Element;
    oppfølgingsspørsmålSynlig: boolean;
    onChange: (updatedProps: NæringsrelasjonPartial) => void;
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
        const {
            næringsrelasjon,
            renderSpørsmål,
            oppfølgingsspørsmålSynlig,
            intl
        } = this.props;
        const { navn, telefonnummer, erNærVennEllerFamilie } = næringsrelasjon;
        return (
            <React.Fragment>
                {renderSpørsmål()}
                {oppfølgingsspørsmålSynlig && (
                    <React.Fragment>
                        <Spørsmål
                            render={() => (
                                <Input
                                    value={navn || ''}
                                    label={getMessage(
                                        intl,
                                        'næringsrelasjon.navn'
                                    )}
                                    onChange={(e: InputChangeEvent) =>
                                        this.handleOnChange({
                                            navn: e.target.value
                                        })
                                    }
                                />
                            )}
                        />
                        <Spørsmål
                            render={() => (
                                <Input
                                    value={telefonnummer || ''}
                                    label={getMessage(
                                        intl,
                                        'næringsrelasjon.tlfnr'
                                    )}
                                    onChange={(e: InputChangeEvent) =>
                                        this.handleOnChange({
                                            telefonnummer: e.target.value
                                        })
                                    }
                                />
                            )}
                        />
                        <Spørsmål
                            render={() => (
                                <ErNærVennEllerFamilieAvPersonSpørsmål
                                    erNærVennEllerFamilieAvPerson={
                                        erNærVennEllerFamilie
                                    }
                                    onChange={(v: boolean) =>
                                        this.handleOnChange({
                                            erNærVennEllerFamilie: v
                                        })
                                    }
                                />
                            )}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default injectIntl(NæringsrelasjonBolk);
