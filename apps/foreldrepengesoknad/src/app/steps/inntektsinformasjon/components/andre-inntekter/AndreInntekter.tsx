import { Block, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { AnnenInntekt } from 'app/context/types/AnnenInntekt';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    InntektsinformasjonFormComponents,
    InntektsinformasjonFormData,
    InntektsinformasjonFormField,
} from '../../inntektsinformasjonFormConfig';
import AndreInntekterListe from './AndreInntekterListe';
import AndreInntekterModal from './modal/AndreInntekterModal';
import { Button } from '@navikt/ds-react';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { Attachment } from '@navikt/fp-types';

interface Props {
    andreInntekterInformasjon: AnnenInntekt[];
    setAndreInntekterInformasjon: any;
    setAndreInntekerVedlegg: (attachments: Attachment[]) => void;
    andreInntekterVedlegg: Attachment[];
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
}

const AndreInntekter: FunctionComponent<Props> = ({
    andreInntekterInformasjon,
    setAndreInntekterInformasjon,
    setAndreInntekerVedlegg,
    visibility,
    formValues,
    andreInntekterVedlegg,
}) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnnenInntekt, setSelectedAnnenInntekt] = useState<AnnenInntekt>();

    const handleOnLeggTil = () => {
        setIsModalOpen(true);
    };

    const addAnnenInntekt = (annenInntekt: AnnenInntekt, vedlegg: Attachment[]) => {
        const updatedandreInntekterInformasjon = andreInntekterInformasjon.concat(annenInntekt);

        setAndreInntekerVedlegg(vedlegg);
        setAndreInntekterInformasjon(updatedandreInntekterInformasjon);
    };

    const deleteAnnenInntekt = (annenInntekt: AnnenInntekt) => {
        const updatedAndreInntekterInformasjon = andreInntekterInformasjon.filter(
            (inntekt) => inntekt !== annenInntekt,
        );

        setAndreInntekerVedlegg([]);
        setAndreInntekterInformasjon(updatedAndreInntekterInformasjon);
    };

    const editAnnenInntekt = (annenInntekt: AnnenInntekt, vedlegg: Attachment[]) => {
        const updatedAndreInntekterInformasjon = andreInntekterInformasjon
            .filter((inntekt) => inntekt !== selectedAnnenInntekt)
            .concat(annenInntekt);

        setAndreInntekerVedlegg(vedlegg);
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
                                    'valideringsfeil.inntektsinformasjon.andreInntekter.måHaOppdrag',
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
                        andreInntekterVedlegg={andreInntekterVedlegg}
                    />
                    <Block padBottom="l" visible={andreInntekterInformasjon.length > 0}>
                        <AndreInntekterListe
                            andreInntekter={andreInntekterInformasjon}
                            deleteAnnenInntekt={deleteAnnenInntekt}
                            selectAnnenInntekt={selectAnnenInntekt}
                        />
                    </Block>
                    <Button type="button" onClick={handleOnLeggTil}>
                        <FormattedMessage id="inntektsinformasjon.leggTilOppdrag" />
                    </Button>
                </div>
            )}
        </>
    );
};

export default AndreInntekter;
