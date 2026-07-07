import { composeStories } from '@storybook/react-vite';
import { render, screen } from '@testing-library/react';

import { Ukevisning } from './Ukevisning';
import * as stories from './Ukevisning.stories';

const { Standard, HelgSkjult, TomUke, PeriodeInnIHelgen, PeriodeInnIHelgenMedHelgSkjult } = composeStories(stories);

describe('<Ukevisning>', () => {
    it('skal vise uketittelen', async () => {
        render(<Standard />);
        expect(await screen.findByText('Uke 20')).toBeInTheDocument();
    });

    it('skal vise korrekt periodetype på dagane i uke 20 2026', async () => {
        render(<Standard />);
        expect(await screen.findByTestId('dag:11;type:MOR')).toBeInTheDocument();
        expect(screen.getByTestId('dag:12;type:MOR')).toBeInTheDocument();
        expect(screen.getByTestId('dag:13;type:FELLES')).toBeInTheDocument();
        expect(screen.getByTestId('dag:14;type:FERIE')).toBeInTheDocument();
        expect(screen.getByTestId('dag:15;type:FAR')).toBeInTheDocument();
    });

    it('skal vise helgedagane som helg-celler når hideWeekend ikkje er sett', async () => {
        render(<Standard />);
        expect(await screen.findAllByTestId('dag:helg')).toHaveLength(2);
    });

    it('skal skjule helgedagane når hideWeekend er sett', () => {
        render(<HelgSkjult />);
        expect(screen.queryByTestId('dag:helg')).not.toBeInTheDocument();
    });

    it('skal vise varsel om at helg er skjult når hideWeekend er sett', () => {
        render(<HelgSkjult />);
        expect(screen.getByTestId('helg-skjult-varsel')).toBeInTheDocument();
    });

    it('skal ikkje vise varsel om skjult helg når hideWeekend ikkje er sett', () => {
        render(<Standard />);
        expect(screen.queryByTestId('helg-skjult-varsel')).not.toBeInTheDocument();
    });

    it('skal ikkje vise nokon periodar i ei tom veke', () => {
        render(<TomUke />);
        expect(screen.queryByTestId(/type:/, { exact: false })).not.toBeInTheDocument();
    });

    it('skal vise advarselbadge på perioden som har det', async () => {
        render(<Standard />);
        expect(await screen.findByTestId('dag-advarsel')).toHaveTextContent('Mor mangler aktivitet');
    });

    it('skal vise periode som strekker seg inn i helgen med en daud helg-hale i 7-dagarsvisning', async () => {
        render(<PeriodeInnIHelgen />);
        // Perioden går 15.-17. mai (fredag-søndag), men helgedagane skal framleis visast som nøytrale helg-celler
        expect(await screen.findByTestId('dag:15;type:FAR')).toBeInTheDocument();
        expect(screen.getAllByTestId('dag:helg')).toHaveLength(2);
    });

    it('skal ikkje vise nokon daud helg-hale når helg er skjult', async () => {
        render(<PeriodeInnIHelgenMedHelgSkjult />);
        expect(await screen.findByTestId('dag:15;type:FAR')).toBeInTheDocument();
        expect(screen.queryByTestId('dag:helg')).not.toBeInTheDocument();
    });

    it('skal vise korrekt dag sjølv om ein periode strekker seg langt utanfor den viste veka', async () => {
        // Regresjonstest for at periodeoppslaget vert avgrensa til den viste veka (7 dagar) og
        // ikkje ekspanderer heile fom/tom-intervallet, sjølv for periodar som strekker seg over
        // fleire månader/år.
        render(
            <Ukevisning
                year={2026}
                week={20}
                periods={[
                    {
                        fom: '2026-01-01',
                        tom: '2026-12-31',
                        type: 'MOR',
                        ikon: <span aria-hidden />,
                        label: 'Lang periode',
                        meta: 'Heile året',
                        srText: 'Lang periode',
                    },
                ]}
            />,
        );

        expect(await screen.findByTestId('dag:11;type:MOR')).toBeInTheDocument();
        expect(screen.getByTestId('dag:15;type:MOR')).toBeInTheDocument();
        // Alle fem kvardagane skal høyre til same (langvarige) periode og dermed vera
        // samanhengande (start … middle … middle … middle … end).
        const mandagKort = screen.getByTestId('dag:11;type:MOR').querySelector('[class*="rounded-lg"]');
        expect(mandagKort?.className).toContain('right-0');
    });

    it('skal vise mandag 11. og tysdag 12. som eit samanhengande (merga) mikrokort', async () => {
        render(<Standard />);
        const mandagKort = (await screen.findByTestId('dag:11;type:MOR')).querySelector('[class*="rounded-lg"]');
        const tysdagKort = screen.getByTestId('dag:12;type:MOR').querySelector('[class*="rounded-lg"]');

        // Kortet skal strekka seg heilt til cellekanten (right-0 / left-0) slik at det ikkje er
        // noko synleg mellomrom mellom dei to dagane som utgjer same periode.
        expect(mandagKort?.className).toContain('right-0');
        expect(mandagKort?.className).toContain('rounded-r-none');
        expect(tysdagKort?.className).toContain('left-0');
        expect(tysdagKort?.className).toContain('rounded-l-none');
    });

    it('skal ikkje ha grå bakgrunn på header-rada for helgedagar, berre på dagcellene', async () => {
        render(<Standard />);
        const helgHeader = (await screen.findByText('Lørdag')).closest('div');
        expect(helgHeader?.className).not.toContain('bg-ax-bg-neutral-soft');
        expect(helgHeader?.className).toContain('bg-ax-bg-default');

        const [helgCelle] = screen.getAllByTestId('dag:helg');
        expect(helgCelle).toBeDefined();
        expect(helgCelle?.className).toContain('bg-ax-bg-neutral-soft');
    });
});
