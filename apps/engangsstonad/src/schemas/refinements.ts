import { z } from 'zod';

import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isMaxOneYearIntoTheFuture,
    isValidDate,
} from '@navikt/fp-validation';

/**
 * Lar oss reuse predikat-funksjonar frå @navikt/fp-validation (som returnerer
 * `string | null`) inne i zod-refinements utan å duplisera dato-logikken.
 */
export const refineWithPredicate =
    <T>(predicate: (value: T) => string | null) =>
    (value: T, ctx: z.RefinementCtx) => {
        const message = predicate(value);
        if (message) {
            ctx.addIssue({ code: 'custom', message });
        }
    };

export const isValidIsoDate = (message: string) => refineWithPredicate(isValidDate(message));
export const isBeforeOrToday = (message: string) => refineWithPredicate(isBeforeTodayOrToday(message));
export const isAtMostOneYearAhead = (message: string) => refineWithPredicate(isMaxOneYearIntoTheFuture(message));
export const isWithinLastSixMonths = (message: string) => refineWithPredicate(isAfterOrSameAsSixMonthsAgo(message));
export const isAtUke22EllerSenere = (message: string) =>
    refineWithPredicate(erI22SvangerskapsukeEllerSenere(message));
