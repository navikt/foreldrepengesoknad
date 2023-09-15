import { Heading, BodyShort, Button } from '@navikt/ds-react';

import { FieldArray, FieldArrayRenderProps } from 'formik';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from '../../tilretteleggingStepFormConfig';
import { TilretteleggingInput } from 'app/types/Tilrettelegging';
import { Block, guid } from '@navikt/fp-common';

interface Props {
    formValues: Partial<TilretteleggingFormData>;
}

const PerioderMedVariasjon: React.FunctionComponent<Props> = ({ formValues }) => {
    const uferdigDelvisTilretteleggingInput = {
        fom: '',
        tom: '',
        stillingsprosent: '',
    } as TilretteleggingInput;
    return (
        <>
            <Block padBottom="l">
                <Heading size="small">Perioder med forskjellig arbeidsprosent</Heading>
                <BodyShort>
                    Legg til en periode for hver arbeidssituasjon frem til tre uker før fødsel. Da kan du ha rett til
                    foreldrepenger.
                </BodyShort>
            </Block>
            <FieldArray
                validateOnChange={false}
                name={TilretteleggingFormField.variertePerioder}
                render={(arrayHelpers: FieldArrayRenderProps) =>
                    formValues.variertePerioder &&
                    formValues.variertePerioder.length > 0 &&
                    formValues.variertePerioder.map((_p, index) => (
                        <div key={guid()}>
                            <Block padBottom="l">
                                <TilretteleggingFormComponents.DatePicker
                                    key={`variertePerioder.${index}.fom`}
                                    name={`variertePerioder.${index}.fom`}
                                    label="Fra dato"
                                />
                            </Block>
                            <Block padBottom="l">
                                <TilretteleggingFormComponents.DatePicker
                                    key={`variertePerioder.${index}.tom`}
                                    name={`variertePerioder.${index}.tom`}
                                    label="Til dato"
                                />
                            </Block>

                            <Block padBottom="l">
                                <TilretteleggingFormComponents.TextField
                                    key={`variertePerioder.${index}.stillingsprosent`}
                                    name={`variertePerioder.${index}.stillingsprosent`}
                                    label="Stillingsprosent"
                                />
                            </Block>
                            {index !== 0 && (
                                <Block padBottom="l">
                                    <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                                        Slett
                                    </Button>
                                </Block>
                            )}
                            {formValues.variertePerioder && index === formValues.variertePerioder.length - 1 && (
                                <Block padBottom="l">
                                    <Button
                                        type="button"
                                        onClick={() => arrayHelpers.push({ ...uferdigDelvisTilretteleggingInput })}
                                    >
                                        Legg til
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
