const FILTER_NAMES = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

export const generateFilters = () => {
  return FILTER_NAMES.map((item) => {
    return {
      name: item,
      count: Math.floor(Math.random() * 10),
    };
  });
};
