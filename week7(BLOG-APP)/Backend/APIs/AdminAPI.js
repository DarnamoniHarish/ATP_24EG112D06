import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import {ArticleModel} from '../models/ArticleModel.js'
import {verifyToken} from '../middlewares/VerifyToken.js'

export const adminApp=exp()
