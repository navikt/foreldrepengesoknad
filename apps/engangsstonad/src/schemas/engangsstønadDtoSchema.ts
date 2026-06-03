import { z } from 'zod';

import { ISO_DATE_REGEX } from '@navikt/fp-constants';
import { EngangsstønadDto } from '@navikt/fp-types';

const isoDateString = z.string().regex(ISO_DATE_REGEX, 'Forventa ISO-dato (YYYY-MM-DD)');

const navnSchema = z.object({
    fornavn: z.string().min(1),
    etternavn: z.string().min(1),
    mellomnavn: z.string().optional(),
});

const søkerinfoSchema = z.object({
    fnr: z.string().min(1),
    navn: navnSchema,
    arbeidsforhold: z.array(z.any()).optional(),
});

const målformSchema = z.enum(['NB', 'NN', 'EN', 'E']);

const baseBarnFelt = {
    antallBarn: z.number().int().positive().optional(),
};

const fødselDtoSchema = z.object({
    type: z.literal('fødsel'),
    ...baseBarnFelt,
    fødselsdato: isoDateString,
    termindato: isoDateString.optional(),
});

const terminDtoSchema = z.object({
    type: z.literal('termin'),
    ...baseBarnFelt,
    termindato: isoDateString,
    terminbekreftelseDato: isoDateString.optional(),
});

const adopsjonDtoSchema = z.object({
    type: z.literal('adopsjon'),
    ...baseBarnFelt,
    adopsjonAvEktefellesBarn: z.boolean(),
    adopsjonsdato: isoDateString,
    ankomstdato: isoDateString.optional(),
    søkerAdopsjonAlene: z.boolean().optional(),
    fødselsdatoer: z.array(isoDateString).optional(),
});

const omsorgsovertakelseDtoSchema = z.object({
    type: z.literal('omsorgsovertakelse'),
    ...baseBarnFelt,
    foreldreansvarsdato: isoDateString,
    fødselsdatoer: z.array(isoDateString).optional(),
});

const barnDtoSchema = z.discriminatedUnion('type', [
    fødselDtoSchema,
    terminDtoSchema,
    adopsjonDtoSchema,
    omsorgsovertakelseDtoSchema,
]);

const utenlandsoppholdsperiodeSchema = z.object({
    fom: isoDateString,
    tom: isoDateString,
    landkode: z.string().min(2),
});

const vedleggDtoSchema = z.object({
    skjemanummer: z.string().min(1),
    innsendingsType: z.enum(['LASTET_OPP', 'SEND_SENERE', 'AUTOMATISK']),
    uuid: z.string().optional(),
    beskrivelse: z.string().optional(),
    dokumenterer: z
        .object({
            type: z.enum(['BARN', 'OPPTJENING', 'UTTAK', 'TILRETTELEGGING']),
        })
        .passthrough()
        .optional(),
});

export const engangsstønadDtoSchema: z.ZodType<EngangsstønadDto> = z.object({
    barn: barnDtoSchema,
    mottattdato: isoDateString.optional(),
    språkkode: målformSchema,
    søkerinfo: søkerinfoSchema,
    utenlandsopphold: z.array(utenlandsoppholdsperiodeSchema).optional(),
    vedlegg: z.array(vedleggDtoSchema).optional(),
}) as unknown as z.ZodType<EngangsstønadDto>;
