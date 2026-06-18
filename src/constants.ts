export const CATEGORY_IDS = {
  HOUSING: "housing",
  EDUCATION: "education",
  SUPERMARKET: "supermarket",
  RESTAURANTS: "restaurants",
  SERVICES: "services",
  TRANSPORT: "transport",
  HEALTH: "health",
  SHOPPING: "shopping",
  LEISURE: "leisure",
  TRANSFERS: "transfers",
  INCOME: "income",
  OTHER: "other",
} as const;

export const KNOWN_CREDIT_IDS = new Set<string>([
  CATEGORY_IDS.INCOME,
  "salary",
  "allowance",
  "refunds",
]);

export const UNCATEGORIZED_ID = CATEGORY_IDS.OTHER;
