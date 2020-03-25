import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { Element } from 'nav-frontend-typografi';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';

import { AnnenForelderFormComponents, AnnenForelderFieldNames } from '../form/annenforelderFormTypes';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { validateFødselsnummer } from 'app/validation/fieldValidations';

import './oppgiPersonalia.less';

const bem = BEMHelper('oppgiPersonalia');

interface Props {
    intl: InjectedIntl;
    fornavn: string;
    kanIkkeOppgis: boolean;
    erUtenlandskFnr: boolean;
    visibility: QuestionVisibility<AnnenForelderFieldNames, undefined>;
    gjelderAdopsjon: boolean;
}

const OppgiPersonalia: React.FunctionComponent<Props> = ({
    fornavn,
    erUtenlandskFnr,
    kanIkkeOppgis,
    visibility,
    gjelderAdopsjon,
    intl
}) => {
    return (
        <div className={bem.block}>
            <Block margin="xxs">
                <Element>{getMessage(intl, 'annenForelder.spørsmål.navn')}</Element>
            </Block>
            <Block margin="xs" visible={visibility.isVisible(AnnenForelderFieldNames.fornavn)}>
                <div className={bem.element('nameInputsWrapper')}>
                    <AnnenForelderFormComponents.Input
                        className={bem.element('nameInput')}
                        name={AnnenForelderFieldNames.fornavn}
                        label={getMessage(intl, 'annenForelder.spørsmål.fornavn')}
                        disabled={kanIkkeOppgis}
                    />
                    <AnnenForelderFormComponents.Input
                        className={bem.element('nameInput')}
                        name={AnnenForelderFieldNames.etternavn}
                        label={getMessage(intl, 'annenForelder.spørsmål.etternavn')}
                        disabled={kanIkkeOppgis}
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
            <Block margin="xs" visible={visibility.isVisible(AnnenForelderFieldNames.fnr)}>
                <AnnenForelderFormComponents.Input
                    name={AnnenForelderFieldNames.fnr}
                    label={getMessage(intl, 'annenForelder.spørsmål.fnr', { navn: fornavn })}
                    validate={(fnr: string) => validateFødselsnummer(fnr, erUtenlandskFnr)}
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
                    label={getMessage(intl, 'annenForelder.spørsmål.fnr', { navn: fornavn })}
                />
            </Block>
        </div>
    );
};

export default injectIntl(OppgiPersonalia);
