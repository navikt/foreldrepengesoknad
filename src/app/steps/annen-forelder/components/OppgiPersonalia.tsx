import React from 'react';
import { useIntl } from 'react-intl';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { AnnenForelderFormComponents, AnnenForelderFormField } from '../annenforelderFormConfig';
import Fieldset from 'app/components/fieldset/Fieldset';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';

import './oppgiPersonalia.less';

const bem = bemUtils('oppgiPersonalia');

interface Props {
    fornavn: string | undefined;
    kanIkkeOppgis: boolean | undefined;
    erUtenlandskFnr: boolean | undefined;
    visibility: QuestionVisibility<AnnenForelderFormField, undefined>;
    gjelderAdopsjon: boolean;
    søkersFødselsnummer: string;
}

const OppgiPersonalia: React.FunctionComponent<Props> = ({
    fornavn,
    erUtenlandskFnr,
    kanIkkeOppgis,
    visibility,
    gjelderAdopsjon,
    søkersFødselsnummer,
}) => {
    const intl = useIntl();

    return (
        <div className={bem.block}>
            <Fieldset legend={intlUtils(intl, 'annenForelder.spørsmål.navn')}>
                <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.fornavn)}>
                    <div className={bem.element('nameInputsWrapper')}>
                        <AnnenForelderFormComponents.Input
                            className={bem.element('nameInput')}
                            name={AnnenForelderFormField.fornavn}
                            label={intlUtils(intl, 'annenForelder.spørsmål.fornavn')}
                            disabled={kanIkkeOppgis}
                            // validate={(fornavnValue) =>
                            //     kanIkkeOppgis
                            //         ? undefined
                            //         : validateRequiredField(fornavnValue, 'valideringsfeil.fornavnPåkrevd')
                            // }
                        />
                        <AnnenForelderFormComponents.Input
                            className={bem.element('nameInput')}
                            name={AnnenForelderFormField.etternavn}
                            label={intlUtils(intl, 'annenForelder.spørsmål.etternavn')}
                            disabled={kanIkkeOppgis}
                            // validate={(etternavn) =>
                            //     kanIkkeOppgis
                            //         ? undefined
                            //         : validateRequiredField(etternavn, 'valideringsfeil.etternavnPåkrevd')
                            // }
                        />
                    </div>
                </Block>
                <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.kanIkkeOppgis)}>
                    <AnnenForelderFormComponents.Checkbox
                        name={AnnenForelderFormField.kanIkkeOppgis}
                        label={
                            gjelderAdopsjon
                                ? intlUtils(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : intlUtils(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                    />
                </Block>
            </Fieldset>
            <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.fnr)}>
                <AnnenForelderFormComponents.Input
                    name={AnnenForelderFormField.fnr}
                    label={intlUtils(intl, 'annenForelder.spørsmål.fnr', { navn: fornavn })}
                    // validate={(fnr: string) => validateFødselsnummer(fnr, erUtenlandskFnr, søkersFødselsnummer)}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.utenlandskFnr)}>
                <AnnenForelderFormComponents.Checkbox
                    name={AnnenForelderFormField.utenlandskFnr}
                    label={intlUtils(intl, 'annenForelder.spørsmål.utenlandskFnr', { navn: fornavn })}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.bostedsland)}>
                <AnnenForelderFormComponents.CountrySelect
                    name={AnnenForelderFormField.bostedsland}
                    label={intlUtils(intl, 'annenForelder.bostedsland', { navn: fornavn })}
                    useAlpha3Code={false}
                />
            </Block>
        </div>
    );
};

export default OppgiPersonalia;
