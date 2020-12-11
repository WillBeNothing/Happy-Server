import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import Orpharnage from './Orphanages';

@Entity('comments')

export default class Comments {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comment: string;

    @Column()
    name: string;

    @Column()
    colorIcon: string;

   @ManyToOne(() => Orpharnage, (orphanage) => orphanage.comments, {
     cascade: [
       'insert',
       'update',
     ],
   })
   @JoinColumn({ name: 'orphanage_id' })
   orphanage: Orpharnage;
}
