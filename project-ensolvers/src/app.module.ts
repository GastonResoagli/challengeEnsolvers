import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './modules/category/category.module';
import { Categoryentity } from './modules/category/entities/category.entity';
import { NoteEntity } from './modules/note/entities/note.entity';
import { NoteModule } from './modules/note/note.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://fetwfusl:yDo1Cq9XfA-_02zr-k2NrtJ-8DJVIl08@silly.db.elephantsql.com/fetwfusl',
      synchronize: true,
      entities: [Categoryentity, NoteEntity],
    }),
    CategoryModule,
    NoteModule,
  ],
})
export class AppModule {}
