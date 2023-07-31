import { Button, Heading } from '@navikt/ds-react';
import { InntektsinformasjonFormData, InntektsinformasjonFormField } from '../../inntektsinformasjonFormConfig';
import ArbeidIUtlandetInput from './components/ArbeidIUtlandetInput';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { FormikErrors } from 'formik';
import ArbeidIUtlandetList from './components/ArbeidIUtlandetList';
interface Props {
    arbeidIUtlandet: ArbeidIUtlandet[];
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setArbeidIUtlandet: React.Dispatch<React.SetStateAction<ArbeidIUtlandet[]>>;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
}
const ArbeidIUtlandetSubform: FunctionComponent<Props> = ({
    arbeidIUtlandet,
    visibility,
    formValues,
    errors,
    selectedAnnenInntekt,
    setFieldValue,
    setArbeidIUtlandet,
    setSelectedAnnenInntekt,
}) => {
    const intl = useIntl();
    const [leggTilNyttArbeidIUtlandet, setLeggTilNyttArbeidIUtlandet] = useState(false);

    const addAnnenInntekt = (annenInntekt: ArbeidIUtlandet) => {
        const updatedandreInntekterInformasjon = arbeidIUtlandet.concat(annenInntekt);
        setArbeidIUtlandet(updatedandreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
        setLeggTilNyttArbeidIUtlandet(false);
    };

    const deleteAnnenInntekt = (inntektSomSlettes: ArbeidIUtlandet) => {
        const updatedAndreInntekterInformasjon = arbeidIUtlandet.filter((inntekt) => inntekt !== inntektSomSlettes);
        setArbeidIUtlandet(updatedAndreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
    };

    const editAnnenInntekt = (inntektSomEditeres: ArbeidIUtlandet, oppdatertInntekt: ArbeidIUtlandet) => {
        const updatedAndreInntekterInformasjon = arbeidIUtlandet
            .filter((inntekt) => inntekt !== inntektSomEditeres)
            .concat(oppdatertInntekt);
        setSelectedAnnenInntekt(undefined);
        setArbeidIUtlandet(updatedAndreInntekterInformasjon);
    };

    const handleOnLeggTilArbeidIUtlandet = () => {
        setLeggTilNyttArbeidIUtlandet(true);
        setSelectedAnnenInntekt(undefined);
    };

    return (
        <div>
            {formValues.hattAndreInntekter === YesOrNo.YES && (
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.tittel')}
                </Heading>
            )}
            {arbeidIUtlandet.length > 0 && (
                <ArbeidIUtlandetList
                    andreInntekterIUtlandet={arbeidIUtlandet}
                    visibility={visibility}
                    formValues={formValues as InntektsinformasjonFormData}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                />
            )}
            {(leggTilNyttArbeidIUtlandet ||
                (formValues.hattAndreInntekter === YesOrNo.YES && arbeidIUtlandet.length === 0)) && (
                <ArbeidIUtlandetInput
                    visibility={visibility}
                    formValues={formValues as InntektsinformasjonFormData}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    erFørsteInput={arbeidIUtlandet.length === 0}
                    setLeggTilNyttArbeidIUtlandet={setLeggTilNyttArbeidIUtlandet}
                />
            )}
            {formValues.hattAndreInntekter === YesOrNo.YES && arbeidIUtlandet.length > 0 && (
                <Block padBottom="xl">
                    <Button
                        aria-label="legg til ny informasjon om arbeid i utlandet"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilArbeidIUtlandet}
                    >
                        <FormattedMessage id="inntektsinformasjon.arbeidIUtlandet.leggTil" />
                    </Button>
                </Block>
            )}
        </div>
    );
};

export default ArbeidIUtlandetSubform;
