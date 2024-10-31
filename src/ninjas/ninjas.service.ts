import { Injectable } from '@nestjs/common';
import { ninjaSchema } from './ninjas.dto';
import { z } from 'zod';

type Ninjas = {
  id: string;
  name: string;
  type: string;
}[];

const allNinjas: Ninjas = [
  { id: 'id1', name: 'rob', type: 'strong' },
  { id: 'id2', name: 'lizzie', type: 'strong' },
  { id: 'id2', name: 'mark', type: 'french' },
];

@Injectable()
export class NinjasService {
  private ninjas = allNinjas;

  getAllNinjas() {
    return this.ninjas;
  }

  getFilteredNinjas(initProps: Partial<z.infer<typeof ninjaSchema>>) {
    const props = {
      ...(initProps.id ? { id: initProps.id } : {}),
      ...(initProps.type ? { type: initProps.type } : {}),
      ...(initProps.name ? { name: initProps.name } : {}),
    };
    const keys = Object.keys(props) as (keyof typeof props)[];
    console.log(`ninjas.service.ts:${/*LL*/ 27}`, { props, keys });

    return keys.length === 0
      ? this.ninjas
      : this.ninjas.filter((ninja) => {
          return keys.every((k) => ninja[k] === props[k]);
        });
  }
}
