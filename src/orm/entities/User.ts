import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  USER_ID: number;

  @Column()
  EMAIL: string;

  @Column()
  PASSWORD: string;

  @Column()
  NAME: string;
 
  hashPassword() {
    this.PASSWORD = bcrypt.hashSync(this.PASSWORD, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.PASSWORD);
  }
}