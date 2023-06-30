import { CompanyStatus } from 'src/app/models/CompanyStatus';

export interface CodeList {
  codeListId: string;
  name: string;
  user: string;
  date: Date;
  codes: CompanyStatus[];
}
