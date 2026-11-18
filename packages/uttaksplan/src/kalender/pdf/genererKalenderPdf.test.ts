import html2canvas from 'html2canvas-pro';
import { vi } from 'vitest';

import { genererKalenderPdf } from './genererKalenderPdf';

const save = vi.hoisted(() => vi.fn());

vi.mock('html2canvas-pro', () => ({
    default: vi.fn(),
}));

vi.mock('jspdf', () => ({
    jsPDF: class {
        addImage = vi.fn();
        addPage = vi.fn();
        save = save;
    },
}));

const html2canvasMock = vi.mocked(html2canvas);

const lagKalenderElement = (antallMåneder: number) => {
    const kalender = document.createElement('div');
    for (let i = 0; i < antallMåneder; i++) {
        const måned = document.createElement('div');
        måned.dataset.monthKey = `2026-${i + 1}`;
        kalender.appendChild(måned);
    }
    return kalender;
};

describe('genererKalenderPdf', () => {
    it('skal ikke fange flere biter eller lagre PDF når forsøket avbrytes under fanging', async () => {
        let fullførFanging: (canvas: HTMLCanvasElement) => void = () => undefined;
        html2canvasMock
            .mockResolvedValueOnce(document.createElement('canvas'))
            .mockImplementationOnce(
                () =>
                    new Promise<HTMLCanvasElement>((resolve) => {
                        fullførFanging = resolve;
                    }),
            );
        const kontroller = new AbortController();

        const resultat = genererKalenderPdf({
            legendElement: document.createElement('div'),
            kalenderElement: lagKalenderElement(6),
            antallKolonner: 1,
            filename: 'test.pdf',
            signal: kontroller.signal,
        });

        await vi.waitFor(() => expect(html2canvasMock).toHaveBeenCalledTimes(2));
        kontroller.abort();
        fullførFanging(document.createElement('canvas'));

        await expect(resultat).rejects.toThrow();
        expect(html2canvasMock).toHaveBeenCalledTimes(2);
        expect(save).not.toHaveBeenCalled();
    });
});
