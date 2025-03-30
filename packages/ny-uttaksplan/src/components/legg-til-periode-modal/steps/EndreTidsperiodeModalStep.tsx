import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { HStack, Heading, VStack } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { RhfDatepicker, RhfForm } from '@navikt/fp-form-hooks';
import { UtsettelseÅrsakType } from '@navikt/fp-types';
import { isEmpty } from '@navikt/fp-validation';

import { PeriodeHullType, Planperiode } from '../../../types/Planperiode';
import { getMaxDate, getMinDate } from '../../../utils/dateLimits';
import { getFomValidators, getTomValidators } from '../../../utils/dateValidators';
import { ModalButtons } from '../../modal-buttons/ModalButtons';
import { ModalData } from '../LeggTilPeriodeModal';

interface Props {
    modalData: ModalData;
    setModalData: (data: ModalData) => void;
    closeModal: () => void;
    familiehendelsedato: string;
    handleAddPeriode: (periode: Planperiode) => void;
    erBarnetFødt: boolean;
    gjelderAdopsjon: boolean;
}

interface FormValues {
    fom: string | undefined;
    tom: string | undefined;
}

export const EndreTidsperiodeModalStep = ({
    modalData,
    setModalData,
    closeModal,
    familiehendelsedato,
    handleAddPeriode,
    erBarnetFødt,
    gjelderAdopsjon,
}: Props) => {
    const intl = useIntl();
    const { fom, tom, kontoType, forelder, årsak } = modalData;
    const formMethods = useForm<FormValues>({
        defaultValues: {
            fom: fom ?? '',
            tom: tom ?? '',
        },
    });

    const fomValue = formMethods.watch('fom');
    const tomValue = formMethods.watch('tom');

    const onSubmit = () => {
        handleAddPeriode({
            fom: fomValue!,
            tom: tomValue!,
            id: `${fomValue} - ${tomValue} - ${kontoType}`,
            readOnly: false,
            kontoType: kontoType,
            forelder: forelder ? forelder : Forelder.mor,
            utsettelseÅrsak: årsak === UtsettelseÅrsakType.Ferie ? årsak : undefined,
            periodeHullÅrsak: årsak === PeriodeHullType.PERIODE_UTEN_UTTAK ? årsak : undefined,
        });

        closeModal();
    };

    const minDate = getMinDate({ årsak, kontoType, familiehendelsedato, gjelderAdopsjon });
    const maxDate = getMaxDate({ familiehendelsedato, kontoType });

    return (
        <>
            <Heading size="medium">Hvilke datoer skal perioden være?</Heading>
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} id="skjema">
                <VStack gap="4">
                    <HStack gap="4">
                        <RhfDatepicker
                            showMonthAndYearDropdowns
                            minDate={minDate}
                            maxDate={maxDate}
                            validate={getFomValidators({
                                intl,
                                familiehendelsedato,
                                kontoType,
                                tomValue,
                                erBarnetFødt,
                                minDate,
                                maxDate,
                                årsak,
                                gjelderAdopsjon,
                            })}
                            disableWeekends={true}
                            label="Fra og med dato"
                            name="fom"
                            defaultMonth={isEmpty(fomValue) ? familiehendelsedato : fomValue}
                        />
                        <RhfDatepicker
                            showMonthAndYearDropdowns
                            minDate={minDate}
                            maxDate={maxDate}
                            validate={getTomValidators({
                                intl,
                                familiehendelsedato,
                                kontoType,
                                fomValue,
                                erBarnetFødt,
                                minDate,
                                maxDate,
                                årsak,
                                gjelderAdopsjon,
                            })}
                            disableWeekends={true}
                            label="Til og med dato"
                            name="tom"
                            defaultMonth={isEmpty(fomValue) ? familiehendelsedato : fomValue}
                        />
                    </HStack>
                    <ModalButtons
                        onCancel={closeModal}
                        onGoPreviousStep={() => {
                            setModalData({ ...modalData, currentStep: 'step2' });
                        }}
                        isFinalStep={false}
                    />
                </VStack>
            </RhfForm>
        </>
    );
};
