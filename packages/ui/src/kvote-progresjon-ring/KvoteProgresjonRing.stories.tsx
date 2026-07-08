import { Meta, StoryObj } from '@storybook/react-vite';

import { KvoteProgresjonRing } from './KvoteProgresjonRing';

const meta = {
    title: 'components/KvoteProgresjonRing',
    component: KvoteProgresjonRing,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof KvoteProgresjonRing>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Mødrekvote ─────────────────────────────────────────────────────────────

export const Modrekvote_Delvis: Story = {
    name: 'Mødrekvote – delvis (95,8 %)',
    args: {
        tone: 'mor',
        progress: 0.958,
        label: 'Mødrekvote',
        progressLabel: (
            <>
                <strong>18u 1d</strong> av 19 veker
            </>
        ),
        'aria-label': 'Mødrekvote: 18 veker og 1 dag av 19 veker lagt til',
    },
};

export const Modrekvote_Tom: Story = {
    name: 'Mødrekvote – tom (0 %)',
    args: {
        tone: 'mor',
        progress: 0,
        label: 'Mødrekvote',
        progressLabel: (
            <>
                <strong>0</strong> av 19 veker
            </>
        ),
        'aria-label': 'Mødrekvote: 0 av 19 veker lagt til',
    },
};

export const Modrekvote_Ferdig: Story = {
    name: 'Mødrekvote – ferdig (100 %)',
    args: {
        tone: 'mor',
        progress: 1,
        complete: true,
        label: 'Mødrekvote',
        progressLabel: <strong>19 veker lagt til</strong>,
        'aria-label': 'Mødrekvote: ferdig, 19 veker lagt til',
    },
};

// ─── Foreldrepengar før fødsel ───────────────────────────────────────────────

export const ForFodsel_Tom: Story = {
    name: 'Før fødsel – tom (0 %)',
    args: {
        tone: 'mor',
        progress: 0,
        label: 'Før fødsel',
        progressLabel: (
            <>
                <strong>0</strong> av 3 veker
            </>
        ),
        'aria-label': 'Foreldrepengar før fødsel: 0 av 3 veker lagt til',
    },
};

export const ForFodsel_Ferdig: Story = {
    name: 'Før fødsel – ferdig (100 %)',
    args: {
        tone: 'mor',
        progress: 1,
        complete: true,
        label: 'Før fødsel',
        progressLabel: <strong>3 veker lagt til</strong>,
        'aria-label': 'Foreldrepengar før fødsel: ferdig, 3 veker lagt til',
    },
};

// ─── Fedrekvote ──────────────────────────────────────────────────────────────

export const Fedrekvote_Delvis: Story = {
    name: 'Fedrekvote – delvis (60 %)',
    args: {
        tone: 'far',
        progress: 0.6,
        label: 'Fedrekvote',
        progressLabel: (
            <>
                <strong>11u 3d</strong> av 19 veker
            </>
        ),
        'aria-label': 'Fedrekvote: 11 veker og 3 dagar av 19 veker lagt til',
    },
};

export const Fedrekvote_Ferdig: Story = {
    name: 'Fedrekvote – ferdig (100 %)',
    args: {
        tone: 'far',
        progress: 1,
        complete: true,
        label: 'Fedrekvote',
        progressLabel: <strong>19 veker lagt til</strong>,
        'aria-label': 'Fedrekvote: ferdig, 19 veker lagt til',
    },
};

// ─── Fellesperiode ───────────────────────────────────────────────────────────

export const Fellesperiode_Splitta: Story = {
    name: 'Fellesperiode – splitta (ca. 50/50)',
    args: {
        tone: 'felles',
        progress: 0.495,
        progressFar: 1,
        complete: true,
        label: 'Fellesperiode',
        progressLabel: <strong>20u 1d fordelt</strong>,
        splitInfo: [
            { color: 'mor', text: '10u Ada' },
            { color: 'far', text: '10u 1d Erlend' },
        ],
        'aria-label': 'Fellesperiode: ferdig, 10 veker til Ada og 10 veker 1 dag til Erlend',
    },
};

export const Fellesperiode_DelvisFordelt: Story = {
    name: 'Fellesperiode – delvis fordelt (30 % mor, 20 % far)',
    args: {
        tone: 'felles',
        progress: 0.3,
        progressFar: 0.5,
        complete: false,
        label: 'Fellesperiode',
        progressLabel: (
            <>
                <strong>10u 1d</strong> av 20u 1d
            </>
        ),
        splitInfo: [
            { color: 'mor', text: '6u Ada' },
            { color: 'far', text: '4u 1d Erlend' },
        ],
        'aria-label': 'Fellesperiode: 10 veker 1 dag av 20 veker 1 dag fordelt',
    },
};

export const Fellesperiode_Tom: Story = {
    name: 'Fellesperiode – tom',
    args: {
        tone: 'felles',
        progress: 0,
        progressFar: 0,
        label: 'Fellesperiode',
        progressLabel: (
            <>
                <strong>0</strong> av 20u 1d
            </>
        ),
        'aria-label': 'Fellesperiode: 0 av 20 veker 1 dag lagt til',
    },
};

// ─── Mini (sticky-variant) ───────────────────────────────────────────────────

export const Mini_Mor: Story = {
    name: 'Mini – mødrekvote (80 %)',
    args: {
        tone: 'mor',
        progress: 0.8,
        size: 'mini',
        'aria-label': 'Mødrekvote: 80 % planlagd',
    },
};

export const Mini_Far_Ferdig: Story = {
    name: 'Mini – fedrekvote ferdig',
    args: {
        tone: 'far',
        progress: 1,
        complete: true,
        size: 'mini',
        'aria-label': 'Fedrekvote: ferdig',
    },
};

// ─── Samlestories ────────────────────────────────────────────────────────────

/**
 * Dei fire ringane slik dei vises side om side i planleggjarwidgeten,
 * med bakgrunn frå designdokumentet.
 */
export const AlleFireRingar: Story = {
    name: 'Alle fire – hovudvariant (scenario frå designdokumentet)',
    render: () => (
        <div className="bg-[var(--ax-bg-sunken)] rounded-xl p-7 grid grid-cols-4 gap-4 w-[480px]">
            <KvoteProgresjonRing
                tone="mor"
                progress={0}
                label="Før fødsel"
                progressLabel={
                    <>
                        <strong>0</strong> av 3 veker
                    </>
                }
                onClick={() => undefined}
                aria-label="Foreldrepengar før fødsel"
            />
            <KvoteProgresjonRing
                tone="mor"
                progress={0.958}
                label="Mødrekvote"
                progressLabel={
                    <>
                        <strong>18u 1d</strong> av 19 veker
                    </>
                }
                onClick={() => undefined}
                aria-label="Mødrekvote"
            />
            <KvoteProgresjonRing
                tone="far"
                progress={1}
                complete
                label="Fedrekvote"
                progressLabel={<strong>19 veker lagt til</strong>}
                onClick={() => undefined}
                aria-label="Fedrekvote: ferdig"
            />
            <KvoteProgresjonRing
                tone="felles"
                progress={0.495}
                progressFar={1}
                complete
                label="Fellesperiode"
                progressLabel={<strong>20u 1d fordelt</strong>}
                splitInfo={[
                    { color: 'mor', text: '10u Ada' },
                    { color: 'far', text: '10u 1d Erlend' },
                ]}
                onClick={() => undefined}
                aria-label="Fellesperiode: ferdig"
            />
        </div>
    ),
};

/**
 * Kompakt sticky-rad med fire mini-ringar, slik dei vises
 * når brukaren har scrollla forbi hovudwidgeten.
 */
export const MiniStickyRad: Story = {
    name: 'Mini – sticky-rad (alle fire)',
    render: () => (
        <div className="flex items-center gap-4 px-5 py-3 bg-[var(--ax-bg-default)] border border-[var(--ax-border-subtle)] rounded-full shadow-sm w-fit">
            <div className="flex items-center gap-1.5">
                <KvoteProgresjonRing tone="mor" progress={0} size="mini" aria-label="Før fødsel: 0 %" />
                <KvoteProgresjonRing tone="mor" progress={0.958} size="mini" aria-label="Mødrekvote: 96 %" />
                <KvoteProgresjonRing tone="far" progress={1} complete size="mini" aria-label="Fedrekvote: ferdig" />
                <KvoteProgresjonRing tone="felles" progress={1} complete size="mini" aria-label="Fellesperiode: ferdig" />
            </div>
            <span className="text-[13px] font-medium text-[var(--ax-text-default)]">
                <strong className="text-[var(--ax-warning-600)]">3u 4d igjen</strong> i planen
            </span>
        </div>
    ),
};
