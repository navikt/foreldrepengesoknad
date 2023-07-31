import { FunctionComponent } from 'react';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from '../../../inntektsinformasjonFormConfig';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { guid } from '@navikt/fp-common';
import { FormikErrors } from 'formik';
import ArbeidIUtlandetListElement from './ArbeidIUtlandetListElement';

interface Props {
    andreInntekterIUtlandet: ArbeidIUtlandet[];
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    deleteAnnenInntekt: (inntektSomSlettes: ArbeidIUtlandet) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArbeidIUtlandetList: FunctionComponent<Props> = ({
    andreInntekterIUtlandet,
    visibility,
    formValues,
    errors,
    selectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    deleteAnnenInntekt,
    setFieldValue,
    setSelectedAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
}) => {
    return (
        <>
            {andreInntekterIUtlandet.map((inntekt) => (
                <ArbeidIUtlandetListElement
                    key={guid()}
                    isSelected={selectedAnnenInntekt === inntekt} //TODO - call a function to find out
                    inntekt={inntekt}
                    visibility={visibility}
                    formValues={formValues}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setFieldValue={setFieldValue}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    errors={errors}
                    setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                />
            ))}
        </>
    );
};

export default ArbeidIUtlandetList;
