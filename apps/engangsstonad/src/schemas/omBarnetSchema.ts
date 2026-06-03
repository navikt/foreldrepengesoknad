import { IntlShape } from 'react-intl';
import { z } from 'zod';

import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isMaxOneYearIntoTheFuture,
    isValidDate,
} from '@navikt/fp-validation';
import { isLessThanThreeWeeksBeforeFødsel } from '@navikt/fp-validation/src/form/dateFormValidation';

import { Adopsjon, Fødsel } from 'types/OmBarnet';

/**
 * Køyr ein liste med fp-validation-predikat på ein verdi og legg til zod-issue
 * for første feilen som blir funnen, slik at meldinga endar opp på rett felt-path.
 */
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

export type FødselFormValues = Fødsel & { antallBarnDropDown?: string };
export type AdopsjonFormValues = Adopsjon & { antallBarnDropDown?: string };
export type OmBarnetFormValues = FødselFormValues & AdopsjonFormValues;

/**
 * Felles "rå" struktur som dekkjer både fødsel- og adopsjonsfelt — bygd som
 * eit ope, optional-skjema slik at output passar inn i RHF sine eksisterande
 * `FormValues`-typar. All forretningslogikk skjer i `superRefine`.
 */
const baseFelt = z.object({
    erBarnetFødt: z.boolean().optional(),
    antallBarn: z.number().optional(),
    antallBarnDropDown: z.string().optional(),
    fødselsdato: z.string().optional(),
    termindato: z.string().optional(),
    adopsjonAvEktefellesBarn: z.boolean().optional(),
    adopsjonsdato: z.string().optional(),
    søkerAdopsjonAlene: z.boolean().optional(),
    fødselsdatoer: z.array(z.object({ dato: z.string().optional() })).optional(),
});

const refineAntallBarn = (
    data: z.infer<typeof baseFelt>,
    ctx: z.RefinementCtx,
    krevMsg: string,
    dropdownMsg: string,
) => {
    if (data.antallBarn === undefined) {
        ctx.addIssue({ code: 'custom', path: ['antallBarn'], message: krevMsg });
    } else if (data.antallBarn === 3 && !data.antallBarnDropDown) {
        ctx.addIssue({ code: 'custom', path: ['antallBarnDropDown'], message: dropdownMsg });
    }
};

export const lagFødselSchema = (
    intl: IntlShape,
): z.ZodType<OmBarnetFormValues, OmBarnetFormValues> =>
    baseFelt.superRefine((data, ctx) => {
        const antallBarnFødtMsg = intl.formatMessage({ id: 'FødselPanel.AntallBarn.Født.Required' });
        const antallBarnTerminMsg = intl.formatMessage({ id: 'FødselPanel.AntallBarn.Venter.Required' });

        if (data.erBarnetFødt === undefined) {
            ctx.addIssue({
                code: 'custom',
                path: ['erBarnetFødt'],
                message: intl.formatMessage({ id: 'FødselPanel.Spørsmål.ErBarnetFødt.Required' }),
            });
        }

        // termindato
        if (!data.termindato) {
            ctx.addIssue({
                code: 'custom',
                path: ['termindato'],
                message: intl.formatMessage({ id: 'FødselPanel.Termindato.DuMåOppgi' }),
            });
        } else {
            runPredicates(data.termindato, ctx, ['termindato'], [
                isValidDate(intl.formatMessage({ id: 'FødselPanel.Termindato.Gyldig' })),
                erI22SvangerskapsukeEllerSenere(
                    intl.formatMessage({ id: 'FødselPanel.Termindato.DuMåVæreIUke22' }),
                ),
                ...(data.fødselsdato
                    ? [
                          isLessThanThreeWeeksBeforeFødsel(
                              intl.formatMessage({
                                  id: 'FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFørFødsel',
                              }),
                              data.fødselsdato,
                          ),
                      ]
                    : []),
            ]);
        }

        // fødselsdato berre når barnet er fødd
        if (data.erBarnetFødt) {
            if (!data.fødselsdato) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['fødselsdato'],
                    message: intl.formatMessage({ id: 'FødselPanel.Fødselsdato.DuMåOppgi' }),
                });
            } else {
                runPredicates(data.fødselsdato, ctx, ['fødselsdato'], [
                    isValidDate(intl.formatMessage({ id: 'FødselPanel.Fødselsdato.Gyldig' })),
                    isBeforeTodayOrToday(
                        intl.formatMessage({ id: 'FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere' }),
                    ),
                    isAfterOrSameAsSixMonthsAgo(
                        intl.formatMessage({ id: 'FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake' }),
                    ),
                ]);
            }
        }

        refineAntallBarn(
            data,
            ctx,
            data.erBarnetFødt ? antallBarnFødtMsg : antallBarnTerminMsg,
            data.erBarnetFødt ? antallBarnFødtMsg : antallBarnTerminMsg,
        );
    }) as unknown as z.ZodType<OmBarnetFormValues, OmBarnetFormValues>;

