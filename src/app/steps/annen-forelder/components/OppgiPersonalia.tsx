import React from 'react';
import { useIntl } from 'react-intl';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { AnnenForelderFormComponents, AnnenForelderFormField } from '../annenforelderFormConfig';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';
import { validateEtternavn, validateFornavn } from '../validation/annenForelderValidering';
import { validateFødselsnummer } from 'app/utils/validationUtil';
import { Element } from 'nav-frontend-typografi';

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

    return (
        <div className={bem.block}>
            <SkjemaGruppe legend={<Element>{intlUtils(intl, 'annenForelder.spørsmål.navn')}</Element>}>
                <Block visible={visibility.isVisible(AnnenForelderFormField.fornavn)}>
                    <div className={bem.element('nameInputsWrapper')}>
                        <AnnenForelderFormComponents.Input
                            className={bem.element('nameInput')}
                            name={AnnenForelderFormField.fornavn}
                            label={intlUtils(intl, 'annenForelder.spørsmål.fornavn')}
                            disabled={kanIkkeOppgis}
                            validate={validateFornavn(intl, kanIkkeOppgis)}
                        />
                        <AnnenForelderFormComponents.Input
                            className={bem.element('nameInput')}
                            name={AnnenForelderFormField.etternavn}
                            label={intlUtils(intl, 'annenForelder.spørsmål.etternavn')}
                            disabled={kanIkkeOppgis}
                            validate={validateEtternavn(intl, kanIkkeOppgis)}
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
            </SkjemaGruppe>
            <Block padBottom="l" visible={visibility.isVisible(AnnenForelderFormField.fnr)}>
                <AnnenForelderFormComponents.Input
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
