import { type ReactNode, useEffect } from 'react';
import type { ArgTypes, DecoratorFunction } from 'storybook/internal/types';

type SkyraMockScenario = 'klar' | 'utilgjengelig' | 'feil';
type SkyraCallback = (event: { slug: string }) => void;

export type SkyraMockArgs = {
    skyraSamtykke?: boolean;
    skyraScenario?: SkyraMockScenario;
    skyraForsinkelseMs?: number;
};

export const skyraMockArgs: Required<SkyraMockArgs> = {
    skyraSamtykke: true,
    skyraScenario: 'klar',
    skyraForsinkelseMs: 1000,
};

export const skyraMockArgTypes: Partial<ArgTypes<SkyraMockArgs>> = {
    skyraSamtykke: {
        name: 'Skyra: samtykke',
        description: 'Samtykke til undersøkelser i dekoratøren. Endring sender samme hendelse som samtykkebanneret.',
        control: 'boolean',
    },
    skyraScenario: {
        name: 'Skyra: svar fra undersøkelsen',
        options: ['klar', 'utilgjengelig', 'feil'],
        control: 'radio',
    },
    skyraForsinkelseMs: {
        name: 'Skyra: forsinkelse (ms)',
        control: { type: 'number', min: 0, step: 500 },
    },
};

// Felles tilstand fordi custom elementet bare kan registreres én gang per side.
const mockState = {
    samtykke: skyraMockArgs.skyraSamtykke,
    scenario: skyraMockArgs.skyraScenario,
    forsinkelseMs: skyraMockArgs.skyraForsinkelseMs,
    lyttere: new Map<string, Set<SkyraCallback>>(),
};

const sendSkyraHendelse = (event: string, slug: string) => {
    mockState.lyttere.get(event)?.forEach((callback) => callback({ slug }));
};

const lagUndersøkelse = (slug: string) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'border: 2px dashed #b65781; padding: 12px; border-radius: 8px;';

    const tekst = document.createElement('p');
    tekst.textContent = `Mocket Skyra-undersøkelse (${slug})`;

    const knapp = document.createElement('button');
    knapp.type = 'button';
    knapp.textContent = 'Fullfør undersøkelsen';
    knapp.addEventListener('click', () => sendSkyraHendelse('surveyCompleted', slug));

    wrapper.append(tekst, knapp);
    return wrapper;
};

// Etterligner det ekte Skyra-elementet: sender skyra-ready, skyra-unavailable eller skyra-error på verten.
class MockSkyraSurvey extends HTMLElement {
    private timer?: ReturnType<typeof setTimeout>;

    connectedCallback() {
        const { scenario, forsinkelseMs } = mockState;
        const slug = this.getAttribute('slug') ?? '';
        const send = (type: string, detail?: object) =>
            this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }));

        this.timer = globalThis.setTimeout(() => {
            if (scenario === 'klar') {
                this.replaceChildren(lagUndersøkelse(slug));
                send('skyra-ready', { slug });
            } else if (scenario === 'utilgjengelig') {
                send('skyra-unavailable', { slug, code: 'not_found' });
            } else {
                send('skyra-error', { slug, code: 'controller_unavailable' });
            }
        }, forsinkelseMs);
    }

    disconnectedCallback() {
        globalThis.clearTimeout(this.timer);
    }
}

const installer = () => {
    Object.assign(globalThis, {
        webStorageController: {
            getCurrentConsent: () => ({
                consent: { analytics: mockState.samtykke, surveys: mockState.samtykke },
                userActionTaken: true,
            }),
        },
        skyra: {
            on: (event: string, callback: SkyraCallback) => {
                const lyttere = mockState.lyttere.get(event) ?? new Set<SkyraCallback>();
                lyttere.add(callback);
                mockState.lyttere.set(event, lyttere);
            },
            off: (event: string, callback: SkyraCallback) => mockState.lyttere.get(event)?.delete(callback),
            reload: () => undefined,
        },
    });

    if (!customElements.get('skyra-survey')) {
        customElements.define('skyra-survey', MockSkyraSurvey);
    }
};

// Fjerner mockene slik at andre stories ikke viser undersøkelsen.
const avinstaller = () => {
    const global = globalThis as Record<string, unknown>;
    delete global['webStorageController'];
    delete global['skyra'];
    mockState.lyttere.clear();
};

type SkyraMockProps = Required<SkyraMockArgs> & { children: ReactNode };

const SkyraMock = ({ skyraSamtykke, skyraScenario, skyraForsinkelseMs, children }: SkyraMockProps) => {
    // Mockene må finnes før undersøkelsen rendres: hooken leser samtykket i første render,
    // og elementet leser scenario og forsinkelse når det kobles til DOM-en.
    mockState.samtykke = skyraSamtykke;
    mockState.scenario = skyraScenario;
    mockState.forsinkelseMs = skyraForsinkelseMs;
    installer();

    useEffect(() => {
        installer();
        return avinstaller;
    }, []);

    // Samme hendelser som samtykkebanneret i dekoratøren sender.
    useEffect(() => {
        globalThis.dispatchEvent(new CustomEvent(skyraSamtykke ? 'consentAllWebStorage' : 'refuseOptionalWebStorage'));
    }, [skyraSamtykke]);

    // Ny nøkkel monterer storyen på nytt, slik at elementet bruker nytt scenario og ny forsinkelse.
    return <div key={`${skyraScenario}-${skyraForsinkelseMs}`}>{children}</div>;
};

/** Mocker dekoratørens samtykke og Skyra. Styres med args, se skyraMockArgs og skyraMockArgTypes. */
export const withSkyraMock: DecoratorFunction = (Story, { args }) => {
    const { skyraSamtykke, skyraScenario, skyraForsinkelseMs } = { ...skyraMockArgs, ...(args as SkyraMockArgs) };
    return (
        <SkyraMock skyraSamtykke={skyraSamtykke} skyraScenario={skyraScenario} skyraForsinkelseMs={skyraForsinkelseMs}>
            <Story />
        </SkyraMock>
    );
};
