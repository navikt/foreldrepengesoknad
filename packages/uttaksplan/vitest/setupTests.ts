import * as matchers from '@testing-library/jest-dom/matchers';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { expect } from 'vitest';

dayjs.extend(isSameOrAfter);

expect.extend(matchers);

window.scrollTo = () => undefined;
