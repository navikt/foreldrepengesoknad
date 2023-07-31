import { FunctionComponent } from 'react';
import ArbeidIUtlandetVisning from './ArbeidIUtlandetVisning';
import ArbeidIUtlandetInput from './ArbeidIUtlandetInput';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from '../../../inntektsinformasjonFormConfig';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Block, guid } from '@navikt/fp-common';
import { FormikErrors } from 'formik';

interface Props {
    inntekt: ArbeidIUtlandet;
    isSelected: boolean;
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

const ArbeidIUtlandetListElement: FunctionComponent<Props> = ({
    isSelected,
    inntekt,
    visibility,
    setSelectedAnnenInntekt,
    deleteAnnenInntekt,
    errors,
    formValues,
    setFieldValue,
    selectedAnnenInntekt,
    addAnnenInntekt,
    editAnnenInntekt,
    setLeggTilNyttArbeidIUtlandet,
}) => {
    return (
        <div key={guid()}>
            <Block padBottom="s">
                {!isSelected && (
                    <ArbeidIUtlandetVisning
                        arbeidIUtlandet={inntekt}
                        setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                        deleteAnnenInntekt={deleteAnnenInntekt}
                        setFieldValue={setFieldValue}
                    />
                )}
                {isSelected && (
                    <ArbeidIUtlandetInput
                        visibility={visibility}
                        formValues={formValues as InntektsinformasjonFormData}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        selectedAnnenInntekt={selectedAnnenInntekt}
                        addAnnenInntekt={addAnnenInntekt}
                        editAnnenInntekt={editAnnenInntekt}
                        setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                        erFørsteInput={false}
                        setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                    />
                )}
            </Block>
        </div>
    );
};

export default ArbeidIUtlandetListElement;
