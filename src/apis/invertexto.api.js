import axios from "axios"

const invertexto = {
    getRandomName: async () => {
        try {
            const response = await axios.get(`${process.env.INVERTEXTO_API}`)

            console.log(response)
            return response.data.name.split(' ')[1]
        }

        catch (error) {
            return error.response.data
        }
    }
}

export default invertexto