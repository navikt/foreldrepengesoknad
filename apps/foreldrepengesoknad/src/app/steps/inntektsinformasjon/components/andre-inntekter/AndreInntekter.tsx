import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '@navikt/ds-react';

import { Block, intlUtils } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';

import { AnnenInntekt, AnnenInntektType } from 'app/context/types/AnnenInntekt';

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
    setEtterlønnVedlegg: (attachments: Attachment[]) => void;
    setMilitærVedlegg: (attachments: Attachment[]) => void;
    etterlønnVedlegg: Attachment[];
    militærVedlegg: Attachment[];
    visibility: QuestionVisibility<InntektsinformasjonFormField, undefined>;
    formValues: InntektsinformasjonFormData;
}

const AndreInntekter: FunctionComponent<Props> = ({
    andreInntekterInformasjon,
    setAndreInntekterInformasjon,
    setEtterlønnVedlegg,
    setMilitærVedlegg,
    visibility,
    formValues,
    etterlønnVedlegg,
    militærVedlegg,
}) => {
    const intl = useIntl();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAnnenInntekt, setSelectedAnnenInntekt] = useState<AnnenInntekt>();

    const handleOnLeggTil = () => {
        setIsModalOpen(true);
    };

    const addAnnenInntekt = (annenInntekt: AnnenInntekt, vedlegg: Attachment[]) => {
        const updatedandreInntekterInformasjon = andreInntekterInformasjon.concat(annenInntekt);

        if (annenInntekt.type === AnnenInntektType.MILITÆRTJENESTE) {
            setMilitærVedlegg(vedlegg);
        }

        if (annenInntekt.type === AnnenInntektType.SLUTTPAKKE) {
            setEtterlønnVedlegg(vedlegg);
        }

        setAndreInntekterInformasjon(updatedandreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
    };

    const deleteAnnenInntekt = (annenInntekt: AnnenInntekt) => {
        const updatedAndreInntekterInformasjon = andreInntekterInformasjon.filter(
            (inntekt) => inntekt !== annenInntekt,
        );

        if (annenInntekt.type === AnnenInntektType.MILITÆRTJENESTE) {
            setMilitærVedlegg([]);
        }

        if (annenInntekt.type === AnnenInntektType.SLUTTPAKKE) {
            setEtterlønnVedlegg([]);
        }

        setAndreInntekterInformasjon(updatedAndreInntekterInformasjon);
    };

    const editAnnenInntekt = (annenInntekt: AnnenInntekt, vedlegg: Attachment[]) => {
        const updatedAndreInntekterInformasjon = andreInntekterInformasjon
            .filter((inntekt) => inntekt !== selectedAnnenInntekt)
            .concat(annenInntekt);

        if (annenInntekt.type === AnnenInntektType.MILITÆRTJENESTE) {
            setMilitærVedlegg(vedlegg);
        }

        if (annenInntekt.type === AnnenInntektType.SLUTTPAKKE) {
            setEtterlønnVedlegg(vedlegg);
        }

        setAndreInntekterInformasjon(updatedAndreInntekterInformasjon);
        setSelectedAnnenInntekt(undefined);
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
                        onRequestClose={() => {
                            setSelectedAnnenInntekt(undefined);
                            setIsModalOpen(false);
                        }}
                        selectedAnnenInntekt={selectedAnnenInntekt}
                        addAnnenInntekt={addAnnenInntekt}
                        editAnnenInntekt={editAnnenInntekt}
                        etterlønnVedlegg={etterlønnVedlegg}
                        militærVedlegg={militærVedlegg}
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
