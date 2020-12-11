import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import Orpharnage from './Orphanages';

@Entity('images')

export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orpharnage, (orphanage) => orphanage.images)
    @JoinColumn({ name: 'orphanage-id' })
    orphanage: Orpharnage;
}
