const responseTemplate = {
    OK_200: {
        success: true, 
        message: 'Ok.'
    },

    INTERNAL_SERVER_ERROR_500: {
        success: false,
        message: 'Internal server error.'
    },

    BAD_REQUEST_400: {
        success: false,
        message: 'Bad request'
    },

    CREATED_201: {
        success: true,
        message: 'Created.'
    },

    NOT_FOUND_404: {
        success: false,
        message: 'Not found.'
    },

    CONFLICT_409: {
        success: false,
        message: 'Conflict.'
    },

    UNAUTHORIZED_401: {
        success: false,
        message: 'Unhauthorized'
    }
}

export default responseTemplate