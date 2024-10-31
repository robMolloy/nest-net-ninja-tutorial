import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { handleValidationErrorOnController } from 'src/_common/validation';
import { v4 } from 'uuid';
import { createNinjaDtoSchema } from './ninjas.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(
    @Query('id') id?: string,
    @Query('name') name?: string,
    @Query('type') type?: string,
  ) {
    const service = new NinjasService();

    return id || type || name
      ? service.getFilteredNinjas({ id, type, name })
      : service.getAllNinjas();
  }

  @Get(':id')
  getNinjaById(@Param('id') id: string) {
    const service = new NinjasService();
    return service.getFilteredNinjas({ id });
  }

  @Post()
  createNinja(@Body() createNinjaDto: unknown) {
    const parsed = createNinjaDtoSchema.safeParse(createNinjaDto);
    if (!parsed.success)
      return handleValidationErrorOnController(parsed.error.errors);

    const newNinja = { ...parsed.data, id: v4() };

    // allNinjas.push(newNinja);

    return newNinja;
  }
}
