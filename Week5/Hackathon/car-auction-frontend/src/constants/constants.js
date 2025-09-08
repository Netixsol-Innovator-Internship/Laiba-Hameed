// src/constants/constants.js

// Year range (1995–2025) - store as strings for Select
export const YEARS = Array.from({ length: 2025 - 1995 + 1 }, (_, i) => String(1995 + i));

export const MAKES = [
    'Toyota', 'Honda', 'Nissan', 'BMW', 'Mercedes-Benz',
    'Audi', 'Ford', 'Chevrolet', 'Hyundai', 'Kia',
    'Tesla', 'Lexus', 'Porsche', 'Volkswagen'
];

export const MODELS = [
    'Corolla', 'Civic', 'Accord', 'Camry', 'Altima', 'GTR',
    '3 Series', '5 Series', 'C-Class', 'E-Class', 'A4',
    'Mustang', 'F-150', 'Cruze', 'Elantra', 'Sonata',
    'Sportage', 'Model S', 'Model 3', 'RX350', '911', 'Golf'
];

export const ENGINE_SIZES = [
    '4 cylinder', '6 cylinder', '8 cylinder', '10 cylinder', '12 cylinder'
];

export const PAINT_OPTIONS = [
    'Original Paint', 'Partially Repainted', 'Totally Repainted'
];

export const YES_NO = ['Yes', 'No'];

export const MODIFICATION_OPTIONS = [
    'Completely Stock', 'Modified'
];

export const FIELD_OPTIONS = {
    year: YEARS,
    make: MAKES,
    model: MODELS,
    engineSize: ENGINE_SIZES,
    paint: PAINT_OPTIONS,
    hasGccSpecs: YES_NO,
    accidentHistory: YES_NO,
    fullServiceHistory: YES_NO,
    hasModified: MODIFICATION_OPTIONS,
};