export const lagAdopsjonSchema = (
    intl: IntlShape,
    kjønn?: string,
): z.ZodType<OmBarnetFormValues, OmBarnetFormValues> =>
    baseFelt.superRefine((data, ctx) => {
        if (data.adopsjonAvEktefellesBarn === undefined) {
            ctx.addIssue({
                code: 'custom',
                path: ['adopsjonAvEktefellesBarn'],
                message: intl.formatMessage({ id: 'AdopsjonPanel.Spørsmål.Required' }),
            });
        }

        if (kjønn === 'M' && data.adopsjonAvEktefellesBarn === false && data.søkerAdopsjonAlene === undefined) {
            ctx.addIssue({
                code: 'custom',
                path: ['søkerAdopsjonAlene'],
                message: intl.formatMessage({ id: 'AdopsjonPanel.AdoptererDuAlene.Required' }),
            });
        }

        // adopsjonsdato
        const adopsjonsdatoKrevMsg = data.adopsjonAvEktefellesBarn
            ? intl.formatMessage({ id: 'AdopsjonPanel.EktefellensBarn.DuMåOppgi' })
            : intl.formatMessage({ id: 'AdopsjonPanel.OvertaOmsorg.DuMåOppgi' });
        const adopsjonsdatoUgyldigMsg = data.adopsjonAvEktefellesBarn
            ? intl.formatMessage({ id: 'AdopsjonPanel.Adopsjonsdato.GyldigFormat' })
            : intl.formatMessage({ id: 'AdopsjonPanel.Omsorgsovertakelsen.GyldigFormat' });

        if (!data.adopsjonsdato) {
            ctx.addIssue({ code: 'custom', path: ['adopsjonsdato'], message: adopsjonsdatoKrevMsg });
        } else {
            runPredicates(data.adopsjonsdato, ctx, ['adopsjonsdato'], [
                isValidDate(adopsjonsdatoUgyldigMsg),
                isMaxOneYearIntoTheFuture(
                    intl.formatMessage({ id: 'AdopsjonPanel.AdopsjonDato.ForLangtFremITid' }),
                ),
            ]);
        }

        const antallBarnMsg = intl.formatMessage({ id: 'AdopsjonPanel.Antallbarn.Required' });
        refineAntallBarn(
            data,
            ctx,
            antallBarnMsg,
            intl.formatMessage({ id: 'AdopsjonPanel.Antallbarndropdown.Required' }),
        );

        // fødselsdatoer
        (data.fødselsdatoer ?? []).forEach((entry, index) => {
            const path = ['fødselsdatoer', index, 'dato'] as Array<string | number>;
            if (!entry.dato) {
                ctx.addIssue({
                    code: 'custom',
                    path,
                    message: intl.formatMessage({ id: 'AdopsjonFodselFieldArray.Fodselsdato.DuMåOppgi' }),
                });
                return;
            }
            runPredicates(entry.dato, ctx, path, [
                isValidDate(
                    intl.formatMessage({ id: 'AdopsjonFodselFieldArray.Fødselsdato.Gyldig' }),
                ),
                ...(data.adopsjonsdato
                    ? [
                          isBeforeTodayOrToday(
                              intl.formatMessage({
                                  id: 'AdopsjonFodselFieldArray.fodselsdato.MåVæreIdagEllerTidligere',
                              }),
                          ),
                      ]
                    : []),
            ]);
        });
    }) as unknown as z.ZodType<OmBarnetFormValues, OmBarnetFormValues>;
