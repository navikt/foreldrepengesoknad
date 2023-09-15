import { Heading, BodyShort, Button } from '@navikt/ds-react';

import { FieldArray, FieldArrayRenderProps } from 'formik';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from '../../tilretteleggingStepFormConfig';
import { PeriodeMedVariasjon, TilOgMedDatoType, Tilretteleggingstype } from 'app/types/Tilrettelegging';
import { Block, guid, hasValue, intlUtils } from '@navikt/fp-common';
import { useIntl } from 'react-intl';
import { PlusIcon, TrashIcon } from '@navikt/aksel-icons';
import { treUkerSiden } from 'app/utils/dateUtils';
import { validatePeriodeFom, validatePeriodeTom } from './perioderMedVariasjonValidering';
import { validateStillingsprosent } from '../../tilretteleggingValidation';

interface Props {
    formValues: Partial<TilretteleggingFormData>;
    termindato: Date;
    fødselsdato: Date | undefined;
}

const PerioderMedVariasjon: React.FunctionComponent<Props> = ({ formValues, termindato, fødselsdato }) => {
    const intl = useIntl();
    const uferdigDelvisTilretteleggingInput = {
        fom: '',
        tom: '',
        stillingsprosent: '',
        tomType: undefined!,
        type: Tilretteleggingstype.DELVIS,
    } as PeriodeMedVariasjon;

    const minDato = hasValue(formValues.behovForTilretteleggingFom)
        ? formValues.behovForTilretteleggingFom!
        : '2021-01-01'; //TODO - hva skal man ha som minste dato hvis behov fra ikke oppgitt ennå?

    const treUkerFørFødselEllerTermin = treUkerSiden(fødselsdato || termindato);
    return (
        <>
            <Block padBottom="l">
                <Heading size="small">{intlUtils(intl, 'perioder.varierende.heading')}</Heading>
                <BodyShort>{intlUtils(intl, 'perioder.varierende.description')}</BodyShort>
            </Block>
            <FieldArray
                validateOnChange={false}
                name={TilretteleggingFormField.variertePerioder}
                render={(arrayHelpers: FieldArrayRenderProps) =>
                    formValues.variertePerioder &&
                    formValues.variertePerioder.length > 0 &&
                    formValues.variertePerioder.map((_p, index) => (
                        <div key={guid()}>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.DatePicker
                                    key={`variertePerioder.${index}.fom`}
                                    minDate={new Date(minDato)}
                                    maxDate={treUkerSiden(fødselsdato || termindato)}
                                    name={`variertePerioder.${index}.fom`}
                                    label={intlUtils(intl, 'perioder.varierende.fom.label')}
                                    validate={validatePeriodeFom(
                                        intl,
                                        index,
                                        formValues.variertePerioder,
                                        formValues.behovForTilretteleggingFom,
                                        treUkerFørFødselEllerTermin
                                    )}
                                />
                            </Block>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.RadioGroup
                                    name={`variertePerioder.${index}.tomType`}
                                    key={`variertePerioder.${index}.tomType`}
                                    legend={intlUtils(intl, 'perioder.varierende.tomType.label')}
                                    radios={[
                                        {
                                            label: intlUtils(intl, 'perioder.varierende.tomType.valgfriDato'),
                                            value: TilOgMedDatoType.VALGFRI_DATO,
                                        },
                                        {
                                            label: intlUtils(intl, 'perioder.varierende.tomType.treUkerFørTermin'),
                                            value: TilOgMedDatoType.TRE_UKER_FØR_TERMIN,
                                        },
                                    ]}
                                    validate={(value) => {
                                        if (!hasValue(value)) {
                                            return intlUtils(intl, 'valideringsfeil.tomType.påkrevd');
                                        }
                                        return undefined;
                                    }}
                                />
                            </Block>
                            <Block
                                padBottom="xl"
                                visible={formValues.variertePerioder![index].tomType === TilOgMedDatoType.VALGFRI_DATO}
                            >
                                <TilretteleggingFormComponents.DatePicker
                                    key={`variertePerioder.${index}.tom`}
                                    name={`variertePerioder.${index}.tom`}
                                    label={intlUtils(intl, 'perioder.varierende.tom.label')}
                                    validate={validatePeriodeTom(
                                        intl,
                                        index,
                                        formValues.variertePerioder,
                                        treUkerFørFødselEllerTermin
                                    )}
                                />
                            </Block>

                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.TextField
                                    key={`variertePerioder.${index}.stillingsprosent`}
                                    name={`variertePerioder.${index}.stillingsprosent`}
                                    label={intlUtils(intl, 'perioder.varierende.stillingsprosent.label')}
                                    validate={validateStillingsprosent(intl)}
                                    onClick={(e) => e.preventDefault()}
                                />
                            </Block>
                            {index !== 0 && (
                                <Block padBottom="xxxl">
                                    <Button
                                        icon={<TrashIcon />}
                                        type="button"
                                        variant="tertiary"
                                        onClick={() => arrayHelpers.remove(index)}
                                    >
                                        {intlUtils(intl, 'perioder.varierende.slett')}
                                    </Button>
                                </Block>
                            )}
                            {formValues.variertePerioder && index === formValues.variertePerioder.length - 1 && (
                                <Block padBottom="xl">
                                    <Button
                                        icon={<PlusIcon />}
                                        type="button"
                                        variant="secondary"
                                        onClick={() => arrayHelpers.push({ ...uferdigDelvisTilretteleggingInput })}
                                    >
                                        {intlUtils(intl, 'perioder.varierende.leggTil')}
                                    </Button>
                                </Block>
                            )}
                            <Block padBottom="xxl">
                                <hr></hr>
                            </Block>
                        </div>
                    ))
                }
            />
        </>
    );
};
export default PerioderMedVariasjon;
