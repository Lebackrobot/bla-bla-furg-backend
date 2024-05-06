import clientCacheModel from '../../modules/clients-cache/client-cache.model.js'

const clientCacheService = {
    create: async (clientCache) => {
        const query = await clientCacheModel.create(clientCache)
        return query ? query.dataValues : undefined
    },

    getByNickname: async (nickname) => {
        const query = await clientCacheModel.findOne({ where: { nickname }})
        return query ? query.dataValues : undefined
    },

    deleteByNickname: async (nickname) => {
        await clientCacheModel.destroy({ where: { nickname }})
    }
}

export default clientCacheService