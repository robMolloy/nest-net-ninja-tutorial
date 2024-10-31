import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const x = [1, 2, 3, 4, 5];
    const y = !x[18] ? 0 : x[18] * 2;
    return `Hey gang!asd ${y}`;
  }
}
