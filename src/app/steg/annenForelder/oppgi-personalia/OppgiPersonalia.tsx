import React from 'react';
import { useIntl } from 'react-intl';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import Block from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import Fieldset from 'app/temp-components/Fieldset';
import { validateFødselsnummer, validateRequiredField } from 'app/validation/fieldValidations';
import { AnnenForelderFieldNames, AnnenForelderFormComponents } from '../form/annenforelderFormTypes';
import './oppgiPersonalia.less';

const bem = BEMHelper('oppgiPersonalia');

interface Props {
    fornavn: string;
    kanIkkeOppgis: boolean;
    erUtenlandskFnr: boolean;
    visibility: QuestionVisibility<AnnenForelderFieldNames, undefined>;
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
            <Fieldset legend={getMessage(intl, 'annenForelder.spørsmål.navn')}>
                <Block margin="xs" visible={visibility.isVisible(AnnenForelderFieldNames.fornavn)}>
                    <div className={bem.element('nameInputsWrapper')}>
                        <AnnenForelderFormComponents.Input
                            className={bem.element('nameInput')}
                            name={AnnenForelderFieldNames.fornavn}
                            label={getMessage(intl, 'annenForelder.spørsmål.fornavn')}
                            disabled={kanIkkeOppgis}
                            validate={(fornavnValue) =>
                                kanIkkeOppgis
                                    ? undefined
                                    : validateRequiredField(fornavnValue, 'valideringsfeil.fornavnPåkrevd')
                            }
                        />
                        <AnnenForelderFormComponents.Input
                            className={bem.element('nameInput')}
                            name={AnnenForelderFieldNames.etternavn}
                            label={getMessage(intl, 'annenForelder.spørsmål.etternavn')}
                            disabled={kanIkkeOppgis}
                            validate={(etternavn) =>
                                kanIkkeOppgis
                                    ? undefined
                                    : validateRequiredField(etternavn, 'valideringsfeil.etternavnPåkrevd')
                            }
                        />
                    </div>
                </Block>
                <Block visible={visibility.isVisible(AnnenForelderFieldNames.kanIkkeOppgis)}>
                    <AnnenForelderFormComponents.Checkbox
                        name={AnnenForelderFieldNames.kanIkkeOppgis}
                        label={
                            gjelderAdopsjon
                                ? getMessage(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : getMessage(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                    />
                </Block>
            </Fieldset>
            <Block margin="xs" visible={visibility.isVisible(AnnenForelderFieldNames.fnr)}>
                <AnnenForelderFormComponents.Input
                    name={AnnenForelderFieldNames.fnr}
                    label={getMessage(intl, 'annenForelder.spørsmål.fnr', { navn: fornavn })}
                    validate={(fnr: string) => validateFødselsnummer(fnr, erUtenlandskFnr, søkersFødselsnummer)}
                />
            </Block>
            <Block visible={visibility.isVisible(AnnenForelderFieldNames.utenlandskFnr)}>
                <AnnenForelderFormComponents.Checkbox
                    name={AnnenForelderFieldNames.utenlandskFnr}
                    label={getMessage(intl, 'annenForelder.spørsmål.utenlandskFnr', { navn: fornavn })}
                />
            </Block>
            <Block visible={visibility.isVisible(AnnenForelderFieldNames.bostedsland)}>
                <AnnenForelderFormComponents.CountrySelect
                    name={AnnenForelderFieldNames.bostedsland}
                    label={getMessage(intl, 'annenForelder.bostedsland', { navn: fornavn })}
                    useAlpha3Code={false}
                />
            </Block>
        </div>
    );
};

export default OppgiPersonalia;
