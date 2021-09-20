import { BaseEntity } from './../commons/commons';

export class Superhero extends BaseEntity<number> {
  firstName: string;
  lastName: string;
  alias: string;
  birthdate: Date;
  occupation: string;
  height: number;
  weight: number;
  biography: string;
}
