import { Button, Heading } from '@navikt/ds-react';
import { InntektsinformasjonFormData } from '../../inntektsinformasjonFormConfig';
import ArbeidIUtlandetInput from './components/ArbeidIUtlandetInput';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { ArbeidIUtlandet } from 'app/types/ArbeidIUtlandet';
import { FormikErrors } from 'formik';
import ArbeidIUtlandetList from './components/ArbeidIUtlandetList';
interface Props {
    arbeidIUtlandet: ArbeidIUtlandet[];
    formValues: InntektsinformasjonFormData;
    errors: FormikErrors<Partial<InntektsinformasjonFormData>>;
    selectedAnnenInntekt: ArbeidIUtlandet | undefined;
    setArbeidIUtlandet: React.Dispatch<React.SetStateAction<ArbeidIUtlandet[]>>;
    setSelectedAnnenInntekt: React.Dispatch<React.SetStateAction<ArbeidIUtlandet | undefined>>;
}
const ArbeidIUtlandetComponent: FunctionComponent<Props> = ({
    arbeidIUtlandet,
    formValues,
    errors,
    selectedAnnenInntekt,
    // setFieldValue,
    setArbeidIUtlandet,
    setSelectedAnnenInntekt,
}) => {
    const intl = useIntl();
    const [leggerTilNyttArbeidIUtlandet, setLeggerTilNyttArbeidIUtlandet] = useState(false);

    const addAnnenInntekt = (annenInntekt: ArbeidIUtlandet) => {
        const updatedandreInntekterInformasjon = arbeidIUtlandet.concat(annenInntekt);
        setArbeidIUtlandet(updatedandreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
        setLeggerTilNyttArbeidIUtlandet(false);
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
        setLeggerTilNyttArbeidIUtlandet(true);
        setSelectedAnnenInntekt(undefined);
    };

    return (
        <div>
            {formValues.hattArbeidIUtlandet === YesOrNo.YES && (
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.arbeidIUtlandet.tittel')}
                </Heading>
            )}
            {arbeidIUtlandet.length > 0 && (
                <ArbeidIUtlandetList
                    andreInntekterIUtlandet={arbeidIUtlandet}
                    formValues={formValues as InntektsinformasjonFormData}
                    errors={errors}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    deleteAnnenInntekt={deleteAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    setLeggTilNyttArbeidIUtlandet={setLeggerTilNyttArbeidIUtlandet}
                    leggerTilNyttArbeidIUtlandet={leggerTilNyttArbeidIUtlandet}
                />
            )}
            {(leggerTilNyttArbeidIUtlandet ||
                (formValues.hattArbeidIUtlandet === YesOrNo.YES && arbeidIUtlandet.length === 0)) && (
                <ArbeidIUtlandetInput
                    formValues={formValues as InntektsinformasjonFormData}
                    errors={errors}
                    selectedAnnenInntekt={selectedAnnenInntekt}
                    addAnnenInntekt={addAnnenInntekt}
                    editAnnenInntekt={editAnnenInntekt}
                    setSelectedAnnenInntekt={setSelectedAnnenInntekt}
                    erFørsteInput={arbeidIUtlandet.length === 0}
                    setLeggTilNyttArbeidIUtlandet={setLeggerTilNyttArbeidIUtlandet}
                />
            )}
            {formValues.hattArbeidIUtlandet === YesOrNo.YES && arbeidIUtlandet.length > 0 && (
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

export default ArbeidIUtlandetComponent;
