import {
  CanActivate, ExecutionContext, Injectable, HttpException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthorService } from 'src/author/author.service'

const jwt = require('jsonwebtoken')

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private readonly authorService:AuthorService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    const authorize = req && req.headers.authorization
    if (!authorize || authorize.length < 8) return false
    if (authorize.search('Bearer ') === -1) return false
    const token = authorize.replace('Bearer ', '')
    jwt.verify(token, 's3cr3t', (err, decoded) => {
      if (err) throw new HttpException('Wrong token', 403)
      // console.log(this.authorService.checkAuthor(decoded.authorID));

      if (!this.authorService.checkAuthor(decoded.authorID)) throw new HttpException('Author not Exist', 403)
      req.authorID = decoded.authorID
    })
    return true
  }
}
