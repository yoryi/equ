const excludedArticles = [`the`, `of`, `a`, `an`, `and`, `at`, `in`, `for`]

export const nameAbbreviation = (
  name: string,
  excludeArticles = false,
): string =>
  name
    .replace(/[^\w\s]/g, ``)
    .split(` `)
    .filter(
      (x) =>
        !!x.length &&
        (!excludeArticles || !excludedArticles.includes(x.toLowerCase())),
    )
    .map((x) => x.charAt(0))
    .slice(0, 3)
    .join(``)
    .toUpperCase()
