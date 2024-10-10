"use client";

import { useEffect, useState } from "react";
import { Box, styled, Typography } from "@mui/material";
import { Air, SentimentDissatisfied } from "@mui/icons-material";
import { useGetWeatherQuery } from "@/lib/redux/slices/api-slice";
import Image from "next/image";

const WeatherStatus = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const { data, isLoading, refetch } = useGetWeatherQuery({
    lat: latitude,
    lon: longitude,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      refetch();
    }
  }, [latitude, longitude, refetch]);

  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <Box
      sx={{
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      {isLoading && (
        <WeatherTextStatus variant="body2" className="font-mono">
          <Air color="primary" />
          Loading weather data...
        </WeatherTextStatus>
      )}
      {!isLoading && data && (
        <>
          {data?.cod === "400" ? (
            <WeatherTextStatus variant="body2" className="font-mono">
              <SentimentDissatisfied color="warning" />
              Cannot load weather data
            </WeatherTextStatus>
          ) : (
            <>
              <WeatherTextStatus variant="body2" className="font-mono">
                <Image
                  src={`https://flagcdn.com/24x18/${data?.sys?.country.toLowerCase()}.png`}
                  alt={data?.sys?.country.toLowerCase()}
                  width={24}
                  height={18}
                  title={data?.sys?.country.toLowerCase()}
                />
                {data?.name}
              </WeatherTextStatus>
              <WeatherTextStatus variant="body2" className="font-mono">
                <Image
                  src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
                  alt={data?.weather[0]?.description}
                  width={32}
                  height={32}
                  title={data?.weather[0]?.description}
                />
                {data?.weather[0]?.description}
              </WeatherTextStatus>
            </>
          )}
        </>
      )}
    </Box>
  );
};

const WeatherTextStatus = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

export default WeatherStatus;
