'use strict';

const Controller = require('egg').Controller;

class Resource extends Controller {
    async getResource() {
        const { ctx, app } = this;
        try {
            let { beg, end, index } = ctx.request.body;
            beg = parseInt(beg);
            end = parseInt(end);
            const table = 'ResourceType';
            const table1 = 'Resource';
            const params = {
                include: [
                    {
                        model: app.model.UserInfo,
                        attributes: ['avatar'],
                        include: [
                            {
                                model: app.model.User,
                                attributes: ['name']
                            }
                        ]
                    }
                ],
                order: [['updated_at', 'DESC']],
                where: {
                    status: 1
                }
            };
            let resourceType = await ctx.service.mysql.findAll({}, table);
            let resource = await ctx.service.mysql.findAll(params, table1);
            resourceType = await ctx.service.fun.filterTypeNum(resourceType, resource);// 过滤类别所对应的数目
            resource = await ctx.service.fun.filterType(resource, index);// 过滤资源所对应的类别
            ctx.status = 200;
            if (parseInt(resource.length) >= end) {
                resource = resource.slice(beg, end);
                ctx.body = {
                    success: 1,
                    data: {
                        resourceType,
                        resource
                    }
                };
            } else {
                resource = resource.slice(beg);
                ctx.body = {
                    success: 0,
                    data: {
                        resourceType,
                        resource
                    }
                };
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    async searchResource() {
        const { ctx, app } = this;
        const { Op } = app.Sequelize;
        try {
            const { value } = ctx.request.body;
            const params = {
                include: [
                    {
                        model: app.model.UserInfo,
                        attributes: ['avatar'],
                        include: [
                            {
                                model: app.model.User,
                                attributes: ['name']
                            }
                        ]
                    }
                ],
                order: [['updated_at', 'DESC']],
                where: {
                    title: {
                        [Op.like]: '%' + value + '%',
                    },
                    where: {
                        status: 1
                    }
                }
            };
            const table = 'Resource';
            const resource = await ctx.service.mysql.findAll(params, table);
            ctx.status = 200;
            ctx.body = {
                success: 1,
                data: resource
            };
        } catch (err) {
            ctx.status = 404;
            console.log(err);
        }
    }
}

module.exports = Resource;