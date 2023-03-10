import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { AnnenInntekt } from 'app/context/types/AnnenInntekt';
import { Knapp } from 'nav-frontend-knapper';
import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import AndreInntekterListe from './AndreInntekterListe';
import AndreInntekterModal from './modal/AndreInntekterModal';

interface Props {
    andreInntekterInformasjon: AnnenInntekt[];
    setAndreInntekterInformasjon: any;
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
}

const AndreInntekter: FunctionComponent<Props> = ({
    andreInntekterInformasjon,
    setAndreInntekterInformasjon,
    visibility,
    formValues,
}) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnnenInntekt, setSelectedAnnenInntekt] = useState<AnnenInntekt>();

    const handleOnLeggTil = () => {
        setIsModalOpen(true);
    };

    const addAnnenInntekt = (annenInntekt: AnnenInntekt) => {
        const updatedandreInntekterInformasjon = andreInntekterInformasjon.concat(annenInntekt);

        setAndreInntekterInformasjon(updatedandreInntekterInformasjon);
    };

    const deleteAnnenInntekt = (annenInntekt: AnnenInntekt) => {
        const updatedAndreInntekterInformasjon = andreInntekterInformasjon.filter(
            (inntekt) => inntekt !== annenInntekt
        );

        setAndreInntekterInformasjon(updatedAndreInntekterInformasjon);
    };

    const editAnnenInntekt = (annenInntekt: AnnenInntekt) => {
        const updatedAndreInntekterInformasjon = andreInntekterInformasjon
            .filter((inntekt) => inntekt !== selectedAnnenInntekt)
            .concat(annenInntekt);

        setAndreInntekterInformasjon(updatedAndreInntekterInformasjon);
    };

    const selectAnnenInntekt = (annenInntekt: AnnenInntekt) => {
        setSelectedAnnenInntekt(annenInntekt);
        setIsModalOpen(true);
    };

    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(InntektsinformasjonFormField.hattAndreInntekter)}>
                <InntektsinformasjonFormComponents.YesOrNoQuestion
                    name={InntektsinformasjonFormField.hattAndreInntekter}
                    legend={intlUtils(intl, 'inntektsinformasjon.annenInntekt')}
                    validate={(hattAndreInntekter) => {
                        if (hattAndreInntekter === YesOrNo.YES) {
                            if (andreInntekterInformasjon.length === 0) {
                                return intlUtils(
                                    intl,
                                    'valideringsfeil.inntektsinformasjon.andreInntekter.måHaOppdrag'
                                );
                            }
                        }

                        return undefined;
                    }}
                />
            </Block>
            {formValues.hattAndreInntekter === YesOrNo.YES && (
                <div style={{ backgroundColor: '#f1f1f1', marginBottom: '1rem', padding: '1rem' }}>
                    <AndreInntekterModal
                        isOpen={isModalOpen}
                        contentLabel={intlUtils(intl, 'inntektsinformasjon.andreInntekterModal.contentLabel')}
                        onRequestClose={() => setIsModalOpen(false)}
                        selectedAnnenInntekt={selectedAnnenInntekt}
                        addAnnenInntekt={addAnnenInntekt}
                        editAnnenInntekt={editAnnenInntekt}
                    />
                    <Block padBottom="l" visible={andreInntekterInformasjon.length > 0}>
                        <AndreInntekterListe
                            andreInntekter={andreInntekterInformasjon}
                            deleteAnnenInntekt={deleteAnnenInntekt}
                            selectAnnenInntekt={selectAnnenInntekt}
                        />
                    </Block>
                    <Knapp htmlType="button" onClick={handleOnLeggTil}>
                        <FormattedMessage id="inntektsinformasjon.leggTilOppdrag" />
                    </Knapp>
                </div>
            )}
        </>
    );
};

export default AndreInntekter;
