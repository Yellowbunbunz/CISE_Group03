/*
    Controller testing: 
    The objective of testing articles.controllers is to verify the controller can communicate with the service
    The tests check that the correct service method is being called with the correct parameters.
*/

import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controllers';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './create-article.dto';

const mockArticle = {
  title: 'Example title',
  authors: ['Example author'],
  category: 'Cat 1',
  source: 'Example source',
  publication_year: 2024,
  doi: '10.1234/example-doi',
  claim: 'Example claim',
  evidence: 'Example evidence',
  summary: 'Example summary with random words that mean nothing.',
  averageRating: 0,
  totalRatings: 0,
};

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockArticle]),
            findByTitle: jest.fn().mockResolvedValue([mockArticle]),
            create: jest.fn().mockResolvedValue(mockArticle),
            update: jest.fn().mockResolvedValue(mockArticle),
            delete: jest.fn().mockResolvedValue(mockArticle),
          },
        },
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
  });

  /* Testing the create function.
       The test creates a DTO object 'dto' and is comparing the object itself (not any values) to 
       the mockArticle which is also a DTO object and was created above via jest.fn() */

  it('should create a new article', async () => {
    const dto: CreateArticleDto = {
      title: 'New Article',
      authors: ['Max well'],
      category: 'Cat 1',
      source: 'Test Source',
      publication_year: 2024,
      doi: '10.1234/new-doi',
      claim: 'it solves everything',
      evidence: 'trust me bro',
      summary:
        'example summary that will only be displayed if users click on an article for more information.',
    };

    const result = await controller.create(dto);
    expect(result).toEqual(mockArticle);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all articles', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockArticle]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find an article by title', async () => {
    const result = await controller.findByTitle('Example title');
    expect(result).toEqual([mockArticle]);
    expect(service.findByTitle).toHaveBeenCalledWith('Example title');
  });

  /* ----- Update method tests two things -----
            1) That the update function was called with the correct id.
            2) That the dto title was changed. */

  it('should update an article', async () => {
    const updatedDto = { title: 'Updated title' };

    // create updated article
    const updatedArticle = {
      ...mockArticle, // copy mock's values
      ...updatedDto, // copy the updated title, overwriting mock's title
    };

    service.update = jest.fn().mockResolvedValue(updatedArticle);

    const result = await controller.update('example-id', updatedDto);

    // dto update test
    expect(result.title).toBe('Updated title');

    // function call test
    expect(service.update).toHaveBeenCalledWith('example-id', updatedDto);
  });

  it('should delete an article', async () => {
    const result = await controller.delete('example-id');
    expect(result).toEqual(mockArticle);
    expect(service.delete).toHaveBeenCalledWith('example-id');
  });
});
