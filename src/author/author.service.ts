import { Injectable } from '@nestjs/common'
// eslint-disable-next-line import/extensions
import { Author, AuthorInput } from '../graphql'

const uuidv4 = require('uuid/v4')
@Injectable()
export class AuthorService {
  private authorsList:Author[] = [{
    id: '123', firstName: 'khang', lastName: 'nguyen', dob: 12345
  }];


  findAuthorById(id):Author {
    return this.authorsList.find((ath) => ath.id === id)
  }

  create(author:AuthorInput):Author {
    const newAuthor = { ...author, id: uuidv4() }
    this.authorsList.push(newAuthor)
    return newAuthor
  }

  checkAuthor(authorID) {
    return this.authorsList.findIndex((author) => author.id === authorID) > -1
  }
}
