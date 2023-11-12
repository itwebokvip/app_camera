export interface Program {
  id: string;
  name: string;
  createdByUserId: string;
  createdByUsername: string;
  createdTime: string;
  updatedByUserId: string | null;
  updatedByUsername: string | null;
  updatedTime: string | null;
}
