import { IntlShape } from 'react-intl';
import { z } from 'zod';

import { Søkersituasjon } from '@navikt/fp-types';

export const lagSøkersituasjonSchema = (
    intl: IntlShape,
): z.ZodType<Søkersituasjon, Søkersituasjon> =>
    z.object({
        situasjon: z
            .enum(['fødsel', 'adopsjon'])
            .optional()
            .refine((v): v is 'fødsel' | 'adopsjon' => v !== undefined, {
                message: intl.formatMessage({
                    id: 'SøkersituasjonSteg.Validering.OppgiFodselEllerAdopsjon',
                }),
            }),
    });

