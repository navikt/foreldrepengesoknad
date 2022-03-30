import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateFødselsdato, validateTermindatoFødsel } from '../validation/omBarnetValidering';

interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const Fødsel: FunctionComponent<Props> = ({ søkersituasjon, formValues, visibility }) => {
    const { erBarnetFødt, antallBarn, fødselsdatoer } = formValues;

    const intl = useIntl();
    const intlIdFødsel =
        antallBarn !== undefined && parseInt(antallBarn, 10) > 1
            ? 'omBarnet.fødselsdato.flereBarn'
            : 'omBarnet.fødselsdato';

    if (søkersituasjon.situasjon === 'adopsjon' || erBarnetFødt !== YesOrNo.YES) {
        return null;
    }

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.antallBarn)}>
                <OmBarnetFormComponents.RadioPanelGroup
                    name={OmBarnetFormField.antallBarn}
                    radios={[
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.ettBarn'),
                            value: '1',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.tvillinger'),
                            value: '2',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.flere'),
                            value: '3',
                        },
                    ]}
                    useTwoColumns={true}
                    legend={intlUtils(intl, 'omBarnet.antallBarn.født')}
                />
            </Block>
            <Block padBottom="l" visible={antallBarn !== undefined && parseInt(antallBarn, 10) >= 3}>
                <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarnSelect}>
                    <option value="" />
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </OmBarnetFormComponents.Select>
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.fødselsdatoer)}>
                <FieldArray
                    name={OmBarnetFormField.fødselsdatoer}
                    render={() => [
                        <OmBarnetFormComponents.DatePicker
                            key={`${OmBarnetFormField.fødselsdatoer}.0`}
                            name={`${OmBarnetFormField.fødselsdatoer}.0` as OmBarnetFormField}
                            label={intlUtils(intl, intlIdFødsel)}
                            minDate={dayjs().subtract(6, 'months').toDate()}
                            maxDate={dayjs().toDate()}
                            validate={validateFødselsdato(intl)}
                            placeholder={'dd.mm.åååå'}
                        />,
                    ]}
                />
            </Block>
            <Block visible={visibility.isVisible(OmBarnetFormField.termindato)}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.termindato}
                    label={intlUtils(intl, 'omBarnet.termindato.født')}
                    minDate={dayjs(fødselsdatoer[0]).subtract(1, 'months').toDate()}
                    maxDate={dayjs(fødselsdatoer[0]).add(6, 'months').toDate()}
                    placeholder={'dd.mm.åååå'}
                    validate={validateTermindatoFødsel(fødselsdatoer[0], intl)}
                />
            </Block>
        </>
    );
};

export default Fødsel;
