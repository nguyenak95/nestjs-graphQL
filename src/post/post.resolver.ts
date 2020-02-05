import {
  Resolver, Args, Query, ResolveProperty, Parent, Mutation, Context
} from '@nestjs/graphql'
import { PostService } from './post.service'
import { AuthorService } from 'src/author/author.service'
import { Post, PostInput, Author } from 'src/graphql'
import { UseGuards, Req } from '@nestjs/common'
import { PostGuard } from './post.guard'

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService:PostService,
    private readonly authorService:AuthorService
  ) { }

  @Query()
  async post(@Args('postID') id):Promise<Post> {
    return this.postService.findPostById(id)
  }

  @Mutation()
  @UseGuards(PostGuard)
  async createPost(@Args('postInput') post:PostInput, @Context('req') request):Promise<Post> {
    const author = await this.authorService.findAuthorById(request.authorID)
    return this.postService.create(post, author)
  }

  @ResolveProperty()
  async createdBy(@Parent() post:Post) :Promise<Author> {
    const { createdBy } = post
    return this.authorService.findAuthorById(createdBy.id)
  }
}
