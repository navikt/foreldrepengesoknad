// import { useFormContext } from 'react-hook-form';
// import { FormattedMessage, useIntl } from 'react-intl';

// import { Radio, VStack } from '@navikt/ds-react';

// import { RhfRadioGroup } from '@navikt/fp-form-hooks';
// import { UtsettelseÅrsakType } from '@navikt/fp-types';
// import { isRequired } from '@navikt/fp-validation';

// import { PeriodeHullType } from '../../types/Planperiode';
// import { LeggTilPeriodeModalFormValues } from '../legg-til-periode-modal/types/LeggTilPeriodeModalFormValues';

// export const OppholdsÅrsakSpørsmål = () => {
//     const intl = useIntl();

//     const { control } = useFormContext<LeggTilPeriodeModalFormValues>();

//     return (
//         <>
//             <VStack gap="space-16">
//                 <RhfRadioGroup
//                     name="årsak"
//                     label="Hvilken periode vil du endre?"
//                     control={control}
//                     validate={[isRequired(intl.formatMessage({ id: 'leggTilPeriodeModal.hvaVilDuGjøre.påkrevd' }))]}
//                 >
//                     <Radio value={UtsettelseÅrsakType.Ferie}>
//                         <FormattedMessage id="uttaksplan.oppholdsårsakModal.ferie" />
//                     </Radio>
//                     <Radio value={PeriodeHullType.PERIODE_UTEN_UTTAK}>
//                         <FormattedMessage id="uttaksplan.oppholdsårsakModal.periodeUtenForeldrepenger" />
//                     </Radio>
//                 </RhfRadioGroup>
//             </VStack>
//         </>
//     );
// };
