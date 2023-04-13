import React from 'react';
import { useIntl } from 'react-intl';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { AnnenForelderFormComponents, AnnenForelderFormField } from '../annenforelderFormConfig';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { validateEtternavn, validateFornavn } from '../validation/annenForelderValidering';
import { validateFødselsnummer } from 'app/utils/validationUtil';
import { Label } from '@navikt/ds-react';

import './oppgiPersonalia.less';

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
    const bem = bemUtils('oppgiPersonalia');
    const fornavnLabel = intlUtils(intl, 'annenForelder.spørsmål.fornavn');
    const etternavnLabel = intlUtils(intl, 'annenForelder.spørsmål.etternavn');
    return (
        <div className={bem.block}>
            <div className={bem.block}>
                <legend>
                    <Label>{intlUtils(intl, 'annenForelder.spørsmål.navn')}</Label>
                </legend>
                <Block visible={visibility.isVisible(AnnenForelderFormField.fornavn)}>
                    <div className={bem.element('nameInputsWrapper')}>
                        <AnnenForelderFormComponents.TextField
                            className={bem.element('nameInput')}
                            name={AnnenForelderFormField.fornavn}
                            label={fornavnLabel}
                            disabled={kanIkkeOppgis}
                            validate={validateFornavn(intl, fornavnLabel, kanIkkeOppgis)}
                        />
                        <AnnenForelderFormComponents.TextField
                            className={bem.element('nameInput')}
                            name={AnnenForelderFormField.etternavn}
                            label={intlUtils(intl, 'annenForelder.spørsmål.etternavn')}
                            disabled={kanIkkeOppgis}
                            validate={validateEtternavn(intl, etternavnLabel, kanIkkeOppgis)}
                        />
                    </div>
                </Block>
                <Block visible={visibility.isVisible(AnnenForelderFormField.kanIkkeOppgis)}>
                    <AnnenForelderFormComponents.Checkbox
                        name={AnnenForelderFormField.kanIkkeOppgis}
                        label={
                            gjelderAdopsjon
                                ? intlUtils(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : intlUtils(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                    />
                </Block>
            </div>
            <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.fnr)}>
                <AnnenForelderFormComponents.TextField
                    name={AnnenForelderFormField.fnr}
                    label={intlUtils(intl, 'annenForelder.spørsmål.fnr', { navn: fornavn })}
                    validate={validateFødselsnummer(intl, søkersFødselsnummer, erUtenlandskFnr)}
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
