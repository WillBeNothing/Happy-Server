import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn,
} from 'typeorm';
import Image from './Images';
import Comments from './Comments';

@Entity('orphanages')

export default class Orphanages {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, (image) => image.orphanage, {
      cascade: [
        'insert',
        'update',
      ],
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[]

    @OneToMany(() => Comments, (comment) => comment.orphanage)
    @JoinColumn({ name: 'orphanage_id' })
    comments: Comments[]
}
