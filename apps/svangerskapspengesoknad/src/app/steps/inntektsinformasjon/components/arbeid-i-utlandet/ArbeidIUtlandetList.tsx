import { FunctionComponent } from 'react';
import ArbeidIUtlandetVisning from './ArbeidIUtlandetVisning';
import ArbeidIUtlandetInput from './ArbeidIUtlandetInput';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from '../../inntektsinformasjonFormConfig';
import { AnnenInntektIUtlandet } from 'app/types/AnnenInntektIUtlandet';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { Block, guid } from '@navikt/fp-common';

interface Props {
    andreInntekterIUtlandet: AnnenInntektIUtlandet[];
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    // setRedigererArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
    errors: any;
    selectedAnnenInntekt: AnnenInntektIUtlandet | undefined;
    addAnnenInntekt: any;
    editAnnenInntekt: any;
    deleteAnnenInntekt: any;
    setFieldValue: any;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<AnnenInntektIUtlandet | undefined>>;
}

interface VisningEllerInputProps {
    inntekt: AnnenInntektIUtlandet;
    isSelected: boolean;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    // setRedigererArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
    errors: any;
    selectedAnnenInntekt: AnnenInntektIUtlandet | undefined;
    addAnnenInntekt: any;
    editAnnenInntekt: any;
    deleteAnnenInntekt: any;
    setFieldValue: any;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<AnnenInntektIUtlandet | undefined>>;
}

const ArbeidIUtlandetVisningEllerInput: FunctionComponent<VisningEllerInputProps> = ({
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
                    />
                )}
            </Block>
        </div>
    );
};

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
}) => {
    return (
        <>
            {andreInntekterIUtlandet.map((inntekt) => (
                <ArbeidIUtlandetVisningEllerInput
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
                />
            ))}
        </>
    );
};

export default ArbeidIUtlandetList;
