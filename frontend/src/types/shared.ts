export type Category =
  | "food"
  | "transport"
  | "housing"
  | "utilities"
  | "shopping"
  | "entertainment"
  | "health"
  | "education"
  | "salary"
  | "freelance"
  | "business"
  | "gifts"
  | "others";

export type User = {
  id: number;
  name: string;
  email: string;
};
