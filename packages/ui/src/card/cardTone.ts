import { CardStateTone, CardTone } from './types';

/**
 * Delt fargeoppslag for `Card` og dei tilhøyrande underkomponentane (`CardIconCircle`,
 * `CardBadge`). Samla her slik at heile kort-familien brukar nøyaktig same Aksel-tonar.
 */

export const TONE_BG_SOFT: Record<CardTone, string> = {
    accent: 'bg-ax-bg-accent-soft',
    success: 'bg-ax-bg-success-soft',
    'brand-beige': 'bg-ax-bg-brand-beige-soft',
    warning: 'bg-ax-bg-warning-soft',
    danger: 'bg-ax-bg-danger-soft',
};

export const TONE_BG_MODERATE: Record<CardTone, string> = {
    accent: 'bg-ax-bg-accent-moderate',
    success: 'bg-ax-bg-success-moderate',
    'brand-beige': 'bg-ax-bg-brand-beige-moderate',
    warning: 'bg-ax-bg-warning-moderate',
    danger: 'bg-ax-bg-danger-moderate',
};

export const TONE_BG_STRONG: Record<CardTone, string> = {
    accent: 'bg-ax-bg-accent-strong',
    success: 'bg-ax-bg-success-strong',
    'brand-beige': 'bg-ax-bg-brand-beige-strong',
    warning: 'bg-ax-bg-warning-strong',
    danger: 'bg-ax-bg-danger-strong',
};

export const TONE_TEXT_SUBTLE: Record<CardTone, string> = {
    accent: 'text-ax-text-accent-subtle',
    success: 'text-ax-text-success-subtle',
    'brand-beige': 'text-ax-text-brand-beige-subtle',
    warning: 'text-ax-text-warning-subtle',
    danger: 'text-ax-text-danger-subtle',
};

export const TONE_TEXT_CONTRAST: Record<CardTone, string> = {
    accent: 'text-ax-text-accent-contrast',
    success: 'text-ax-text-success-contrast',
    'brand-beige': 'text-ax-text-brand-beige-contrast',
    warning: 'text-ax-text-warning-contrast',
    danger: 'text-ax-text-danger-contrast',
};

export const STATE_BORDER_KLASSE: Record<CardStateTone, string> = {
    warning: 'shadow-[inset_0_0_0_2px_var(--ax-border-warning)]',
    danger: 'shadow-[inset_0_0_0_2px_var(--ax-border-danger)]',
};

export const STATE_BADGE_KLASSE: Record<CardStateTone, string> = {
    warning: 'bg-ax-bg-warning-soft text-ax-text-warning',
    danger: 'bg-ax-bg-danger-soft text-ax-text-danger',
};

export function cx(...klasser: Array<string | false | undefined>) {
    return klasser.filter(Boolean).join(' ');
}
