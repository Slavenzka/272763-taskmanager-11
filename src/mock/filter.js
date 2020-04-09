const filterNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

export const generateFilters = () => {
  return filterNames.map((item) => {
    return {
      name: item,
      count: Math.floor(Math.random() * 10),
    };
  });
};
