import axios from "axios"

const dicebearApi = {
    getImageByName: async (name) => {
        try {
            const response = await axios.get(`${process.env.DICEBEAR_API}?seed=${name}`)
            return response.data
        }

        catch (error) {
            return error.response.data
        }
    }
}

export default dicebearApi