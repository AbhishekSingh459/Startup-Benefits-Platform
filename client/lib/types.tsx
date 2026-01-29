export interface Deal {
  _id: string;
  partnerName: string;
  logo: string;
  title: string;
  description: string;
  category: "Cloud" | "Marketing" | "Finance" | "Legal" | "HR";
  value: string;
  fullDetails?: string;
  eligibility?: string;
  instructions?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  claims: string[];
}
