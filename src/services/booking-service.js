const axios = require('axios');
const {StatusCodes} = require('http-status-codes');

const { ServerConfig } = require('../config')
const db = require('../models');
const AppError = require('../utils/errors/app-error');

async function createBooking(data) {
    try {
        const flightResponse = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
        const flightData = flightResponse.data.data;
        
        if (data.noofSeats > flightData.totalSeats) {
            throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST);
        }

        return true;
    } catch (error) {
        throw new AppError('Error while creating booking', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createBooking
}