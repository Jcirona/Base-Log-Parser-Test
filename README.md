# Log Parser test - Jeremey Cirona

This task requires us to parse a log file and return the following data.

1. The number of unique IP Addresses.
2. The top 3 most visited URLs.
3. The top 3 most active IP Addresses.

## Techstack used

- Javascript
- NodeJs
- Jest

## Setup

- Run **npm i** to install dependencies.
- Use **npm run test** to run the unit tests.

## Assumptions

- For returning the top 3 values of URL and IP frequency, there's no instruction on how to handle tied frequencies. The assumption is that it we just return the top 3 as they are outputted without additional handling of these tied values.
- It's assumed we will always be receiving valid log files with IP addresses and URLs, but we still handle these cases in our code.
