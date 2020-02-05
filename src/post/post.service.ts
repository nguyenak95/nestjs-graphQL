import { Injectable } from '@nestjs/common'
import { Post, Author } from 'src/graphql'

const uuidv4 = require('uuid/v4')

@Injectable()
export class PostService {
  private postsList = []

  findPostById(id):Post {
    return this.postsList.find((post) => post.id === id)
  }

  async create(post, author):Promise<Post> {
    const id = uuidv4()
    const now = new Date().getTime()
    const newPost = {
      ...post, id, createdAt: now, createdBy: author
    }
    this.postsList.push(newPost)
    return newPost
  }
}
