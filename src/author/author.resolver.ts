import {
  Resolver, Args, Query, ResolveProperty, Parent, Mutation
} from '@nestjs/graphql'
import { AuthorService } from './author.service'
import { Author, AuthorInput } from 'src/graphql'

@Resolver('Author')
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
  ) { }

  @Query()
  async author(@Args('authorID') id) :Promise<Author> {
    return await this.authorService.findAuthorById(id)
  }

  @Mutation()
  async createAuthor(@Args('author') author:AuthorInput): Promise<Author> {
    return await this.authorService.create(author);
  }

}
