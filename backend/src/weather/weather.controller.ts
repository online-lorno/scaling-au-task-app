import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('weather')
export class WeatherController {
  @Get()
  async getWeatherDetails(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ) {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }
  }
}
