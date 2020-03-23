import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';

import { AnnenForelderFormComponents, AnnenForelderFieldNames } from '../formTypes/annenforelderFormTypes';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { validateRequiredField, validateFødselsnummer } from 'app/validation/fieldValidations';

import './oppgiPersonalia.less';

const bem = BEMHelper('oppgiPersonalia');

interface Props {
    intl: InjectedIntl;
    fornavn: string;
    erUtenlandskFnr: boolean;
}

const OppgiPersonalia: React.FunctionComponent<Props> = ({ fornavn, erUtenlandskFnr, intl }) => {
    return (
        <div className={bem.block}>
            <Block margin="xxs">
                <Element>{getMessage(intl, 'annenForelder.spørsmål.navn')}</Element>
            </Block>
            <Block margin="xs">
                <div className={bem.element('nameInputsWrapper')}>
                    <AnnenForelderFormComponents.Input
                        className={bem.element('nameInput')}
                        name={AnnenForelderFieldNames.fornavn}
                        label={getMessage(intl, 'annenForelder.spørsmål.fornavn')}
                        validate={validateRequiredField}
                    />
                    <AnnenForelderFormComponents.Input
                        className={bem.element('nameInput')}
                        name={AnnenForelderFieldNames.etternavn}
                        label={getMessage(intl, 'annenForelder.spørsmål.etternavn')}
                    />
                </div>
            </Block>
            <Block>
                <AnnenForelderFormComponents.Checkbox
                    name={AnnenForelderFieldNames.kanIkkeOppgis}
                    label={getMessage(intl, 'annenForelder.spørsmål.kanOppgis')}
                />
            </Block>
            <Block margin="xs">
                <AnnenForelderFormComponents.Input
                    name={AnnenForelderFieldNames.fnr}
                    label={getMessage(intl, 'annenForelder.spørsmål.fnr', { navn: fornavn })}
                    validate={(fnr: string) => validateFødselsnummer(fnr, erUtenlandskFnr)}
                />
            </Block>
            <Block>
                <AnnenForelderFormComponents.Checkbox
                    name={AnnenForelderFieldNames.utenlandskFnr}
                    label={getMessage(intl, 'annenForelder.spørsmål.utenlandskFnr', { navn: fornavn })}
                />
            </Block>
        </div>
    );
};

export default injectIntl(OppgiPersonalia);
