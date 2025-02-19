import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { Button, Heading, Radio, VStack } from '@navikt/ds-react';

import { Forelder, StønadskontoType } from '@navikt/fp-constants';
import { RhfForm, RhfRadioGroup } from '@navikt/fp-form-hooks';
import { isRequired, notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { Planperiode } from '../../../types/Planperiode';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    closeModal: () => void;
    setModalData: (data: ModalData) => void;
    handleAddPeriode: (oppdatertPeriode: Planperiode) => void;
}

interface FormValues {
    kontoType: StønadskontoType;
    forelder: Forelder;
}

export const VelgKontotypeModalStep = ({ modalData, closeModal, setModalData, handleAddPeriode }: Props) => {
    const intl = useIntl();
    const valgtStønadskonto = notEmpty(useContextGetData(UttaksplanContextDataType.VALGT_STØNADSKONTO));
    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));

    const { fom, tom, forelder, kontoType } = modalData;

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
                return Forelder.mor;
            default:
                return fValue;
        }
    };

    const onSubmit = (values: FormValues) => {
        setModalData({
            ...modalData,
            kontoType: values.kontoType,
            currentStep: 'step3',
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
        });
        handleAddPeriode({
            fom: fom!,
            tom: tom!,
            id: `${fom} - ${tom} - ${kontoType}`,
            readOnly: false,
            kontoType: kontoTypeValue,
            forelder: getForelderFromKontoType(values.kontoType, values.forelder),
        });
        closeModal();
    };

    return (
        <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
            <VStack gap="4">
                <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
                <RhfRadioGroup
                    validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.kontoType.påkrevd' }))]}
                    label="Velg kontotype"
                    name="kontoType"
                >
                    {valgtStønadskonto.kontoer.map((konto) => {
                        return (
                            <Radio value={konto.konto}>
                                {getStønadskontoNavn(intl, konto.konto, navnPåForeldre, erFarEllerMedmor)}
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
                }}
            >
                <div>
                    <Button type="button" variant="secondary" onClick={closeModal}>
                        Avbryt
                    </Button>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                            setModalData({ ...modalData, currentStep: 'step1' });
                        }}
                    >
                        Gå tilbake
                    </Button>
                    <Button>Ferdig, legg til i planen</Button>
                </div>
            </div>
        </RhfForm>
    );
};
