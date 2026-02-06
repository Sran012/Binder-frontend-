// Product and Subproduct categories with their codes
// Used in Step0 PRODUCT and SUBPRODUCT searchable dropdowns

export const PRODUCT_SUBPRODUCT_OPTIONS = [
  { category: 'RUG', code: 'AA' },
  { category: 'BATHRUG', code: 'BB' },
  { category: 'BATHMAT', code: 'CC' },
  { category: 'CARPET', code: 'DD' },
  { category: 'TREE SKIRT', code: 'EE' },
  { category: 'TOTE BAGS', code: 'FF' },
  { category: 'BAGS', code: 'GG' },
  { category: 'CUSHION', code: 'HH' },
  { category: 'APRON', code: 'II' },
  { category: 'TABLE RUNNER', code: 'JJ' },
  { category: 'PLACEMAT', code: 'KK' },
  { category: 'KITCHEN GLOVES', code: 'LL' },
  { category: 'THROW', code: 'MM' },
  { category: 'BLANKETS', code: 'NN' },
  { category: 'COMFORTER', code: 'OO' },
  { category: 'QUILT', code: 'PP' },
  { category: 'DUVET', code: 'QQ' },
  { category: 'SHEET SET', code: 'RR' },
  { category: 'CURTAIN', code: 'SS' },
  { category: 'SHOWER CURTAIN', code: 'TT' },
  { category: 'BATHROB', code: 'UU' },
  { category: 'TOWEL', code: 'VV' },
  { category: 'BASKET', code: 'WW' },
  { category: 'OTTOMAN', code: 'XX' },
  { category: 'PET BED', code: 'YY' },
  { category: 'SOFT TOY', code: 'ZZ' },
  { category: 'FLOOR CUSHION', code: 'AB' },
  { category: 'CHAIRPAD', code: 'AC' },
];

// Options for SearchableDropdown: "CATEGORY (CODE)"
export const PRODUCT_SUBPRODUCT_DROPDOWN_OPTIONS = PRODUCT_SUBPRODUCT_OPTIONS.map(
  (item) => `${item.category} (${item.code})`
);
