const Controller = require('egg').Controller

class User extends Controller {
    async getUserInfo() {
        const { ctx, app } = this;
        try {
            let token = ctx.header.authorization;
            let author = await ctx.service.jwt.verifyToken(token);
            if (!author) {
                ctx.status = 403
            } else {
                let { id } = ctx.request.body;
                let table = 'UserInfo'
                let table1 = 'Article'
                let table2 = 'Favorite'
                let params = {
                    include: [
                        {
                            model: app.model.School
                        }, {
                            model: app.model.Major
                        }, {
                            model: app.model.Domain
                        }
                    ],
                    where: {
                        id: id
                    }
                }
                let userinfo = await ctx.service.mysql.findAll(params, table)
                if (userinfo.length != 0) {
                    userinfo = userinfo[0].dataValues
                    let article = await ctx.service.mysql.findAll({ where: { userid: id } }, table1)
                    let articleNum = article.length;// 获取发表文章的数量
                    // 获取文章被阅读量
                    let readNum = 0;
                    if (articleNum != 0) {
                        readNum = article.map(item => {
                            return item.dataValues.readnumber
                        })
                        readNum = readNum.reduce((total, currentValue) => {
                            return total + currentValue
                        })
                    }
                    let favoriteNum = await ctx.service.mysql.findAll({ where: { userid: id } }, table2)
                    userinfo.readNum = readNum
                    userinfo.articleNum = articleNum
                    userinfo.favoriteNum = favoriteNum.length
                    ctx.status = 200;
                    ctx.body = {
                        success: 1,
                        data: userinfo
                    }
                }else{
                    ctx.status = 200 ;
                    ctx.body={
                        success:0
                    }
                }

            }
        } catch (err) {
            ctx.status = 404;
            console.log(err)
        }
    }
}

module.exports = User