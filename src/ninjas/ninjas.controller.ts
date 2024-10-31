import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { handleValidationErrorOnController } from 'src/_common/validation';
import { v4 } from 'uuid';
import { createNinjaDtoSchema } from './ninjas.dto';

const allNinjas = [
  { id: 'id1', name: 'rob', type: 'strong' },
  { id: 'id2', name: 'lizzie', type: 'fast' },
];

@Controller('ninjas')
export class NinjasController {
  @Get()
  getNinjas(@Query('type') type: string) {
    return !type ? allNinjas : allNinjas.filter((x) => x.type === type);
  }

  @Get(':id')
  getNinjaById(@Param('id') id: string) {
    return { id };
  }

  @Post()
  createNinja(@Body() createNinjaDto: unknown) {
    const parsed = createNinjaDtoSchema.safeParse(createNinjaDto);
    if (!parsed.success)
      return handleValidationErrorOnController(parsed.error.errors);

    const newNinja = { ...parsed.data, id: v4() };
    allNinjas.push(newNinja);

    return newNinja;
  }
}
