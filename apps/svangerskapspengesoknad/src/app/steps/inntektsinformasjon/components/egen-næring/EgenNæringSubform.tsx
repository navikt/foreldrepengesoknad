import { InntektsinformasjonFormData, InntektsinformasjonFormField } from '../../inntektsinformasjonFormConfig';
import { Block } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FormikErrors } from 'formik';
import EgenNæringInput from './components/EgenNæringInput';
import { Næring } from 'app/types/Næring';
import EgenNæringVisning from './components/EgenNæringVisning';
interface Props {
    næring: Næring | undefined;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    validateForm: any;
}
const EgenNæringSubform: FunctionComponent<Props> = ({
    næring,
    visibility,
    formValues,
    errors,
    setFieldValue,
    setNæring,
    validateForm,
}) => {
    const [redigererNæring, setRedigererNæring] = useState(false);
    const visNæringInput = (formValues.hattInntektSomNæringsdrivende === YesOrNo.YES && !næring) || redigererNæring;
    const visNæringInfo = næring && !redigererNæring && formValues.hattInntektSomNæringsdrivende === YesOrNo.YES;

    return (
        <div>
            {visNæringInput && (
                <Block padBottom="l">
                    <EgenNæringInput
                        visibility={visibility}
                        formValues={formValues as InntektsinformasjonFormData}
                        setNæring={setNæring}
                        setRedigererNæring={setRedigererNæring}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        validateForm={validateForm}
                    />
                </Block>
            )}
            {visNæringInfo && (
                <Block padBottom="l">
                    <EgenNæringVisning næring={næring!} setRedigererNæring={setRedigererNæring} />
                </Block>
            )}
        </div>
    );
};

export default EgenNæringSubform;
