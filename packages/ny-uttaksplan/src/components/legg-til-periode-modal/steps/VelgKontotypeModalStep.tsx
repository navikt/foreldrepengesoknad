import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading, Radio, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { getStønadskontoNavnSimple } from '../../../utils/stønadskontoerUtils';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
}

interface FormValues {
    kontoType: StønadskontoType;
    forelder: Forelder;
}

export const VelgKontotypeModalStep = ({ modalData, closeModal, setModalData }: Props) => {
    const intl = useIntl();
    const valgtStønadskonto = notEmpty(useContextGetData(UttaksplanContextDataType.VALGT_STØNADSKONTO));

    const { forelder, kontoType } = modalData;

    const formMethods = useForm<FormValues>({
        defaultValues: {
            forelder: forelder ?? undefined,
            kontoType: kontoType ?? undefined,
        },
    });

    const kontoTypeValue = formMethods.watch('kontoType');

    const getForelderFromKontoType = (
        ktValue: StønadskontoType,
        fValue: Forelder | undefined,
    ): Forelder | undefined => {
        switch (ktValue) {
            case StønadskontoType.Fedrekvote:
                return Forelder.farMedmor;
            case StønadskontoType.Mødrekvote:
            case StønadskontoType.ForeldrepengerFørFødsel:
                return Forelder.mor;
            default:
                return fValue;
        }
    };

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            kontoType: values.kontoType,
            currentStep: 'step2',
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
        });
        // handleAddPeriode({
        //     fom: fom!,
        //     tom: tom!,
        //     id: `${fom} - ${tom} - ${kontoType}`,
        //     readOnly: false,
        //     kontoType: kontoTypeValue,
        //     forelder: getForelderFromKontoType(values.kontoType, values.forelder),
        // });
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="4">
                <Heading size="medium">Hvilken konto vil du bruke?</Heading>
                <RhfRadioGroup
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.kontoType.påkrevd' }))]}
                    label="Velg kontotype"
                    name="kontoType"
                >
                    {valgtStønadskonto.kontoer.map((konto) => {
                        return (
                            <Radio key={konto.konto} value={konto.konto}>
                                {getStønadskontoNavnSimple(intl, konto.konto)}
                            </Radio>
                        );
                    })}
                </RhfRadioGroup>
                {kontoTypeValue === StønadskontoType.Fellesperiode && (
                    <RhfRadioGroup
                        validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.forelder.påkrevd' }))]}
                        label="Hvem gjelder fellesperioden?"
                        name="forelder"
                    >
                        <Radio value={Forelder.mor}>Mor</Radio>
                        <Radio value={Forelder.farMedmor}>Far eller medmor</Radio>
                    </RhfRadioGroup>
                )}
            </VStack>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '1rem 0',
                    gap: '1rem',
                }}
            >
                <Button type="button" variant="secondary" onClick={closeModal}>
                    Avbryt
                </Button>

                <Button>Gå videre</Button>
            </div>
        </RhfForm>
    );
};
