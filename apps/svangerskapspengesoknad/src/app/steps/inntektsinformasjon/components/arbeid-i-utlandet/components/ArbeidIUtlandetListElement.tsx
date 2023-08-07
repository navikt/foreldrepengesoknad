import { FunctionComponent } from 'react';
import ArbeidIUtlandetVisning from './ArbeidIUtlandetVisning';
import ArbeidIUtlandetInput from './ArbeidIUtlandetInput';
import { InntektsinformasjonFormData } from '../../../inntektsinformasjonFormConfig';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { Block, guid } from '@navikt/fp-common';
import { FormikErrors } from 'formik';

interface Props {
    inntekt: ArbeidIUtlandet;
    isSelected: boolean;
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    leggerTilNyttArbeidIUtlandet: boolean;
    addAnnenInntekt: (inntekt: ArbeidIUtlandet) => void;
    editAnnenInntekt: (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => void;
    deleteAnnenInntekt: (inntektSomSlettes: ArbeidIUtlandet) => void;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
    setLeggTilNyttArbeidIUtlandet: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArbeidIUtlandetListElement: FunctionComponent<Props> = ({
    isSelected,
    inntekt,
    errors,
    formValues,
    selectedAnnenInntekt,
    leggerTilNyttArbeidIUtlandet,
    setSelectedAnnenInntekt,
    deleteAnnenInntekt,
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
                        leggerTilNyttArbeidIUtlandet={leggerTilNyttArbeidIUtlandet}
                        annenInntektBlirRedigert={!!selectedAnnenInntekt}
                    />
                )}
                {isSelected && (
                    <ArbeidIUtlandetInput
                        formValues={formValues as InntektsinformasjonFormData}
                        errors={errors}
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
