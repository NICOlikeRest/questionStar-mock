const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList')

const Random = Mock.Random

module.exports = [
    {
        url: '/api/question/:id',
        method: 'get',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: Random.title()
                }
            }
        }
    },
    {
        url: '/api/question',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
            }
        }
    },
    {
        url: '/api/question',
        method: 'get',
        response(ctx) {

            const {url = ''} = ctx;
            const isDeleted = url.indexOf('isDeleted=true') >= 0
            const isStar = url.indexOf('isStar=true')>=0

            const pageSize = parseInt(ctx.query.pageSize) || 10;

            return {
                errno: 0,
                data: {
                    list: getQuestionList({len: pageSize, isDeleted, isStar}),
                    total: 100
                }
            }
        }
    },
    {
        // 更新问卷
        url: '/api/question/:id',
        method: 'patch',
        response() {
            return {
                errno: 0,
            }
        }
    },
    {
        // 复制问卷
        url: '/api/question/depulicate/:id',
        method: 'post',
        response() {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
            }
        }
    },
    {
        // 批量删除
        url: '/api/question',
        method: 'delete',
        response() {
            return {
                errno: 0
            }
        }
    }
]