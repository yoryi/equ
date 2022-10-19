export const areStatsPresent = (
  stats: Record<string, any> | undefined | null,
): boolean =>
  !!stats &&
  Object.values(stats)
    .reduce(
      (stats, value) => [
        ...stats,
        typeof value === `object` ? areStatsPresent(value) : !!value,
      ],
      [],
    )
    .find((value: boolean) => value)
