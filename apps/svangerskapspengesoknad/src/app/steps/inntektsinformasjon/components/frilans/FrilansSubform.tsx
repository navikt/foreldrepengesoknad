import { InntektsinformasjonFormData, InntektsinformasjonFormField } from '../../inntektsinformasjonFormConfig';
import { Block } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FormikErrors } from 'formik';
import FrilansInput from './FrilansInput';
import FrilansVisning from './FrilansVisning';
import { Frilans } from 'app/types/Frilans';
interface Props {
    frilans: Frilans | undefined;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
}
const FrilansSubform: FunctionComponent<Props> = ({
    frilans,
    visibility,
    formValues,
    errors,
    setFieldValue,
    setFrilans,
}) => {
    const [redigererFrilans, setRedigererFrilans] = useState(false);
    const visFrilansInput = (formValues.hattInntektSomFrilans === YesOrNo.YES && !frilans) || redigererFrilans;
    const visFrilansInfo = frilans && !redigererFrilans && formValues.hattInntektSomFrilans === YesOrNo.YES;

    return (
        <div>
            {' '}
            {visFrilansInput && (
                <Block padBottom="l">
                    <FrilansInput
                        visibility={visibility}
                        formValues={formValues as InntektsinformasjonFormData}
                        setFrilans={setFrilans}
                        setRedigererFrilans={setRedigererFrilans}
                        errors={errors}
                        setFieldValue={setFieldValue}
                    />
                </Block>
            )}
            {visFrilansInfo && (
                <Block padBottom="l">
                    <FrilansVisning frilans={frilans!} setRedigererFrilans={setRedigererFrilans} />
                </Block>
            )}
        </div>
    );
};

export default FrilansSubform;
