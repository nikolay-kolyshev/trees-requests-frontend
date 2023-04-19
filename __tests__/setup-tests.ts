import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn(),
});
