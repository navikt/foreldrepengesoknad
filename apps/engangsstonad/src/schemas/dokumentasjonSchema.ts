import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import { IntlShape } from 'react-intl';
import { z } from 'zod';

import { isBeforeTodayOrToday, isValidDate } from '@navikt/fp-validation';

import { Dokumentasjon } from 'types/Dokumentasjon';

dayjs.extend(minMax);

const ATTEN_UKER_OG_TRE_DAGAR = 18 * 7 + 3;

const isUtstedtDatoIUke22 =
    (termindato: string | undefined, message: string) =>
    (terminBekreftelseDato: string): string | null => {
        if (!termindato) {
            return null;
        }
        const utstedt = dayjs(terminBekreftelseDato).startOf('day');
        const uke22 = dayjs(termindato).startOf('day').subtract(ATTEN_UKER_OG_TRE_DAGAR, 'days');
        return dayjs.max(uke22, utstedt).isSame(utstedt) ? null : message;
    };

const runPredicates = <T>(
    value: T,
    ctx: z.RefinementCtx,
    path: Array<string | number>,
    predicates: Array<(v: T) => string | null>,
): void => {
    for (const predicate of predicates) {
        const message = predicate(value);
        if (message) {
            ctx.addIssue({ code: 'custom', message, path });
            return;
        }
    }
};

const vedleggSchema = z.array(z.any()).default([]);

interface Options {
    erTermin: boolean;
    termindato?: string;
}

export const lagDokumentasjonSchema = (
    intl: IntlShape,
    { erTermin, termindato }: Options,
): z.ZodType<Dokumentasjon, Dokumentasjon> =>
    z
        .object({
            vedlegg: vedleggSchema,
            terminbekreftelsedato: z.string().optional(),
        })
        .superRefine((data, ctx) => {
            if (data.vedlegg.length === 0) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['vedlegg'],
                    message: erTermin
                        ? intl.formatMessage({ id: 'DokumentasjonSteg.MinstEttDokumentTermin' })
                        : intl.formatMessage({ id: 'DokumentasjonSteg.MinstEttDokumentAdopsjon' }),
                });
            }
            if (erTermin) {
                if (!data.terminbekreftelsedato) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['terminbekreftelsedato'],
                        message: intl.formatMessage({
                            id: 'TerminDokPanel.Validering.TerminbekreftelseDato.DuMåOppgi',
                        }),
                    });
                } else {
                    runPredicates(data.terminbekreftelsedato, ctx, ['terminbekreftelsedato'], [
                        isValidDate(
                            intl.formatMessage({ id: 'TerminDokPanel.Validering.TerminBekreftelsedato' }),
                        ),
                        isBeforeTodayOrToday(
                            intl.formatMessage({
                                id: 'TerminDokPanel.Validering.TerminBekreftelsedato.MåVæreIdagEllerTidligere',
                            }),
                        ),
                        isUtstedtDatoIUke22(
                            termindato,
                            intl.formatMessage({
                                id: 'TerminDokPanel.Validering.TerminBekreftelsedato.DuMåVæreIUke22',
                            }),
                        ),
                    ]);
                }
            }
        }) as unknown as z.ZodType<Dokumentasjon, Dokumentasjon>;
